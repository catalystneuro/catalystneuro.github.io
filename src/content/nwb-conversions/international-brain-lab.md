---
lab: "International Brain Lab"
institution: "Multi-institution Collaboration"
description: "Developed NWB conversion tools for the International Brain Lab's standardized decision-making experiments, including custom NWB extensions for specialized data types. The conversion pipeline handles Neuropixels recordings, spike sorting, and behavioral data from multiple research sites, integrating wheel movements, video, pose estimation, and visual stimulation data across a large-scale collaboration."
tags: ["electrophysiology", "behavioral tracking", "pose estimation", "video", "decision-making"]
github: "https://github.com/catalystneuro/IBL-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/000045"
    name: "000045: IBL behavioral data"
  - url: "https://dandiarchive.org/dandiset/000409"
    name: "000409: IBL - Brain Wide Map"
date: "2020-04"
funded_project: "SCGB NWB Adoption"
species: Mouse
---

The International Brain Laboratory (IBL) is a multi-institution collaboration that runs standardized decision-making experiments in mice. The mice see a visual grating of varying contrast and turn a wheel to bring it to the center of the screen. IBL stores its data in the ONE format, which pairs the Alyx metadata database with ALF data files. Our goal was to convert these data to NWB and publish them on the DANDI Archive.

## Conversion of Behavioral Data

In 2020 we wrote an open-source Python package that reads session and subject metadata from Alyx and data from ALF files and writes them to NWB. IBL-specific metadata were stored with the ndx-ibl-metadata extension. The package also included a GUI for editing metadata before conversion.

## Conversion of the Brain Wide Map

We later rewrote the pipeline on NeuroConv to convert the Brain Wide Map, Neuropixels recordings from multiple labs. Each session produces a raw file with SpikeGLX AP and LF band data, video from three cameras, and NIDQ synchronization signals, and a processed file with Kilosort 2.5 spike sorting (iblsorter), trials, wheel movements, licks, Lightning Pose estimates, pupil tracking, motion energy, passive stimuli, and brain region assignments. We wrote custom interfaces for these streams, using the ndx-ibl, ndx-pose, ndx-events, and ndx-anatomical-localization extensions. Spike times and continuous probe data were converted to the NIDQ clock, and video frames were timed from camera TTL pulses recorded on the NIDQ.

## Publication on DANDI

Dandiset 000045 holds the behavioral data: 6,615 files from 178 mice, about 98 GB. We converted the 459 Brain Wide Map sessions on AWS, with each EC2 instance converting one session and uploading it to DANDI. Dandiset 000409 contains 2,048 files from 139 mice, about 50 TB. A notebook in the repository shows how to stream and read these files.
