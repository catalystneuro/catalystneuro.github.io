---
lab: "Krishna Shenoy"
institution: "Stanford University"
description: "Developed NWB conversion tools for the Shenoy lab's reaching experiments in rhesus monkeys, covering a center-out task recorded with Utah arrays, Neuropixels recordings during an instructed-delay task, and the maze task. The center-out and maze datasets are published on the DANDI Archive, with a notebook and custom widget for viewing them."
tags: ["motor control", "electrophysiology", "behavioral tracking"]
github: "https://github.com/catalystneuro/shenoy-lab-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/000070"
    name: "000070: Neural population dynamics during reaching"
  - url: "https://dandiarchive.org/dandiset/000121"
    name: "000121: Structure and variability of delay activity in premotor cortex"
date: "2021-02"
funded_project: "SCGB NWB Adoption"
species: Macaque
---

The Shenoy lab at Stanford University recorded from motor and premotor cortex of rhesus monkeys performing reaching tasks, using Blackrock Utah arrays and Neuropixels probes. As part of the Simons Foundation data standardization project, we built conversion pipelines to NWB for three of these experiments and published two of the datasets on the DANDI Archive.

## Conversion of the Center-Out Reaching Task

This conversion covered the data behind Even-Chen, Sheffer et al. (2019) in PLoS Computational Biology. Our converter, written with nwb-conversion-tools, combined a Blackrock interface for LFP from the Utah arrays in PMd and M1, a custom interface for the lab's MATLAB files, and a movie interface for the session video. From the MATLAB files we wrote eye, hand, and cursor position, juice reward times, a trials table of task variables and event times, and spike times assigned to electrodes on each array.

## Conversion of Monkey Neuropixels Data

A second converter combined the SpikeGLX recording interface with a custom interface for processed MATLAB files from sessions recorded with a Neuropixels 3A probe during an instructed-delay reaching task. It wrote hand position and speed, a trials table, and sorted units.

## Conversion of the Maze Task

The maze task data behind Churchland, Cunningham et al. (2012) in Nature were converted along the same lines as the center-out task, with trial columns for maze properties such as barrier positions. In 2024 we added a NeuroConv version of this conversion for data without spike sorting.

## Publication on DANDI and Usage

Dandiset 000121 holds the center-out data, 15 files from two monkeys totaling about 188 GB. Dandiset 000070 holds the maze task data, 10 files from two monkeys totaling about 53 GB. We wrote a notebook that streams a file from DANDI and plots it with NWB Widgets, along with a custom widget for viewing maze task trajectories by trial type.
