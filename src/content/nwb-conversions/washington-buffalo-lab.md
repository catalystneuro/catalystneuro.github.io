---
lab: "Beth Buffalo"
institution: "University of Washington"
description: "Developed NWB conversion tools for the Buffalo lab's multi-modal neurophysiology data, handling both raw and processed neural recordings from Neuralynx systems, sorted spikes, and behavioral measurements in non-human primates doing hippocampal tasks. The conversion pipeline includes a graphical interface for metadata editing and supports various data formats including NCS, MAT, and NEX files."
tags: 
  - electrophysiology
  - behavioral tracking
  - spatial navigation
github: "https://github.com/catalystneuro/buffalo-lab-to-nwb"
date: "2019-07"
funded_project: "SCGB NWB Adoption"
species: Macaque
---

The Buffalo lab at the University of Washington records from the hippocampus during navigation in virtual reality. A session produced raw Neuralynx recordings, local field potentials and behavior processed in MATLAB, and spikes sorted in NeuroExplorer. Our goal was to bring these files together in NWB with a tool the lab could run on its own sessions.

## Conversion of Electrophysiology

We wrote an open-source Python package that reads raw continuous data from Neuralynx CSC (.ncs) files, processed LFP from MATLAB files, and sorted units from NeuroExplorer .nex5 files. Raw data, and optionally LFP, were written with a data chunk iterator so that a session did not have to fit in memory. Each session produced two NWB files, one with the raw recording and one with the processed data, and the session start time was read from the Neuralynx file header.

## Conversion of Behavior

From the lab's processed behavior files we converted position in the virtual environment and eye tracking, and built a trials table from the task event codes, with each trial labeled by its environment. Calibration trials at the start of a session went into the same table, and each block of trials was stored as an epoch. Spike times and behavior were shifted to a common start time.

## Tools for the Lab

The conversion could be run from a Python script, from the command line, or from a graphical interface for editing metadata that ran the conversion and displayed the resulting file with NWB Widgets. The package also included a script that exports an NWB ElectricalSeries back to NEX5 for analysis in NeuroExplorer, and a utility for plotting the spatial distribution of spikes.
