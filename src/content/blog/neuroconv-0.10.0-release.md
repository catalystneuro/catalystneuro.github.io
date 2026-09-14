---
title: "NeuroConv 0.10.0 Release"
date: "2026-08-18"
description: "NeuroConv 0.10.0 writes events as the NWBEP001 event tables, grows fiber photometry from one supported format to five, introduces metadata templates and annotation guides for optical physiology, and ships new session-wide converters and formats."
image: "/images/software/neuroconv_logo_for_images.png"
readTime: "9 min read"
keywords: ["NeuroConv", "NWB", "neurophysiology", "data conversion", "fiber photometry", "events", "NWBEP001", "optical physiology", "metadata", "release"]
---

# NeuroConv 0.10.0 Release

We are pleased to announce the release of [NeuroConv 0.10.0](https://pypi.org/project/neuroconv/), the largest release the project has had. It covers everything since [v0.9.0](https://github.com/catalystneuro/neuroconv/releases/tag/v0.9.0), the last release we wrote about here, including the v0.9.1, v0.9.2 and v0.9.3 patches. Fiber photometry and discrete events are first-class modalities now: new interfaces for five photometry formats and six event sources, metadata templates to assist the annotation of the datasets, and improved documentation and how-to guides for making sense of them. Intracellular electrophysiology was rebuilt around one interface per electrode and the NWB sweep tables. NeuroConv now converts 64 formats, thirteen of them added in this stretch. Test it today:

```bash
pip install --upgrade neuroconv
```

NeuroConv now supports the latest versions of pynwb and hdmf, and requires `pynwb>=4.0.0` and `hdmf>=6.1.0`.

![Formats supported by NeuroConv, counted from when support for each format was merged, rising from the first interfaces in late 2020 to 64 at v0.10.0](/images/blog/neuroconv-format-support.svg)

## Events

NeuroConv now writes events as `EventsTable` objects into `nwbfile.events`, the type [NWBEP001](https://nwb.org/news/pynwb-4.0.0-release/) brought into the core standard and [pyNWB 4](https://pynwb.readthedocs.io/) ships. The supported sources are:

- [Doric](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/events/doric_events.html): digital IO from `.doric` HDF5 files and from CSV exports, modern and legacy EPConsole layouts
- [Neurophotometrics](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/events/npm_events.html): the two-column stimuli CSVs
- [TDT](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/events/tdt_events.html): epocs, with or without durations
- [Intan](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/intan.html): the digital input and output words
- [SpikeGLX](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/spikeglx.html): the NIDQ digital lines
- [Plain CSV](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/events/csv_events.html): any table with timestamp, event type, value and duration columns

To make annotating this data easier, we added two how-to guides:

- **[Annotating events metadata](https://neuroconv.readthedocs.io/en/stable/how_to/annotate_events_metadata.html)**: naming the table and its columns, replacing the raw codes a rig writes with readable labels, describing what each label means in a [`MeaningsTable`](https://nwb.org/news/pynwb-4.0.0-release/), and pooling event types from one interface or from several into a single shared table.
- **[Extracting events from a sampled signal](https://neuroconv.readthedocs.io/en/stable/how_to/extract_events_from_signals.html)**: which signals to read, how each becomes a two-valued line, and which of its transitions become event timestamps.

## Fiber photometry

Fiber photometry went from one supported format to five, all of them written in the [`ndx-fiber-photometry`](https://github.com/catalystneuro/ndx-fiber-photometry) extension format through a shared base interface. The supported formats are:

- [Doric](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/fiberphotometry/doric_fp.html): `.doric` HDF5 files and Doric Neuroscience Studio CSV exports
- [TDT](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/fiberphotometry/tdt_fp.html): tanks
- [Neurophotometrics](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/fiberphotometry/npm_fp.html): raw NPM output
- [Plain CSV](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/fiberphotometry/csv_fp.html): any table of timestamps and fluorescence columns, for systems with no dedicated interface here

The provenance chain the format asks for, the fibers, indicators, excitation sources and their models, is more than any acquisition file records. To make annotating it easier, we added:

- **[Metadata Templates](https://neuroconv.readthedocs.io/en/stable/user_guide/metadata_templates.html#fiber-photometry)**: the full structure published as YAML and JSON to fill in by hand, and returned in code by `get_metadata_template()` with every field only the experimenter can supply left as `None`.
- **[How to Annotate Fiber Photometry Metadata](https://neuroconv.readthedocs.io/en/stable/how_to/annotate_fiber_photometry_metadata.html)**: builds a `FiberPhotometryTable` one step at a time, starting from a conversion with no metadata at all.

We have also added support for [GuPPy](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/fiberphotometry/guppy_fp.html), the [fiber photometry analysis pipeline](https://github.com/LernerLab/GuPPy):

- `GuppyInterface` adds GuPPy's outputs to a file you already have. Hand it an NWB file and each recording site is linked to the `FiberPhotometryTable` rows its fibers already occupy there. Point it at a new path instead and the source is exported with the outputs added. GuPPy's own analyzed onsets are written as an `EventsTable` in `nwbfile.events`, so every peri-event product reaches the occurrences it was built from.
- `GuppyConverter` converts a whole session at once, the raw acquisition, the raw events and GuPPy's analyzed outputs into one file. The acquisition format is chosen with `acquisition_format` (`"tdt"`, `"csv"`, `"doric"` or `"npm"`, all four installed by `neuroconv[guppy]`), and its series are grouped by excitation wavelength.

## Improved metadata annotation for optical physiology

An optical physiology conversion writes several objects that point at each other. A `MicroscopySeries` names the `ImagingPlane` it was recorded through, that plane names its `Device`, and a `PlaneSegmentation` names the plane it segments. Those links used to be positions in a list. That was error prone and hard to get right: annotating a two-channel recording meant working out which entry was which channel before editing it.

In this release we introduced a new metadata schema for optical physiology. Each entry now has a name you choose and points at the others by that name. To improve the user experience, and the documentation of the new format, we also added the following:

- **[How to Annotate Optical Physiology Data](https://neuroconv.readthedocs.io/en/stable/how_to/annotate_ophys_metadata.html)**: builds the structure for a real recording, starting from a conversion with no metadata at all.
- A new method, `get_metadata_template()`, returns the whole structure the writer expects, sized to what the file will actually hold, with the cross-references already resolved and every field only the experimenter can supply left as `None`. What comes back `None` is exactly what the source could not tell us, so the blanks are the checklist.
- The new [Metadata Templates](https://neuroconv.readthedocs.io/en/stable/user_guide/metadata_templates.html#optical-physiology) page publishes those same structures as YAML and JSON files, to fill in by hand, for both [imaging](https://neuroconv.readthedocs.io/en/stable/user_guide/metadata_templates.html#ophys-imaging-metadata-template) and [segmentation](https://neuroconv.readthedocs.io/en/stable/user_guide/metadata_templates.html#ophys-segmentation-metadata-template) data.

## Improved intracellular electrophysiology support

Intracellular electrophysiology gets a section of the conversion gallery of its own, two formats, and the tables NWB defines for organizing sweeps:

- The [Axon Binary Format](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/abf.html), read by `AxonIntracellularInterface` in place of the deprecated `AbfInterface`. Each instance handles one electrode in one file, written as a single continuous `PatchClampSeries` with one [intracellular recordings](https://pynwb.readthedocs.io/en/stable/tutorials/domain/plot_icephys.html) row per sweep.
- The [voltage recordings](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/brukervoltagerecording.html) Bruker PrairieView writes alongside two-photon imaging, with the per-cycle files combined into a single series on one timeline and one [intracellular recordings](https://pynwb.readthedocs.io/en/stable/tutorials/domain/plot_icephys.html) row per cycle.
- `AxonIntracellularConverter` and `BrukerVoltageRecordingConverter` write the [icephys hierarchy tables](https://pynwb.readthedocs.io/en/stable/tutorials/domain/plot_icephys.html). The intracellular recordings table carries the sweep structure, each sweep a row addressed as a range of the electrode's series, and `SimultaneousRecordings`, `SequentialRecordings`, `Repetitions` and `ExperimentalConditions` are assembled above it across the channels and protocol files of one cell. A `sweeps` intervals table carries each sweep's start and stop time as well, so tools that read NWB intervals, such as [pynapple](https://pynapple.org), surface them with no icephys-specific code.

## New interfaces

An interface reads one source of data and writes it into an NWB file, and it is the unit you reach for when a
conversion needs one thing from one instrument. In this release we added interfaces for the following:

- [VAME](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/behavior/vame.html): behavioral segmentation, written both as the faithful [`ndx-vame`](https://github.com/catalystneuro/ndx-vame) series and as a curated [`ndx-ethogram`](https://github.com/catalystneuro/ndx-ethogram) bout timeline
- [MountainSort](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/sorting/mda.html): spike sorting, from the `firings.mda` output of v4 and earlier
- [XClust](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/sorting/xclust.html): spike sorting, from its `.CEL` files
- [Intan](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/intan.html) stimulation current: the RHS2000 stim channel
- [Intan](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/intan.html) digital lines: the input and output words, written as events
- [Bruker Prairie View](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/imaging/brukertiff.html): single-plane, volumetric and multi-channel folders through one interface, replacing the four deprecated single-plane and multi-plane classes

## New converters

Converters discover what an experimental session contains for a given format and write all of it in
one call. Their role is to gather the data for you, so you do not have to assemble the interfaces
yourself. In this release we added converter support for the following formats:

- [ScanImage](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/imaging/scanimage.html): every channel of an acquisition, planar or volumetric, whether it sits in one file or spans many
- [Thor](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/imaging/thor.html): every channel of a ThorImageLS acquisition
- [Bruker Prairie View](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/imaging/brukertiff.html): every channel of a folder, planar or volumetric
- [Suite2p](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/segmentation/suite2p.html): every plane and channel of an output folder
- [Open Ephys](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/openephys.html): every stream of a binary session, each neural stream as its own `ElectricalSeries` and the ADC and NI-DAQ streams as `TimeSeries`
- [Intan](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/intan.html): every stream of a session, see the next section

## Full Intan support

The newly added [`IntanConverter`](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/intan.html) supports the complete list of streams an Intan
acquisition session typically produces, on both `.rhd` and `.rhs` files. It reads the header, discovers which
of them a session holds, and routes each one for you:

- The amplifier channels, RHD2000 and RHS2000 alike
- The auxiliary input channels of an RHD2000
- The USB board ADC input and output channels
- The DC amplifier channels of an RHS2000
- The stimulation current of an RHS2000
- The USB board digital input and output words, written as events

All three of the on-disk layouts RHX can write are covered, and the layout is inferred from the
header so the API is the same for each:

- Traditional Intan File Format, the single `.rhd` or `.rhs` file
- One File Per Signal Type, pointed at the session's `info.rhd` or `info.rhs`
- One File Per Channel, pointed at the same header file

We also support the traditional format's "create a new save file every N minutes" option: the
rotated files are read as one continuous recording, so a split session converts in a single call.

## Other improvements

- **Improved Neuropixels provenance**: [SpikeGLX](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/spikeglx.html) and [Open Ephys](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/openephys.html) recordings write the attached Neuropixels probe's identity, a `DeviceModel` carrying the manufacturer and model number as [probeinterface](https://probeinterface.readthedocs.io/en/main/neuropixels_readers.html) catalogues them, and a `Device` carrying the unit's serial number. Those values are read off the probe itself, so the file states which probe was used and its geometry can be rebuilt from that identity alone.
- **Enhanced EDF support**: [EDF](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/edf.html) recordings take a `stream_name`, with `get_stream_names` listing what a file offers, so a file that samples some of its signals at a different rate than the rest converts one stream at a time. A recording whose channels were each autoscaled to their own range can go into a single `ElectricalSeries` through the new `data_representation="physical_units"` option, which folds each channel's gain and offset into float data. A new [how-to guide](https://neuroconv.readthedocs.io/en/stable/how_to/handle_heterogeneous_offsets.html) says which of the two applies to a given recording. The subject fields the header carries also reach the file now, including the patient's sex, and `experimenter` is written as the list the schema asks for.
- **Proper detection of Inscopix volumetric recordings**: [Inscopix](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/imaging/inscopix.html) recordings decide their plane count from the file's own `microscope.multiplane.enabled` flag, so a single-plane recording converts and a multiplane one raises a message saying it is not supported yet. Files too old to carry the flag warn and load as single-plane.
- **Proper support of Miniscope behavioral recordings**: `MiniscopeConverter` now writes the behavior videos of a session driven by a User Config file, discovered from `devices[cameras]` in that config, each with the timestamps of its own `timeStamps.csv` and aligned to the same session start time as the imaging. The [Miniscope](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/imaging/miniscope.html)'s own settings reach the file too, `gain`, `led0`, `frameRate`, `framesPerFile`, `compression` and the sensor `ROI`, where before only its name did, and the settings that differ between recordings are reported per recording.
- **Chunking and compression support for image data**: images are chunked and compressed by default now, both the ones [`ImageInterface`](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/imaging/image.html) writes and the ophys summary images, where they had been written raw, so a file full of them is a fraction of the size it used to be. They also carry the dtype of the source, `uint8` or `uint16` as the case may be, rather than `float64`.
- **Dataset conversion documentation**: a new [converting multiple sessions](https://neuroconv.readthedocs.io/en/stable/user_guide/converting_multiple_sessions.html) guide covers the loop over `LocalPathExpander` results that converts one session at a time, and then what to do with the folder, uploading it to a Dandiset or reorganizing it into a BIDS layout with `nwb2bids`.

## Also in this release

The shape of the metadata dictionary itself changed: hardware now lives in a top-level `metadata["Devices"]` registry keyed by a name you choose, and the annotation guides linked above show the new shape in use. Nothing has to move at once. `get_metadata(use_new_metadata_format=False)` still returns the old shape as an opt-in, and metadata written in it is still accepted and converted on the way in behind a warning, so a pipeline can migrate one conversion at a time. See the [full changelog](https://github.com/catalystneuro/neuroconv/releases/tag/v0.10.0) for everything else, including the bug fixes and the deprecations with their removal dates.

Coming from v0.9.0 you also pick up the v0.9.1, v0.9.2 and v0.9.3 patches, which were maintenance. The one to know about is that every data interface now takes keyword-only arguments: `__init__` accepts `file_path`, `folder_path` or `file_paths` positionally and nothing else, so a call that passed later arguments by position has to name them.

Fiber photometry and events take the front seat this release, but the [conversion gallery](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/index.html) covers 64 formats across ecephys, ophys, behavior, sorting and intracellular electrophysiology. Have a look for the ones you record. If something is missing, or a format you use does not behave the way you expect, please [open an issue](https://github.com/catalystneuro/neuroconv/issues). We take requests for new formats, and the ones people ask for are the ones that get built.
