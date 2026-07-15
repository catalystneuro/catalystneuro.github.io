---
title: "Streaming Remote HDF5 Files from C++ with remfile-cpp"
date: "2026-07-14"
description: "A new HDF5 virtual file driver that streams remote NWB files over HTTP with adaptive caching. It opens files several times faster than ROS3, works with any HDF5 build, and is now integrated into AqNWB."
image: "/images/blog/remfile-cpp-banner.png"
readTime: "8 min read"
author: "Benjamin Dichter"
keywords: ["NWB", "HDF5", "C++", "remfile", "AqNWB", "DANDI", "cloud computing", "ROS3", "streaming", "neurophysiology"]
---

Neurophysiology datasets are now large enough that analyzing them on a local machine is often impractical. A single Neuropixels session on the [DANDI Archive](https://dandiarchive.org/) can be hundreds of gigabytes, and downloading an entire file to read a small part of it is wasteful. The Python ecosystem has a good solution for this: [remfile](https://github.com/magland/remfile), by Jeremy Magland, lets h5py read a remote HDF5 file over HTTP and fetch only the bytes it needs.

C++ did not have an equivalent, and we needed one. [AqNWB](https://github.com/NeurodataWithoutBorders/aqnwb), the C++ API for acquiring data in the NWB format, is used by acquisition systems written in C++, and those systems increasingly need to read remote NWB files as well as write local ones.

To fill that gap we wrote [remfile-cpp](https://github.com/catalystneuro/remfile-cpp), a C++ implementation of remfile's approach packaged as an HDF5 virtual file driver. It is now an optional dependency of AqNWB. In the process of building and benchmarking it, we also found several issues in the original Python package and contributed fixes back.

## Reading HDF5 Through a Virtual File Driver

One way to read remote HDF5 files is to write a library that parses the HDF5 format directly and fetches the parts it needs. This is a large undertaking. HDF5 is a rich format, with chunking, compression filters, virtual datasets, and several kinds of B-tree, and a reimplementation has to track all of it over time.

There is a much smaller point of integration. Inside libhdf5, every byte the library reads passes through a set of function pointers called a Virtual File Driver (VFD). A VFD answers a single narrow question:

> Give me `size` bytes starting at address `addr`.

HDF5 handles the format itself, so a driver only has to return bytes. If it answers that request with an HTTP range request rather than a `pread()`, then the full HDF5 feature set, including every filter, chunking scheme, and dataset layout, works against a URL with no other changes. This is the same mechanism remfile uses in Python, where h5py's `driver='fileobj'` is built on it. Reaching it from C++ means implementing the VFD interface directly.

```c
hid_t fapl = H5Pcreate(H5P_FILE_ACCESS);
H5Pset_fapl_remfile(fapl, NULL);
hid_t file = H5Fopen("https://dandiarchive.s3.amazonaws.com/blobs/...",
                     H5F_ACC_RDONLY, fapl);
// From here on this is ordinary HDF5, with no knowledge that the file is remote.
```

In AqNWB it is a single call:

```cpp
auto io = std::make_shared<AQNWB::IO::HDF5::HDF5IO>(url);
io->openRemote();
```

## Comparison with the ROS3 Driver

HDF5 already ships a driver for reading over S3, called ROS3, and AqNWB [added support for it](https://github.com/NeurodataWithoutBorders/aqnwb/pull/308) alongside this work. It is reasonable to ask why we wrote another one. There are three reasons.

The first is availability. ROS3 is a compile-time option, and whether you have it depends on how HDF5 was built. Homebrew's HDF5 does not include it, and neither do the PyPI `h5py` wheels, which bundle their own copy of HDF5. conda-forge's `hdf5` and Ubuntu's `libhdf5-dev` do include it. On my machine, every environment that lacked ROS3 had `h5py` installed from pip, and I had to build a dedicated environment to benchmark against it. remfile-cpp needs only libcurl, so it works with any HDF5 from 1.10 through 2.x regardless of how it was built.

*(Correction: an earlier version of this post said ROS3 was "absent from every conda `h5py` environment," which overstated the case. As the HDF Group [pointed out](https://github.com/HDFGroup/hdf5/discussions/6527), conda-forge's HDF5 ships the driver. The environments I hit had h5py from PyPI rather than conda-forge.)*

The second reason is that ROS3 speaks S3, while remfile-cpp speaks plain HTTP. This lets it work with presigned URLs, which is useful because presigned S3 URLs reject `HEAD` requests. remfile gets the file size from a one-byte range request instead, which allows a class of URLs to work that would otherwise fail.

The third reason is performance, which is discussed in the next section.

## Caching and Read-Ahead

Opening an NWB file is not a single large read. It is a few hundred small reads scattered across the file: the superblock, then B-tree nodes, then object headers, each a few hundred bytes and each at an unpredictable offset. Performing these over a network without caching costs a full round trip per read, so the limiting factor is latency rather than bandwidth.

remfile addresses this with a chunk cache and an adaptive read-ahead, which we ported directly. Reads are served from an in-memory cache of 100 KiB chunks. On a cache miss, the driver fetches the missing chunk along with some of the data that follows it. When it detects sequential access it grows that read-ahead window, and when access jumps around the file it shrinks the window back down. Metadata traversal stays cheap, and sequential reads are combined into a small number of larger requests.

The main benefit is at file open. The table below reads a 23 MB slice of an `ElectricalSeries` from a DANDI file, alternating between the two drivers to cancel network drift, reported as medians of 8 runs each.

| Phase | ROS3 (HDF5 2.1) | ROS3 (HDF5 develop) | remfile-cpp |
|---|---|---|---|
| open (`H5Fopen`) | 3.26 s | 1.51 s | **0.35 s** |
| read (23 MB) | **1.06 s** | 1.58 s | 1.20 s |
| **total** | 4.40 s | 3.08 s | **1.56 s** |

remfile-cpp opens the file about four times faster than current ROS3, and is a little under twice as fast end to end on this workload. This matches expectations: opening the file is dominated by many small scattered reads, which is the access pattern a read-ahead cache helps most. The read times are close enough, and variable enough between runs, that I would not draw a conclusion about the bulk read from these numbers.

The two ROS3 columns deserve an explanation. When I first published this post, ROS3 opened this file in about 3.3 seconds, and I reported roughly a tenfold difference. Shortly afterward, the HDF Group [pointed out](https://github.com/HDFGroup/hdf5/discussions/6527) that ROS3 was eagerly caching several megabytes at file open, which is what my open timing was measuring, and that a [commit merged the same day](https://github.com/HDFGroup/hdf5/commit/1325d30b21ee1328e88103b269a74cad699fa7b6) moved that work to the first read and added an internal block cache. Rebuilding against `develop` cut ROS3's open time roughly in half, so the current difference is about fourfold rather than tenfold, and it will continue to narrow as that cache develops. The numbers in the table are from the rebuilt `develop` branch.

## A Bug Found by Benchmarking

The bulk-read column is also where I found a bug in my own port. The first version was about 2.4 times slower than ROS3 on large reads, which was surprising enough to look into. Logging the actual HTTP requests showed the cause.

The read-ahead only ever grew its window geometrically: 100 KiB, then 170 KiB, then 290 KiB, and so on. It never considered how much the current read was actually asking for. As a result, a single large read did not issue one large request. Instead it grew toward the right size over several steps, paying a network round trip at each step. A 23 MB read was taking 11 sequential requests where one would have been enough.

The fix was small: never fetch less than the current read already needs. The read-ahead beyond the requested range still follows the original logic, so sequential behavior is unchanged, and only the redundant round trips are removed. This brought the same read down from 11 requests to 5 and made bulk-read throughput comparable to ROS3, while keeping the advantage at open.

The same behavior exists in the Python original, where it is easy to observe. Reading 64 KB with a 1 KB chunk size issues seven requests:

```
(0, 1023) (1024, 3071) (3072, 7167) (7168, 14335)
(14336, 26623) (26624, 48127) (48128, 65535)
```

The request sizes grow 1 KB, 2 KB, 4 KB, 7 KB, 12 KB, 21 KB, 17 KB, which is seven round trips to satisfy one read.

## Testing a Network-Backed Driver

The straightforward way to test a driver that reads over HTTP is to point it at a real file and check that the bytes come back correctly. The port started with a test like this, but it is a weak test. It is slow, it depends on the DANDI Archive being reachable, and it says nothing about how the driver fetched the data.

We replaced it with a hermetic test suite that runs an HTTP server inside the test process and serves a generated HDF5 file. It requires no network and runs fifteen tests in about two seconds. Because the test server counts requests and records the byte ranges it is asked for, the tests can check the driver's behavior directly rather than infer it from timing:

- a cache hit issues zero requests
- a large read is combined into at most two range requests
- speculative read-ahead never fetches more than twice the requested bytes

Every result is also compared against the same file read with HDF5's ordinary local driver, so a correct read is defined as one that is indistinguishable from a local read.

Writing these tests surfaced two more bugs, both in the retry logic. The file-length request, which is the first request made when a file is opened, had no retry at all, so a single transient failure would fail the open even though every later read would retry eight times. Separately, permanent errors were retried anyway: a request for a missing file issued nine requests and spent about 25 seconds backing off before reporting an error it could have reported immediately.

The order in which these were found is worth noting. The tests caught them only because they could observe request counts rather than just returned data. A test that checked only whether the right bytes came back would have passed in both cases.

We also checked that the tests could actually fail. Reverting the round-trip fix and rerunning the suite is a quick way to confirm that a regression test guards what it claims to, and the first version of ours did not: it passed on the broken code. Tightening the assertions until the reverted change was caught, with a check that at most two round trips occur where the broken version made six, was the difference between a useful test and a decorative one.

## Fixes Contributed Back to the Python Package

Four of these findings are not specific to C++. They exist in the original Python implementation, and we submitted them as [pull requests](https://github.com/magland/remfile/pulls):

- **HTTP error bodies could be returned as file data.** The `requests` library does not raise on 4xx or 5xx responses, and remfile did not check the status code, so an S3 `<Error>...</Error>` document could be passed to h5py as if it were file content. This is the most important of the four, because it is a silent data-corruption path.
- **The file-length request had no retry**, which made opening a file more fragile than reading from it.
- **The geometric read-ahead ramp** added unnecessary round trips to every large read.
- **`_chunk_increment_factor` was silently ignored.** The argument is accepted, documented, and stored on the instance, but never used, because the growth factor was hardcoded. As a result the setting had no effect.

Each pull request includes a hermetic regression test that we verified fails on the current code and passes with the fix.

## Availability

remfile-cpp is available [on GitHub](https://github.com/catalystneuro/remfile-cpp) under a permissive license, with CI covering HDF5 1.10 through 2.1 on Linux and macOS. It requires only libhdf5 and libcurl.

```cmake
include(FetchContent)
FetchContent_Declare(remfile
    GIT_REPOSITORY https://github.com/catalystneuro/remfile-cpp.git
    GIT_TAG v0.1.2
)
FetchContent_MakeAvailable(remfile)
target_link_libraries(my_app PRIVATE remfile::remfile)
```

It can also be built as a dynamically loadable HDF5 plugin, in which case any HDF5 application can load it through `HDF5_PLUGIN_PATH` without recompiling.

The caching strategy that makes this work is Jeremy Magland's, from the original [Python remfile](https://github.com/magland/remfile). Our contribution was to port it to C++ as a VFD, benchmark it, and send the issues we found back upstream.
