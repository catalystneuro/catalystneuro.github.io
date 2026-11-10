---
name: "Converting SpikeGLX Data to NWB"
description: "How to convert a SpikeGLX Neuropixels recording to Neurodata Without Borders (NWB) with NeuroConv: what SpikeGLX writes to disk, a working conversion script, stream synchronization, spike sorting output, and publishing on the DANDI Archive"
type: "guide"
docs: "https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/spikeglx.html"
---

SpikeGLX is acquisition software for Neuropixels probes. This page
shows how to convert one SpikeGLX session to Neurodata Without Borders
(NWB) with [NeuroConv](https://neuroconv.readthedocs.io/), the
open-source conversion library that CatalystNeuro maintains. The code
and behavior described are as of NeuroConv 0.10.2, and the scripts were
run against SpikeGLX test recordings.

## What SpikeGLX Writes to Disk

SpikeGLX saves a run in a folder named after the run and its gate
index, such as `my_run_g0`. Every data file comes as a pair: a `.bin`
file holding the samples as 16-bit integers with no header, and a
`.meta` text file that records the sampling rate, channel map, gains,
and probe. File names carry the run name, the gate index (`g0`), the
trigger index (`t0`), and the stream.

```text
my_run_g0/
├── my_run_g0_t0.nidq.bin
├── my_run_g0_t0.nidq.meta
└── my_run_g0_imec0/
    ├── my_run_g0_t0.imec0.ap.bin
    ├── my_run_g0_t0.imec0.ap.meta
    ├── my_run_g0_t0.imec0.lf.bin
    └── my_run_g0_t0.imec0.lf.meta
```

The per-probe subfolders appear when the "Folder per probe" option is
on. With it off, all files sit directly in the run folder. NeuroConv
reads either layout. The streams are:

- **`imecN.ap`**: the action potential band of probe N, nominally
  30 kHz.
- **`imecN.lf`**: the local field potential band of probe N, at
  2.5 kHz. Neuropixels 1.0 probes save the two bands as separate files.
  Neuropixels 2.0 probes are full-band and save a single `.ap` file.
- **`nidq`**: the analog and digital channels of a National Instruments
  device, typically task TTLs, camera frame pulses, and other rig
  signals.

Each probe file also carries a sync channel (`SY`), a status word in
which one bit is the square wave SpikeGLX uses to synchronize streams.

## Installing NeuroConv

NeuroConv keeps the dependencies of each format in an optional extra:

```bash
pip install "neuroconv[spikeglx]"
```

To add Kilosort or Phy output as well, install
`"neuroconv[spikeglx,kilosort]"` or `"neuroconv[spikeglx,phy]"`.

## Converting One Session

`SpikeGLXConverterPipe` takes the run folder and writes every stream in
it to one NWB file.

```python
from zoneinfo import ZoneInfo

from neuroconv.converters import SpikeGLXConverterPipe

folder_path = "path/to/my_run_g0"

# For example: ['imec0.ap', 'nidq', 'imec0.lf', 'imec0.ap-SYNC', 'imec0.lf-SYNC']
print(SpikeGLXConverterPipe.get_streams(folder_path=folder_path))

converter = SpikeGLXConverterPipe(folder_path=folder_path)

# Everything NeuroConv could read from the .meta files
metadata = converter.get_metadata()

# SpikeGLX records the start time without a time zone, so attach the
# time zone of the rig.
session_start_time = metadata["NWBFile"]["session_start_time"]
metadata["NWBFile"]["session_start_time"] = session_start_time.replace(
    tzinfo=ZoneInfo("America/New_York")
)

metadata["NWBFile"]["session_description"] = (
    "Head-fixed recording during a visual discrimination task."
)
metadata["NWBFile"]["experimenter"] = ["Last, First"]
metadata["NWBFile"]["lab"] = "My Lab"
metadata["NWBFile"]["institution"] = "My University"

# Subject metadata is required for upload to DANDI
metadata["Subject"] = dict(
    subject_id="M001",
    species="Mus musculus",
    sex="M",
    age="P90D",
)

converter.run_conversion(
    nwbfile_path="sub-M001_ses-20260310.nwb",
    metadata=metadata,
    overwrite=True,
)
```

The session start time comes from the `fileCreateTime` field of the
`.meta` file, which is the local time of the acquisition computer with
no time zone attached. If you leave it that way, PyNWB assumes the time
zone of the computer running the conversion. If the date has been
zeroed out of the `.meta` file, as is sometimes done to de-identify
human recordings, supply a complete, time zone aware `datetime`
yourself. For the subject, `species` is the Latin binomial, `sex` is
one of `M`, `F`, `U`, or `O`, and `age` is an ISO 8601 duration.

To try the script on a small slice of the data first, ask each
interface for a stub:

```python
conversion_options = {
    name: dict(stub_test=True) for name in converter.data_interface_objects
}
converter.run_conversion(
    nwbfile_path="stub.nwb",
    metadata=metadata,
    conversion_options=conversion_options,
    overwrite=True,
)
```

## What NeuroConv Extracts and What You Supply

From the SpikeGLX files alone, NeuroConv writes:

- `ElectricalSeriesAP` and `ElectricalSeriesLF` in acquisition, stored
  as the original integers with the conversion factor to volts. When
  the run has more than one probe, the names gain a probe suffix
  (`ElectricalSeriesAPImec0`, `ElectricalSeriesAPImec1`).
- An electrodes table with one row per recording site, shared by the
  AP and LF bands of a probe, and a device entry for each probe with
  its model and serial number.
- The NIDQ analog channels and the sync channel of each probe as
  `TimeSeries`, and the NIDQ digital lines as events tables, one per
  line by default.
- The session start time, and the sampling rate and start time of each
  stream.

The remainder has to come from you:

- The time zone, the subject, and the session description, as in the
  script above.
- The brain region of each electrode. The `location` column of the
  electrodes table is written as `unknown` by default; see the
  NeuroConv guide on
  [annotating extracellular electrophysiology data](https://neuroconv.readthedocs.io/en/stable/how_to/annotate_ecephys_data.html).
- What each NIDQ channel means. The
  [SpikeGLX page of the Conversion Gallery](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/spikeglx.html)
  shows how to name analog channel groups and choose which digital
  lines become events.
- Trials, stimuli, and behavior, which are not in the SpikeGLX files.
  Each needs its own interface or a few lines of
  [PyNWB](https://pynwb.readthedocs.io/).

## Multiple Probes, Multiple Streams, and Synchronization

The converter picks up every probe in the run folder without further
configuration. If the folder holds more than one trigger file (`t0`,
`t1`, and so on), each is written as its own series with a numeric
suffix.

Each stream is written with its own sampling rate and start time.
NeuroConv takes the start time from the `firstSample` field of that
stream's `.meta` file, so the series do not start at zero and do not
all start at the same instant.

NeuroConv does not go further than this on its own. Each probe and the
NI device run on separate clocks, and NeuroConv does not use the sync
square wave to correct for drift between them. The sync channels are
kept in the file, but the timestamps are not adjusted. If your analysis
depends on precise timing across streams over a long recording, align
them before writing. There are two common routes:

1. Run the SpikeGLX tools CatGT and TPrime, which extract the sync
   edges and map times from one stream onto another, and give the
   resulting times to NeuroConv.
2. Align in NeuroConv. The recording interfaces have
   `set_aligned_timestamps` and `align_by_interpolation`, and
   `SpikeGLXNIDQInterface.get_event_times_from_ttl(channel_name="XA0")`
   returns the rising edge times of a TTL on an NIDQ channel.

```python
imec1_ap = converter.data_interface_objects["imec1.ap"]
imec1_ap.align_by_interpolation(
    unaligned_timestamps=sync_edge_times_on_imec1,
    aligned_timestamps=sync_edge_times_on_imec0,
)
```

Do this before calling `run_conversion`. The same methods apply to
data recorded on another system, such as a camera. NeuroConv's
[temporal alignment documentation](https://neuroconv.readthedocs.io/en/stable/user_guide/temporal_alignment.html)
describes the three supported approaches.

## Adding Spike Sorting Output

`KiloSortSortingInterface` reads a Kilosort output folder (the one
containing `params.py`) directly. If you curated the sorting in Phy,
use `PhySortingInterface`, which reads the same folder and can leave
out clusters by curation label through `exclude_cluster_groups`. A
`ConverterPipe` puts the sorting and the raw data in the same file:

```python
from neuroconv import ConverterPipe
from neuroconv.converters import SpikeGLXConverterPipe
from neuroconv.datainterfaces import KiloSortSortingInterface

spikeglx_converter = SpikeGLXConverterPipe(folder_path="path/to/my_run_g0")
sorting_interface = KiloSortSortingInterface(
    folder_path="path/to/kilosort_output"
)

# Put the spike times on the clock of the AP stream that was sorted
ap_interface = spikeglx_converter.data_interface_objects["imec0.ap"]
sorting_interface.register_recording(ap_interface)

converter = ConverterPipe(
    data_interfaces={
        "SpikeGLX": spikeglx_converter,
        "Kilosort": sorting_interface,
    }
)
```

From here the script continues as the first one does: get the metadata
from `converter`, apply the same edits, and call `run_conversion`.

The `register_recording` call matters. Kilosort reports each spike as a
sample index counted from the start of the `.ap.bin` file, while the AP
series in the NWB file starts at the stream's start time, which is
usually not zero. Without the call, spike times are counted from zero
and sit earlier than the raw trace by that amount. Any alignment of
the AP interface has to happen before the registration. The call
assumes Kilosort ran on the `.ap.bin` file as recorded, not on a
trimmed or concatenated copy.

The units table written this way holds the spike times and the cluster
properties Kilosort saved, such as `KSLabel`, but does not link each
unit to its electrodes. `SortedSpikeGLXConverter` adds that link from a
mapping of unit IDs to channel IDs, and handles several probes sorted
separately; see
[How to Link Sorted Data to Electrodes](https://neuroconv.readthedocs.io/en/stable/how_to/linking_sorted_data.html).
Register the recording there in the same way.

## Checking the File and Publishing on DANDI

Run NWB Inspector with the DANDI configuration on the result before
converting the remaining sessions:

```bash
pip install nwbinspector
nwbinspector sub-M001_ses-20260310.nwb --config dandi
```

Our guide to
[sharing neurophysiology data with NWB and DANDI](/guides/nwb-dandi-guide/)
covers the next steps in full: viewing the file in Neurosift, creating
a dandiset, uploading, and embargo.

## Custom Rig Data and Other Formats

A session is usually more than its SpikeGLX files: there is often
behavioral and stimulus data from a custom rig as well. CatalystNeuro
builds conversion pipelines for labs. Our
[conversion portfolio](/nwb-conversions/) is public, and you can
[request a consultation](/consultation/) if you would like help with
yours.
