---
name: "Converting Open Ephys Data to NWB"
description: "How to convert an Open Ephys recording to Neurodata Without Borders (NWB) with NeuroConv: the binary and Open Ephys formats on disk, a working conversion script, multiple streams and synchronization, spike sorting output, and publishing on the DANDI Archive"
type: "guide"
docs: "https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/openephys.html"
---

The Open Ephys GUI is open-source acquisition software for
extracellular electrophysiology, used with Open Ephys acquisition
boards and with Neuropixels probes. This page shows how to convert one
Open Ephys session to Neurodata Without Borders (NWB) with
[NeuroConv](https://neuroconv.readthedocs.io/), the open-source
conversion library that CatalystNeuro maintains. The code and behavior
described are as of NeuroConv 0.10.2, and the scripts were run against
Open Ephys test recordings.

## What the Open Ephys GUI Writes to Disk

Data are saved by the Record Nodes in the signal chain, and each Record
Node writes its own folder. The default is the Binary format, which
looks like this for a Neuropixels recording made with GUI version 0.6
or later:

```text
2026-03-10_14-02-11/
└── Record Node 104/
    ├── settings.xml
    └── experiment1/
        └── recording1/
            ├── structure.oebin
            ├── continuous/
            │   ├── Neuropix-PXI-100.ProbeA-AP/
            │   │   ├── continuous.dat
            │   │   ├── sample_numbers.npy
            │   │   └── timestamps.npy
            │   └── Neuropix-PXI-100.ProbeA-LFP/
            └── events/
```

The levels of this tree have specific meanings:

- **Experiment**: the GUI starts a new `experimentN` folder each time
  acquisition is stopped and restarted. Sample numbers start over.
- **Recording**: the GUI starts a new `recordingN` folder each time
  recording is stopped and restarted while acquisition keeps running.
- **Stream**: each folder under `continuous` is one data stream, a set
  of channels sampled together by one device. A Neuropixels 1.0 probe
  produces an AP stream and an LFP stream.

Within a stream folder, `continuous.dat` holds the samples as 16-bit
integers, `sample_numbers.npy` the index of each sample since the start
of acquisition, and `timestamps.npy` a time in seconds for each sample.
`structure.oebin` describes the channels of every stream, and the
`events` folder holds TTL and text events as `.npy` files.

The original Open Ephys format stores one `.continuous` file per
channel alongside `.events` and `.spikes` files. NeuroConv reads it
too, and calls it the legacy format.

## Installing NeuroConv

NeuroConv keeps the dependencies of each format in an optional extra:

```bash
pip install "neuroconv[openephys]"
```

To add Kilosort or Phy output as well, install
`"neuroconv[openephys,kilosort]"` or `"neuroconv[openephys,phy]"`.

## Converting One Session

`OpenEphysRecordingInterface` converts one stream and detects which of
the two formats it has been given. Point `folder_path` at a Record Node
folder or, for the legacy format, at the folder containing the
`.continuous` files.

```python
from zoneinfo import ZoneInfo

from neuroconv.datainterfaces import OpenEphysRecordingInterface

folder_path = "path/to/2026-03-10_14-02-11/Record Node 104"

# For example: ['Record Node 104#Neuropix-PXI-100.ProbeA-AP',
#               'Record Node 104#Neuropix-PXI-100.ProbeA-LFP', ...]
print(OpenEphysRecordingInterface.get_stream_names(folder_path=folder_path))

interface = OpenEphysRecordingInterface(
    folder_path=folder_path,
    stream_name="Record Node 104#Neuropix-PXI-100.ProbeA-AP",
)

# Everything NeuroConv could read from the Open Ephys files
metadata = interface.get_metadata()

# Open Ephys records the start time without a time zone, so attach the
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

interface.run_conversion(
    nwbfile_path="sub-M001_ses-20260310.nwb",
    metadata=metadata,
    overwrite=True,
)
```

`stream_name` is required only when the folder holds more than one
stream. For the subject, `species` is the Latin binomial, `sex` is one
of `M`, `F`, `U`, or `O`, and `age` is an ISO 8601 duration.

For the Binary format, the session start time is the date recorded in
`settings.xml`; for the legacy format, it is read from the header of
the data files. Either way it is the local time of the acquisition
computer with no time zone attached. If you leave it that way, PyNWB
assumes the time zone of the computer running the conversion. If
NeuroConv cannot find a date, set a complete, time zone aware
`datetime` yourself.

A Record Node folder with more than one experiment needs a
`block_index` argument: `0` selects the first experiment folder, `1`
the second. The date in `settings.xml` belongs to the first experiment,
so set the start time yourself when you convert a later one. When an
experiment holds several recordings, each is written as its own series
with a numeric suffix.

## What NeuroConv Extracts and What You Supply

From the Open Ephys files alone, NeuroConv writes:

- An `ElectricalSeries` in acquisition, stored as the original integers
  with the conversion factor to volts, and an electrodes table with one
  row per channel.
- For a Neuropixels stream whose probe is identified in `settings.xml`,
  a device entry with the probe model and serial number. For other
  hardware, a placeholder device and a single electrode group.
- The session start time, the sampling rate, and the start time of the
  stream.

The remainder has to come from you:

- The time zone, the subject, and the session description, as in the
  script above.
- The brain region of each electrode, and for non-Neuropixels hardware
  the device and the grouping of channels into shanks or tetrodes. The
  `location` column of the electrodes table is written as `unknown` by
  default; see the NeuroConv guide on
  [annotating extracellular electrophysiology data](https://neuroconv.readthedocs.io/en/stable/how_to/annotate_ecephys_data.html).
- Events. As of this version, NeuroConv does not read the TTL and text
  events in the `events` folder. If your task events exist only there,
  load the `.npy` files and add them with
  [PyNWB](https://pynwb.readthedocs.io/).
- Trials, stimuli, and behavior, which need their own interfaces or a
  few lines of PyNWB.

## Multiple Streams, Multiple Probes, and Synchronization

For Binary format recordings, `OpenEphysBinaryConverter` converts every
stream in the folder into one file.

```python
from neuroconv.converters import OpenEphysBinaryConverter

print(OpenEphysBinaryConverter.get_streams(folder_path=folder_path))

converter = OpenEphysBinaryConverter(folder_path=folder_path)
```

The remaining steps are the same as in the first script, with
`converter` in place of `interface`: get the metadata, apply the same
edits, and call `run_conversion`.

Neural streams become `ElectricalSeries` named after the stream
(`ElectricalSeriesProbeAAP`, `ElectricalSeriesProbeALFP`), and the AP
and LFP streams of one probe share rows of the electrodes table.
Analog input streams, such as an NI-DAQ device, become `TimeSeries`.
The converter also writes the single-channel sync streams of
Neuropixels probes; `exclude_streams` leaves out any stream you name.
The converter does not take a `block_index`, so it handles a Record
Node folder with a single experiment, and there is no equivalent for
the legacy format.

Check the electrodes table when a Record Node holds more than one
probe. In our test of this version with two Neuropixels probes, both
were assigned to one electrode group and shared one set of electrode
rows. Giving each probe its own group name before calling
`get_metadata` keeps them apart:

```python
probe_of_stream = {
    "Record Node 101#Neuropix-PXI-100.ProbeB": "ProbeB",
    "Record Node 101#Neuropix-PXI-100.ProbeC": "ProbeC",
}
for stream_name, probe_name in probe_of_stream.items():
    recording = converter.data_interface_objects[stream_name].recording_extractor
    recording.set_property(
        key="group_name",
        values=[probe_name] * recording.get_num_channels(),
    )
```

Each stream is written with its nominal sampling rate and a start time
computed from its first sample number, so the series do not start at
zero. NeuroConv does not go further than this on its own. Streams from
different devices run on separate clocks that can drift apart over a
recording. When the streams were synchronized in the Record Node
through a shared sync line, the GUI writes the synchronized times to
`timestamps.npy`, but NeuroConv does not read that file. To use those
times, hand them to the interface before running the conversion:

```python
import numpy as np

stream_name = "Record Node 104#Neuropix-PXI-100.ProbeA-AP"
ap_interface = converter.data_interface_objects[stream_name]
timestamps = np.load(
    "path/to/recording1/continuous/Neuropix-PXI-100.ProbeA-AP/timestamps.npy"
)
ap_interface.set_aligned_timestamps(aligned_timestamps=timestamps)
```

For data recorded on another system, such as a camera, NeuroConv's
[temporal alignment documentation](https://neuroconv.readthedocs.io/en/stable/user_guide/temporal_alignment.html)
describes the supported approaches.

## Adding Spike Sorting Output

`KiloSortSortingInterface` reads a Kilosort output folder (the one
containing `params.py`) directly. If you curated the sorting in Phy,
use `PhySortingInterface`, which reads the same folder and can leave
out clusters by curation label through `exclude_cluster_groups`. A
`ConverterPipe` puts the sorting and the raw data in the same file:

```python
from neuroconv import ConverterPipe
from neuroconv.converters import OpenEphysBinaryConverter
from neuroconv.datainterfaces import KiloSortSortingInterface

open_ephys_converter = OpenEphysBinaryConverter(folder_path=folder_path)
sorting_interface = KiloSortSortingInterface(
    folder_path="path/to/kilosort_output"
)

# Put the spike times on the clock of the stream that was sorted
ap_interface = open_ephys_converter.data_interface_objects[
    "Record Node 104#Neuropix-PXI-100.ProbeA-AP"
]
sorting_interface.register_recording(ap_interface)

converter = ConverterPipe(
    data_interfaces={
        "OpenEphys": open_ephys_converter,
        "Kilosort": sorting_interface,
    }
)
```

From here the script continues as the first one does: get the metadata
from `converter`, apply the same edits, and call `run_conversion`.

The `register_recording` call matters. Kilosort reports each spike as a
sample index counted from the start of the file it sorted, while the
series in the NWB file starts at the stream's start time, which is
usually not zero. Without the call, spike times are counted from zero
and sit earlier than the raw trace by that amount. Any alignment of
the recording interface has to happen before the registration. The
call assumes Kilosort ran on `continuous.dat` as recorded, not on a
trimmed or concatenated copy.

The units table written this way holds the spike times and the cluster
properties Kilosort saved, such as `KSLabel`, but does not link each
unit to its electrodes. `SortedRecordingConverter` adds that link from
a mapping of unit IDs to channel IDs; see
[How to Link Sorted Data to Electrodes](https://neuroconv.readthedocs.io/en/stable/how_to/linking_sorted_data.html).

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

A session is usually more than its Open Ephys files: there is often
behavioral and stimulus data from a custom rig as well. CatalystNeuro
builds conversion pipelines for labs. Our
[conversion portfolio](/nwb-conversions/) is public, and you can
[request a consultation](/consultation/) if you would like help with
yours.
