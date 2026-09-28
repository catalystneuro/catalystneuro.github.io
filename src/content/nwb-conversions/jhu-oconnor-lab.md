---
lab: "Daniel O'Connor"
institution: "Johns Hopkins University"
description: "Developed NWB conversion tools for three of the O'Connor lab's datasets on whisker touch, cross-modal sensory selection, and sequence licking, converting the lab's MATLAB session format to NWB and publishing the results on DANDI."
tags: ["behavioral tracking", "electrophysiology"]
github: "https://github.com/catalystneuro/oconnor-lab-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/000226"
    name: "000226: Active Touch and Self-Motion Encoding by Merkel Cell-Associated Afferents"
  - url: "https://dandiarchive.org/dandiset/000232"
    name: "000232: Rule-based modulation of a sensorimotor transformation across cortical areas"
  - url: "https://dandiarchive.org/dandiset/000239"
    name: "000239: Cortical processing of flexible and context-dependent sensorimotor sequences"
date: "2021-11"
funded_project: ""
species: "Mouse"
---

The O'Connor lab at Johns Hopkins University studies how mice use touch and movement of the whiskers and tongue to guide behavior. The lab stores each session as an MSessionExplorer object in MATLAB, which organizes behavior, spike times, and other signals into tables split by trial. Our goal was to convert three of the lab's datasets to NWB and publish them on the DANDI Archive.

## Conversion from MATLAB

We wrote an open-source Python package that calls the MATLAB Engine for Python to export each MSessionExplorer object to a plain MATLAB struct, which Python can read. From there, a single script converts all three datasets, with small differences in how each one records metadata and trial timing. The per-trial tables are concatenated into continuous time, and the script writes the trials table, behavioral time series with their units, and sorted units, with the observation intervals of each unit set to the trials. For one dataset it also writes LFP with the probe channel map. Each file is checked with the NWB Inspector after it is written.

## Publication on DANDI

The recordings of Merkel cell-associated afferents from Severson, Xu et al. (Neuron, 2017), which include whisker kinematics and the forces and bending moments at the whisker base, are in Dandiset 000226, with 60 files from 43 mice totaling about 14 GB. The cross-modal sensory selection task from Chang et al. (eLife), with recordings from somatosensory and motor cortical areas, is in Dandiset 000232, with 179 files from 18 mice totaling about 24 GB. The sequence licking task from Xu et al. (Nature, 2022), which includes tongue tracking and lick port position, is in Dandiset 000239, with 754 files from 33 mice totaling about 12 GB.
