---
lab: "Hillel Adesnik"
institution: "University of California, Berkeley"
description: "Developed NWB conversion tools for the Adesnik lab's MouseV1 project, which combines two-photon calcium imaging with two-photon holographic optogenetics in mouse primary visual cortex. The conversion covers ScanImage imaging, Suite2p segmentation, visual stimuli, and holographic stimulation stored with the ndx-patterned-ogen extension, across retinotopic mapping, orientation tuning, and ensemble stimulation epochs."
tags: ["visual processing", "calcium imaging", "two-photon microscopy", "optogenetics"]
github: "https://github.com/catalystneuro/mousev1-to-nwb"
date: "2023-10"
funded_project: ""
species: "Mouse"
---

The Adesnik lab at UC Berkeley combines two-photon calcium imaging with two-photon holographic optogenetics in mouse primary visual cortex, stimulating chosen neurons while imaging the population around them. Imaging was done on a custom mesoscale read/write platform built around a two-photon random-access mesoscope. Each session is divided into epochs for retinotopic mapping, orientation tuning, and holographic stimulation of single cells and of ensembles of co-tuned cells. Our goal was to convert these sessions to NWB, working from example data the lab shared.

## Conversion of Imaging and Segmentation

We wrote a NeuroConv converter with one NWB file per epoch. The raw data are ScanImage TIFF files, one per trial, with three planes and two color channels, and we read them with custom extractors that concatenate the files over time and split them by plane and channel. Suite2p had been run on all epochs concatenated, so the segmentation interface extracts only the frames belonging to the current epoch.

## Conversion of Holographic Stimulation

The holographic stimulation parameters were saved by the lab's MATLAB code to an HDF5 file. We stored them with ndx-patterned-ogen, an NWB extension for patterned optogenetics, including the spatial light modulator, the stimulation laser, and temporal focusing parameters. Hologram targets were added as a separate plane segmentation and linked to the matching Suite2p ROIs. Targets without a matching Suite2p cell are kept. Each stimulus event records the targeted cells, power per cell, and frequency.

## Synchronization

Stimulus times in the lab's files are relative to the start of each trial. We took each trial's start time from the ScanImage timestamps of its first frame and added the relative times, which placed visual stimuli (with orientation, size, contrast, and location) and holographic stimulation on the imaging time base. A tutorial notebook shows how to read the resulting files.
