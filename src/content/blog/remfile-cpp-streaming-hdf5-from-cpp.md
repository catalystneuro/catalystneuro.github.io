---
title: "Streaming Remote HDF5 Files from C++ with remfile-cpp"
date: "2026-07-14"
description: "A new HDF5 virtual file driver that streams remote NWB files over HTTP with adaptive caching. It opens files several times faster than ROS3, works with any HDF5 build, and is now integrated into AqNWB."
image: "/images/blog/remfile-cpp-banner.png"
readTime: "8 min read"
author: "Benjamin Dichter"
keywords: ["NWB", "HDF5", "C++", "remfile", "AqNWB", "DANDI", "cloud computing", "ROS3", "streaming", "neurophysiology"]
---

Neuroscience datasets have outgrown the laptops that analyze them. A single Neuropixels session on the [DANDI Archive](https://dandiarchive.org/) can run to hundreds of gigabytes, and downloading the whole file to read a few seconds of it is a poor trade. The Python ecosystem solved this years ago: [remfile](https://github.com/magland/remfile), by Jeremy Magland, lets h5py read a remote HDF5 file over HTTP, fetching only the bytes it actually needs.

C++ had no equivalent. That gap mattered to us, because [AqNWB](https://github.com/NeurodataWithoutBorders/aqnwb), the C++ API for acquiring data in NWB format, is written for acquisition systems that live in C++, and those systems increasingly want to *read* remote NWB files too.

So we ported it. [**remfile-cpp**](https://github.com/catalystneuro/remfile-cpp) is a C++ implementation of remfile's approach, packaged as an HDF5 *virtual file driver*. It is now an optional dependency of AqNWB, and it turned out to be considerably faster than the driver HDF5 ships for this purpose.

## The trick: teach HDF5 to speak HTTP

The natural instinct is to write a "remote HDF5 reader": a library that parses the HDF5 format itself and fetches what it needs. That is a large and thankless job. HDF5 is a rich format: chunking, compression filters, virtual datasets, several B-tree flavors. Reimplement it and you inherit a permanent obligation to keep up.

There is a much smaller seam. Deep inside libhdf5, *every* byte the library reads passes through a table of function pointers called a Virtual File Driver (VFD). The VFD's job is narrow to the point of triviality:

> Give me `size` bytes starting at address `addr`.

That's it. HDF5 handles the format; the driver only has to produce bytes. Answer that question with an HTTP range request instead of a `pread()`, and the *entire* HDF5 feature set (every filter, every chunking scheme, every dataset layout) works against a URL, with no changes anywhere else.

This is the same seam remfile uses in Python (h5py's `driver='fileobj'` is itself built on it), but reaching it from C++ means implementing the VFD interface directly:

```c
hid_t fapl = H5Pcreate(H5P_FILE_ACCESS);
H5Pset_fapl_remfile(fapl, NULL);
hid_t file = H5Fopen("https://dandiarchive.s3.amazonaws.com/blobs/...",
                     H5F_ACC_RDONLY, fapl);
// From here on, ordinary HDF5. It has no idea the file is 3,000 miles away.
```

In AqNWB it's one call:

```cpp
auto io = std::make_shared<AQNWB::IO::HDF5::HDF5IO>(url);
io->openRemote();
```

## Why not just use ROS3?

HDF5 already ships a driver for this, called ROS3, and AqNWB [added support for it](https://github.com/NeurodataWithoutBorders/aqnwb/pull/308) alongside this work. So the obvious question is why build another one.

The first reason is availability. ROS3 is a compile-time option, and whether you have it depends on how you got HDF5. Homebrew's HDF5 doesn't include it, and neither do the PyPI `h5py` wheels, which bundle their own HDF5. conda-forge's `hdf5` and Ubuntu's `libhdf5-dev` both do include it. Every environment on my machine that was missing ROS3 had `h5py` installed from pip; I had to build a dedicated environment to benchmark against it. remfile-cpp needs only libcurl, so it works with any HDF5 from 1.10 through 2.x regardless of how it was built.

*(Correction: an earlier version of this post said ROS3 was "absent from every conda `h5py` environment," which overstated it. As [pointed out](https://github.com/HDFGroup/hdf5/discussions/6527) by the HDF Group, conda-forge's HDF5 ships the driver; the environments I hit had h5py from PyPI, not conda-forge.)*

The second is that ROS3 speaks S3, while remfile-cpp speaks plain HTTP. That means it also works with presigned URLs, which matters, because presigned S3 URLs reject `HEAD` requests. remfile derives the file size from a one-byte range request instead. It's a small detail that decides whether a whole class of URLs works at all.

The third reason is performance, and it's the interesting one.

## Caching is the whole ballgame

Opening an NWB file is not one big read. It's *hundreds of small scattered ones*: the superblock, then B-tree nodes, then object headers, each a few hundred bytes, each at an unpredictable offset. Do that over a network with no caching and you pay a full round trip per read. Latency, not bandwidth, is what hurts.

remfile's answer, which we ported directly, is a chunk cache with an adaptive read-ahead, the "smart loader". Reads are served from an in-memory cache of 100 KiB chunks. On a cache miss, the driver fetches the missing chunk *and some of what follows*; when it detects sequential access it grows that window geometrically, and when access jumps around it shrinks it back. Metadata walks stay cheap; streaming reads coalesce into a few large requests.

The effect shows up at open. Reading a 23 MB slice of an `ElectricalSeries` from a DANDI file, alternating drivers to cancel network drift, medians of 8 runs each:

| Phase | ROS3 (HDF5 2.1) | ROS3 (HDF5 develop) | remfile-cpp |
|---|---|---|---|
| open (`H5Fopen`) | 3.26 s | 1.51 s | **0.35 s** |
| read (23 MB) | **1.06 s** | 1.58 s | 1.20 s |
| **total** | 4.40 s | 3.08 s | **1.56 s** |

remfile opens the file about **4x faster** than current ROS3, and is a bit under **2x faster** end to end on this workload. Opening one of these files is hundreds of small scattered reads (superblock, B-trees, object headers), which is exactly what a read-ahead cache is for. The read times are close enough, and noisy enough, that I wouldn't call a winner on the bulk read.

The two ROS3 columns are worth a note. When I first wrote this post, ROS3 opened this file in ~3.3 s and I reported a ~10x gap. Shortly after, the HDF Group [pointed out](https://github.com/HDFGroup/hdf5/discussions/6527) that ROS3 was eagerly caching several MiB at open, and a [commit that landed the same day](https://github.com/HDFGroup/hdf5/commit/1325d30b21ee1328e88103b269a74cad699fa7b6) moved that work to the first read and added an internal block cache. Rebuilding against `develop` cut ROS3's open time roughly in half, so the honest current gap is ~4x, not 10x. It will keep narrowing as that cache matures. The numbers above are from the rebuilt `develop`.

The bulk read is also where I found a bug in my own port.

## The benchmark that found a bug

The first version of the port was **2.4x slower than ROS3** on bulk reads. That was suspicious enough to investigate, and instrumenting the HTTP requests showed why.

The smart loader only ever *grows* its window geometrically: 100 KiB, then 170 KiB, then 290 KiB, and so on. It never asks how much the current read actually wants. So a single large read doesn't issue one large request. It *ramps up to it*, paying a full network round trip on every rung of the ladder. A 23 MB read was taking **11 sequential requests** where one would do.

The fix is two lines: never fetch less than the current read already needs. Read-ahead beyond the request still follows the original logic, so sequential behavior is unchanged; only the wasted round trips disappear. That took 11 requests down to 5 and brought bulk-read throughput to parity with ROS3, while keeping the open-time advantage.

The same flaw exists in the Python original, where you can watch the ladder directly. Reading 64 KB with a 1 KB chunk size issues seven requests:

```
(0, 1023) (1024, 3071) (3072, 7167) (7168, 14335)
(14336, 26623) (26624, 48127) (48128, 65535)
```

1 KB → 2 KB → 4 KB → 7 KB → 12 KB → 21 KB → 17 KB. Seven round trips for one read.

## What testing a network library taught us

The obvious way to test a driver that reads over HTTP is to point it at a real file and see if the bytes come back. That's what the port shipped with at first, and it's a weak test: slow, dependent on the DANDI Archive being up, and, crucially, unable to say anything about *how* the driver fetched those bytes.

So we replaced it with a **hermetic** suite: an HTTP server running inside the test process, serving a generated HDF5 file. No network. Fifteen tests in about two seconds. And because the test server counts requests and records byte ranges, the tests can assert the driver's *behavior* rather than infer it from a stopwatch:

- a cache hit issues **zero** requests
- a large read is coalesced into **at most two** range requests
- speculative read-ahead never fetches more than **2x** the requested bytes

Every result is also checked against the same file read with HDF5's ordinary local driver, so "correct" means "indistinguishable from a local read."

Two real bugs fell out of writing those tests, both in the retry logic. The file-length probe, the very first request of a file's life, had **no retry at all**, so a single transient S3 hiccup would fail the open outright, even though every subsequent read would patiently retry eight times. And permanent errors were retried anyway: a 404 issued nine requests and spent roughly **25 seconds** backing off before reporting an error it knew about immediately.

There's a lesson in the order those were found. The tests only caught them because they could observe request *counts*, not just data. A suite that checked "do the right bytes come back?" would have passed on both bugs.

We also checked that the tests could fail. Deliberately reverting the round-trip fix and re-running the suite is a quick way to find out whether your regression tests actually guard the thing they claim to, and the first version of ours didn't. It passed on the broken code. Tightening the assertions until the mutation was caught (`6 <= 2`, six round trips where at most two are allowed) was the difference between a test suite and a decorative one.

## Back upstream

Four of these findings are not C++ problems. They're in the original Python implementation, and we've sent them back as [pull requests](https://github.com/magland/remfile/pulls):

- **HTTP error bodies returned as file data.** `requests` doesn't raise on 4xx/5xx, and remfile never checked the status code, so an S3 `<Error>...</Error>` document could be handed to h5py *as if it were file content*. This is the one to fix first; it's a silent corruption path.
- **No retry on the file-length request**, so opening a file was strictly more fragile than reading from it.
- **The geometric ramp**, costing needless round trips on every large read.
- **`_chunk_increment_factor` is silently ignored.** It is accepted, documented, stored on the instance, and then never used, because the growth factor is hardcoded. Nobody has ever been able to tune that knob.

Each PR carries a hermetic regression test that we verified fails on the current code and passes with the fix.

That feels like the right end to the story. The port started as a way to give C++ what Python already had, and ended up sending something back the other way.

## Try it

remfile-cpp is [on GitHub](https://github.com/catalystneuro/remfile-cpp) under a permissive license, with CI covering HDF5 1.10 through 2.1 on Linux and macOS. It needs only libhdf5 and libcurl:

```cmake
include(FetchContent)
FetchContent_Declare(remfile
    GIT_REPOSITORY https://github.com/catalystneuro/remfile-cpp.git
    GIT_TAG v0.1.2
)
FetchContent_MakeAvailable(remfile)
target_link_libraries(my_app PRIVATE remfile::remfile)
```

It can also be built as a dynamically loadable HDF5 plugin, in which case any HDF5 application can pick it up through `HDF5_PLUGIN_PATH` with no recompilation at all.

Credit where it's due: the caching strategy that makes this fast is [Jeremy Magland's](https://github.com/magland/remfile). We ported it, measured it, and sent back what we learned.
