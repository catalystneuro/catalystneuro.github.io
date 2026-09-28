---
lab: "Bing Brunton"
institution: "University of Washington"
description: "Developed NWB conversion tools for the Brunton lab's human neurobehavioral datasets, including the AJILE12 dataset featuring synchronized intracranial neural recordings and upper body pose trajectories. The conversion pipeline handles complex behavioral data including reach events, position tracking, and long-term naturalistic recordings spanning multiple modalities."
tags: 
  - electrophysiology
  - behavioral tracking
  - motor control
  - pose estimation
github: "https://github.com/catalystneuro/brunton-lab-to-nwb"
date: "2020-11"
dandi:
  - url: "https://dandiarchive.org/dandiset/000055"
    name: "000055: AJILE12: Long-term naturalistic human intracranial neural recordings and pose"
species: Human
---

The Brunton lab at the University of Washington assembled AJILE12 (Annotated Joints in Long-term Electrocorticography for 12 human participants), recorded during clinical epilepsy monitoring. It pairs intracranial recordings with upper-body pose trajectories estimated from video across 55 semi-continuous days of natural movement. Our goal was to convert the lab's per-day HDF5 files to NWB and publish the dataset on the DANDI Archive.

## Conversion of Neural Data

We wrote a Python conversion that reads each participant-day file lazily and writes the intracranial recordings, sampled at 500 Hz, as a compressed ElectricalSeries in chunks. Electrodes were grouped by the lab's anatomical labels, with electrode coordinates and per-electrode columns for standard deviation, kurtosis, a good-channel flag, and low- and high-frequency R² values. EOG and ECG channels were stored as separate time series.

## Conversion of Behavior

Pose trajectories for nine upper-body keypoints, including the wrists, elbows, and shoulders, were stored at 30 Hz as SpatialSeries in a Position container. Wrist movement events were stored with ndx-events, coarse behavioral state labels as epochs, and a reaches table recorded features of each reach such as magnitude, angle, onset speed, and whether the movement was bimanual.

## Publication and Visualization

The data are published as Dandiset 000055, with 55 NWB files from 12 participants totaling about 846 GB. We also built an interactive dashboard on NWB Widgets, deployable through Binder and Voila, that shows neural and pose time series, an animated skeleton of the keypoints, and event-triggered averages around reaches, along with a notebook that streams a file from DANDI.
