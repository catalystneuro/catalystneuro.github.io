---
lab: Denise Cai
institution: "Mount Sinai"
description: Converting multimodal neuroscience data including calcium imaging with Miniscope, EMG/EEG recordings, and behavioral tracking. The dataset includes sleep phase analysis, freezing behavior tracked with EZTrack, motion series data, and preprocessed imaging data using Minian for segmentation and calcium event detection.
github: https://github.com/catalystneuro/cai-lab-to-nwb
date: "2024-08"
tags:
  - calcium imaging
  - behavioral tracking
  - electrophysiology
species: Mouse
---

The Cai lab has collected calcium imaging data with Miniscope from chronically implanted mice during several kinds of complex behavior, including fear conditioning and offline homecage recordings coupled with EEG and EMG acquisition. Imaging data are preprocessed with [Minian](https://github.com/denisecailab/minian) and behavior with [EZTrack](https://github.com/denisecailab/ezTrack), both developed within the lab. Our goals are to package this data at each stage of processing in the NWB format so that it can be shared within the lab and published on the DANDI Archive.

## Conversion of Calcium Imaging, EEG, EMG, and Behavior

We wrote an open-source Python package to ingest the lab's data into NWB. The conversion covers single-photon calcium imaging from Miniscope; preprocessed imaging data and calcium event data from Minian; cross-session cell registration from CellReg; EMG and EEG signals; and behavioral events from EZTrack, including freezing behavior and center of mass tracking. The pipeline takes files as large as 250GB and compresses them to meet NWB requirements with minimal processing time.

## Publication on DANDI

We created a pipeline that uploads the specified list of converted sessions to the DANDI Archive in embargo mode. The embargo runs until the preprint is formally accepted by a reviewing journal, at which point the dataset becomes publicly available.

## Demonstrating NWB Usage

We created Jupyter notebooks demonstrating how to read the converted files and access each data stream. Where time allowed, we also began work on modifying Minian so that it can read NWB files directly. The pipeline and package were developed openly and transferred to the Cai lab's own GitHub organization on completion.
