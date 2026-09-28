---
lab: "Mala Murthy"
institution: "Princeton University"
description: "Developed NWB conversion tools for the Murthy lab's Drosophila courtship data from Cowley et al. (2024). The conversion combined courtship videos, pose tracks stored with ndx-pose, song recordings and labels from males with silenced visual projection neurons, and two-photon calcium imaging of those neurons in head-fixed flies viewing visual stimuli."
tags: ["social behavior", "calcium imaging", "behavioral tracking", "visual processing", "pose estimation", "video", "two-photon microscopy"]
github: "https://github.com/catalystneuro/murthy-lab-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/000951"
    name: "000951: Dataset for Mapping model units to visual neurons reveals population code for social behavior"
date: "2022-08"
funded_project: "SCGB NWB Adoption"
species: Drosophila
---

The Murthy lab at Princeton University studies how male fruit flies use vision to guide courtship. This conversion covered the data behind Cowley et al. (2024), "Mapping model units to visual neurons reveals population code for social behavior." In the behavioral experiments, one of 23 types of lobula columnar (LC) visual projection neurons was silenced in each male before he courted a female. In the imaging experiments, LC neuron responses to visual stimuli were recorded in head-fixed males with two-photon calcium imaging. Our goal was to publish both experiments together in NWB on the DANDI Archive.

## Conversion of Courtship Behavior

We wrote an open-source Python package built on NeuroConv, with one converter for each experiment. For the courtship sessions, raw camera recordings were linked as external video files. Head, thorax, and abdomen positions for both flies were added through NeuroConv's SLEAP interface where SLEAP files were available, and otherwise through a custom interface that read the lab's MATLAB tracks into ndx-pose. Microphone recordings were stored with ndx-sound, and sine and pulse song labels as labeled events with ndx-events. Custom interfaces also added the male's behavioral time series and the reconstructed visual stimulus as seen by the male.

## Conversion of Calcium Imaging

The ScanImage TIFF files from each fly were combined into a single two-photon series. A custom segmentation interface read the processed dF/F responses from the lab's pickled data, and a behavior interface wrote a trials table with the stimulus and its parameters on each trial.

## Publication on DANDI

Dandiset 000951 holds 1,413 NWB files from 486 subjects, about 487 GB, including 459 courtship sessions and imaging data for five LC neuron types. The repository also includes notebooks that browse the files with NWB Widgets, with a custom widget for pose estimation.
