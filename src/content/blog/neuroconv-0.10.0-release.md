---
title: "NeuroConv 0.10.0 Release"
date: "2026-08-17"
description: "NeuroConv 0.10.0 writes events as the NWBEP001 event tables, adds fiber photometry as a supported modality, introduces metadata templates and annotation guides for optical physiology, and ships new session-wide converters and formats."
image: "/images/software/neuroconv_logo_for_images.png"
readTime: "4 min read"
keywords: ["NeuroConv", "NWB", "neurophysiology", "data conversion", "fiber photometry", "events", "NWBEP001", "optical physiology", "metadata", "release"]
---

# NeuroConv 0.10.0 Release

We are pleased to announce the release of [NeuroConv 0.10.0](https://pypi.org/project/neuroconv/), the largest release the project has had. It covers everything since [v0.9.0](https://github.com/catalystneuro/neuroconv/releases/tag/v0.9.0), the last release we wrote about here, including the v0.9.1, v0.9.2 and v0.9.3 patches. NeuroConv now converts 64 formats, thirteen of them added in this stretch, and those thirteen are not scattered: they are two modalities it did not previously handle at all, fiber photometry and discrete events, plus a rebuilt intracellular electrophysiology path. It requires `pynwb>=4.0.0` and `hdmf>=6.1.0`.

![Formats supported by NeuroConv, counted from when support for each format was merged, rising from the first interfaces in late 2020 to 64 at v0.10.0](/images/blog/neuroconv-format-support.svg)

## Events

NeuroConv now writes events as `EventsTable` objects into `nwbfile.events`, the type [NWBEP001](https://nwb.org/news/pynwb-4.0.0-release/) brought into the core standard and [pyNWB 4](https://pynwb.readthedocs.io/) ships, instead of through an extension. The supported sources are:

- [Doric](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/events/doric_events.html), the digital IO of `.doric` HDF5 files and the CSV exports, in both the modern and the legacy EPConsole layouts
- [Neurophotometrics](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/events/npm_events.html), the headerless two-column stimuli CSVs
- [TDT](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/events/tdt_events.html) epocs, including the ones that carry a duration
- The digital lines of [Intan](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/intan.html) recordings, both digital words, addressed by the header's own name for each line
- The digital lines of [SpikeGLX](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/spikeglx.html) NIDQ recordings, addressed as word plus bit the way `~snsChanMap` and CatGT do
- [Plain CSV](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/events/csv_events.html), the general-purpose option: name the columns holding the timestamps, the event type, its values and its durations, and a source with no dedicated interface here converts without one

Two new how-to guides cover them:

- [Annotating events](https://neuroconv.readthedocs.io/en/stable/how_to/annotate_events_metadata.html) is about what the events are called and how they are laid out: naming the table and its columns, replacing the raw codes a rig writes with readable labels, describing what each label means in a [`MeaningsTable`](https://nwb.org/news/pynwb-4.0.0-release/) carried inside the events table, and pooling event types from one interface or from several into a single shared table.
- [Extracting events from a sampled signal](https://neuroconv.readthedocs.io/en/stable/how_to/extract_events_from_signals.html) is about which events exist in the first place. For the signal-encoded sources, the Intan and SpikeGLX digital lines among them, a `detection_configuration` says which signals to read, how each becomes a two-valued line, and which of its transitions become event timestamps.

## Fiber photometry

Fiber photometry went from one supported format to five, all of them written in the [`ndx-fiber-photometry`](https://github.com/catalystneuro/ndx-fiber-photometry) extension format through a shared base interface. The supported formats are:

- [Doric](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/fiberphotometry/doric_fp.html), both the `.doric` HDF5 files and the CSV exports of Doric Neuroscience Studio
- [TDT](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/fiberphotometry/tdt_fp.html) tanks
- [Neurophotometrics](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/fiberphotometry/npm_fp.html)
- [Plain CSV](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/fiberphotometry/csv_fp.html), the general-purpose option for the many photometry systems that export a table and have no dedicated interface here

The provenance chain the format asks for, the fibers, indicators, excitation sources and their models, is more than any acquisition file records:

- `get_metadata_template()` returns that whole structure with every field only the experimenter can supply left as `None`, and the [Metadata Templates](https://neuroconv.readthedocs.io/en/stable/user_guide/metadata_templates.html) page publishes it as a YAML or JSON file to fill in by hand.
- The [how-to guide for annotating fiber photometry metadata](https://neuroconv.readthedocs.io/en/stable/how_to/annotate_fiber_photometry_metadata.html) builds a `FiberPhotometryTable` one step at a time, starting from a conversion with no metadata at all.

We have also added support for [GuPPy](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/fiberphotometry/guppy_fp.html), the [fiber photometry analysis pipeline](https://github.com/LernerLab/GuPPy):

- `GuppyInterface` adds GuPPy's outputs to a file you already have. Hand it an NWB file and each recording site is linked to the `FiberPhotometryTable` rows its fibers already occupy there; point it at a new path instead and the source is exported with the outputs added. GuPPy's own analyzed onsets are written as an `EventsTable` in `nwbfile.events`, so every peri-event product reaches the occurrences it was built from.
- `GuppyConverter` converts a whole session at once, the raw acquisition, the raw events and GuPPy's analyzed outputs into one file. The acquisition format is chosen with `acquisition_format` (`"tdt"`, `"csv"`, `"doric"` or `"npm"`, all four installed by `neuroconv[guppy]`), and its series are grouped by excitation wavelength rather than written one per store.

## Improved metadata annotation for optical physiology

An optical physiology conversion writes several objects that refer to one another: a microscope, the imaging plane it images through, the series recorded from that plane, and the segmentation drawn on it. Those references used to be implicit in the order of a list, so annotating a two-channel recording meant working out which entry belonged to which channel before you could edit it. Each entry now carries a name you choose and points at the others by that name. Three things make it practical to fill in:

- The [how-to guide for annotating optical physiology metadata](https://neuroconv.readthedocs.io/en/stable/how_to/annotate_ophys_metadata.html) walks through wiring it up for the kinds of recording people actually have, starting from a conversion with no metadata at all.
- A new method, `get_metadata_template()`, returns the whole structure the writer expects, sized to what the file will actually hold, with the cross-references already resolved and every field only the experimenter can supply left as `None`. What comes back `None` is exactly what the source could not tell us, so the blanks are the checklist.
- The new [Metadata Templates](https://neuroconv.readthedocs.io/en/stable/user_guide/metadata_templates.html) page publishes those same structures as YAML and JSON files, for filling in by hand rather than in code.

## Improved intracellular electrophysiology support

Intracellular electrophysiology gets a section of the conversion gallery of its own, two formats, and the tables NWB defines for organizing sweeps rather than only the traces:

- The [Axon Binary Format](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/abf.html), read by `AxonIntracellularInterface` in place of the deprecated `AbfInterface`. Each instance handles one electrode in one file, written as a single continuous `PatchClampSeries` with one recordings row per sweep rather than a separate series per sweep, and the clamp mode is stated explicitly rather than guessed from ABF metadata that is not reliable.
- The [voltage recordings](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/brukervoltagerecording.html) Bruker PrairieView writes alongside two-photon imaging. PrairieView writes one CSV/XML pair per cycle, a cycle being one sweep, and the interface concatenates them onto one timeline by each cycle's `DateTime`, reading the clamp mode off the unit of the amplifier's `Primary` output.
- `AxonIntracellularConverter` and `BrukerVoltageRecordingConverter` write the [icephys hierarchy tables](https://pynwb.readthedocs.io/en/stable/tutorials/domain/plot_icephys.html) and not just the traces. The intracellular recordings table carries the sweep structure, each sweep a row addressed as a range of the electrode's series, and `SimultaneousRecordings`, `SequentialRecordings`, `Repetitions` and `ExperimentalConditions` are assembled above it across the channels and protocol files of one cell. A `sweeps` intervals table carries each sweep's start and stop time as well, so tools that read NWB intervals surface them with no icephys-specific code.

## New interfaces and converters

Converters discover what a session actually contains and write all of it in one call, where before you queried the file for its channels, planes or streams and built one interface per combination by hand:

- [`ScanImageConverter`](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/imaging/scanimage.html), every channel of a ScanImage acquisition, followed across the files it is spread over
- [`ThorConverter`](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/imaging/thor.html), every channel of a Thor acquisition
- [`BrukerTiffConverter`](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/imaging/brukertiff.html), every channel of a Bruker folder, over a new unified imaging interface that covers single-plane, volumetric and multi-channel folders alike
- [`Suite2pConverter`](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/segmentation/suite2p.html), every plane and channel of a Suite2p output folder
- [`IntanConverter`](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/intan.html), every stream of an Intan session, amplifier, analog, stimulation and digital alike
- [`OpenEphysBinaryConverter`](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/openephys.html), every neural and analog stream of an Open Ephys session

The formats themselves are new too:

- [VAME](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/behavior/vame.html) behavioral segmentation, written both as the faithful `ndx-vame` series and as a curated `ndx-ethogram` bout timeline
- [MountainSort](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/sorting/mda.html) spike sorting, from the `firings.mda` output of v4 and earlier
- [XClust](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/sorting/xclust.html) spike sorting, from its `.CEL` files
- [Intan stimulation currents](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/intan.html) for RHS2000 systems

## Other improvements

- [SpikeGLX](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/spikeglx.html) and [Open Ephys](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/openephys.html) recordings write the attached Neuropixels probe's identity: a `DeviceModel` carrying the manufacturer and model number as [probeinterface](https://probeinterface.readthedocs.io/en/main/neuropixels_readers.html) catalogues them, and a `Device` carrying the unit's serial number. Those values are read off the probe itself rather than typed in, so the file states which probe was used and its geometry can be rebuilt from that identity alone.
- [EDF](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/edf.html) recordings that sample some of their signals at a different rate than the rest can now be converted. Those files carry more than one stream, which the interfaces had no way to accept, so both now take a `stream_name` with `get_stream_names` listing what a file offers. A recording whose channels were each autoscaled to their own range can also be written to a single `ElectricalSeries` now, through the new `data_representation="physical_units"` option that folds each channel's gain and offset into float data; a new [how-to guide](https://neuroconv.readthedocs.io/en/stable/how_to/handle_heterogeneous_offsets.html) says which fix a recording needs.
- Single-plane [Inscopix](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/imaging/inscopix.html) recordings convert again. Plane count is now read from the `microscope.multiplane.enabled` flag in the file's JSON metadata, where the old check looked for the substring `"multiplane"` anywhere in the file and every modern Inscopix file carries it as interface state whatever its plane count, so ordinary recordings were refused. A file that genuinely is multiplane still raises, saying so, and one too old to carry that flag warns rather than guessing.
- `MiniscopeConverter` now writes the behavior videos of a session driven by a User Config file, discovered from `devices[cameras]` in that config, each with the timestamps of its own `timeStamps.csv` and aligned to the same session start time as the imaging. The [Miniscope](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/imaging/miniscope.html)'s own settings reach the file too, `gain`, `led0`, `frameRate`, `framesPerFile`, `compression` and the sensor `ROI`, where before only its name did, and the settings that differ between recordings are reported per recording rather than attributed to all of them.
- Images now get the same default compression and chunking as every other dataset, both the ones `ImageInterface` writes and the ophys summary images, so a file full of them is a fraction of the size it used to be. They also carry the dtype of the source, `uint8` or `uint16` as the case may be, rather than `float64`.
- A new [converting multiple sessions](https://neuroconv.readthedocs.io/en/stable/user_guide/converting_multiple_sessions.html) guide covers the loop over `LocalPathExpander` results that converts one session at a time, and then what to do with the folder, uploading it to a Dandiset or reorganizing it into a BIDS layout with `nwb2bids`.

## Also in this release

Coming from v0.9.0 you also pick up the v0.9.1, v0.9.2 and v0.9.3 patches, which were maintenance rather than features. The one to know about is that every data interface now takes keyword-only arguments: `__init__` accepts `file_path`, `folder_path` or `file_paths` positionally and nothing else, so a call that passed later arguments by position has to name them.

The shape of the metadata dictionary itself changed: hardware now lives in a top-level `metadata["Devices"]` registry keyed by a name you choose, rather than in a list you index by position, and the annotation guides linked above show the new shape in use. Nothing has to move at once. `get_metadata(use_new_metadata_format=False)` still returns the old shape as an opt-in, and metadata written in it is still accepted and converted on the way in behind a warning, so a pipeline can migrate one conversion at a time rather than in one cut. See the [full changelog](https://github.com/catalystneuro/neuroconv/releases/tag/v0.10.0) for everything else, including the bug fixes and the deprecations with their removal dates.

We welcome feedback, bug reports, and suggestions for use cases or data formats that are not yet supported. If you encounter issues or think we should address additional workflows, please [open an issue](https://github.com/catalystneuro/neuroconv/issues).
