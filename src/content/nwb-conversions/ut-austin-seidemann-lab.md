---
lab: "Eyal Seidemann"
institution: "University of Texas at Austin"
description: "Developed NWB conversion tools for the Seidemann lab's two-photon imaging of macaque primary visual cortex during passive fixation. The conversion combines the raw imaging, Suite2p segmentation, and a custom interface for the task trials, eye tracking, and events in a single NWB file."
tags: ["visual processing", "behavioral tracking", "calcium imaging", "two-photon microscopy"]
github: "https://github.com/catalystneuro/seidemann-lab-to-nwb"
date: "2022-05"
funded_project: ""
species: Macaque
---

This conversion for the Seidemann lab at the University of Texas at Austin covered a two-photon imaging session from left primary visual cortex of a rhesus macaque during passive fixation, with flashing gratings and Gabor targets and distractors. Our goal was to write the imaging, the segmentation, and the task and eye tracking data to a single NWB file.

## Conversion of Imaging Data

The raw imaging from the Thorlabs Bergamo II microscope was stored as a binary file of 512 x 512 frames, which we read with a memory-mapped imaging interface built on nwb-conversion-tools and roiextractors. Cell segmentation was added with the Suite2p interface. Frames were acquired in 75-frame blocks at 30 Hz on each trial, so we built the frame timestamps from the imaging trigger time recorded for each trial.

## Conversion of Behavior

A custom interface read the lab's MATLAB trial structure. It wrote a trials table with the trial outcome, the condition (visual stimulus, target, or blank), and the times of fixation, stimulus, and imaging events. Eye position and pupil size were stored as EyeTracking, the photodiode signal as a time series, and eye, protocol, imaging, and reward events as labeled events with ndx-events. The repository includes a notebook that opens the converted file with NWB Widgets.
