---
lab: "Mark Bevan"
institution: "Northwestern University"
description: "Developed NWB conversion tools for the Bevan lab's subthalamic nucleus recordings during freely moving locomotion. The pipeline standardizes Neuralynx electrophysiology with optogenetic stimulation, Plexon spike sorting, treadmill signals, high frame rate behavioral video, DeepLabCut pose estimation, and CCF registration, and handles recording segments in which the electrodes sit at different positions."
tags:
  - electrophysiology
  - optogenetics
  - behavioral tracking
  - video
  - pose estimation
  - motor control
  - Parkinson's disease
date: "2024-08"
funded_project: "Aligning Science Across Parkinson's"
species: Mouse
---

The Bevan lab is collecting electrophysiology data from the subthalamic nucleus during freely moving activity, as part of the ASAP initiative. Our goals are to package this data in the NWB format so that it can be shared within the lab and published on the DANDI Archive.

## Conversion of Neurophysiology Data

We wrote an open-source Python package to ingest the data behind ["Movement-related increases in subthalamic activity optimize locomotion"](https://pubmed.ncbi.nlm.nih.gov/39068661/) into NWB. The conversion covers Neuralynx recordings, including electrophysiology, optogenetic stimulation, and synchronization signals; Plexon spike sorting output; treadmill signals in ABF format; high frame rate behavioral video; DeepLabCut pose estimation; NeuroInfo CCF registration; and experimental metadata covering session, subject, and probe.

The conversion ensures temporal alignment of simultaneously recorded streams and packages the data for integration with analysis and visualization tools. It also represents individual recording segments in which the electrodes sit at different positions, which the recordings require and which a single continuous representation would obscure.

## Publication on DANDI

We created a Dandiset for this dataset, uploaded the NWB data, and annotated it according to DANDI best practices.

## Demonstrating NWB Usage

We created Jupyter notebooks demonstrating how to read the converted files and access each data stream. These notebooks were submitted to the [DANDI example-notebooks repository](https://github.com/dandi/example-notebooks).
