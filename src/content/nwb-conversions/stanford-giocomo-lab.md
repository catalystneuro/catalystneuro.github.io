---
lab: "Lisa Giocomo"
institution: "Stanford University"
description: "Developed NWB conversion tools for the Giocomo lab's spatial navigation datasets, including tetrode and Neuropixels recordings from medial entorhinal cortex, and two-photon calcium imaging from hippocampal CA1. The conversion pipeline handles multi-modal data including neural recordings, virtual reality behavior, and head motion measurements."
tags: ["electrophysiology", "calcium imaging", "behavioral tracking", "spatial navigation"]
github: "https://github.com/catalystneuro/giocomo-lab-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/000053"
    name: "000053: MEC recordings during linear track and open exploration"
  - url: "https://dandiarchive.org/dandiset/000054"
    name: "000054: Experience-dependent contextual codes in hippocampus"
date: "2019-07"
funded_project: "SCGB NWB Adoption"
species: Mouse
---

The Giocomo lab at Stanford University records from the medial entorhinal cortex and hippocampus of mice during navigation. Their data combine tetrode and Neuropixels recordings from medial entorhinal cortex with two-photon calcium imaging from hippocampal CA1, each paired with behavior in virtual reality or open arenas. Our goal was to convert these datasets to NWB and publish the data behind two of the lab's papers on the DANDI Archive.

## Conversion of Electrophysiology

We began with a conversion for Neuropixels recordings acquired with SpikeGLX, together with processed MATLAB files containing sorted units, trials, and virtual position. Lab-specific constants were stored with a custom extension, ndx-labmetadata-giocomo, and the package included a graphical interface for editing metadata and viewing the result.

Later conversions used NWBConverter from nwb-conversion-tools. For the virtual linear track sessions we combined the SpikeGLX recording and LFP interfaces with custom interfaces for processed spike times, position, eye position and velocity, and lick and reward events stored with ndx-events. For freely moving tetrode sessions we converted body position, speed, and head direction from an inertial sensor, and we wrote a reader for Axona tetrode files.

## Conversion of Imaging Data

For the hippocampal imaging we combined the Scanbox imaging and Suite2p segmentation interfaces with a custom interface that reads the lab's pickled virtual reality data, including track position, speed, licks, rewards, and the morph and jitter parameters of the visual stimulus.

## Publication on DANDI

Dandiset 000053 accompanies Mallory et al. (2021) in Nature Communications and holds 359 files from 34 mice, about 1.4 TB. Dandiset 000054 accompanies Plitt and Giocomo (2021) in Nature Neuroscience and holds 126 files from 16 mice, about 112 GB, with virtual reality behavior temporally aligned to the CA1 imaging.
