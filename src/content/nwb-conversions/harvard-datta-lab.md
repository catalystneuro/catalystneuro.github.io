---
lab: "Bob Datta"
institution: "Harvard University"
description: "Developed NWB conversion tools for the Datta lab's behavioral neuroscience datasets, featuring photometric recordings and optogenetic manipulations in mice. The conversion pipeline handles multi-modal data including fiber photometry signals, behavioral measurements, and closed-loop optogenetic stimulation data studying dopamine dynamics during spontaneous behavior."
tags: ["fiber photometry", "optogenetics", "behavioral tracking", "pose estimation", "video"]
github: "https://github.com/catalystneuro/datta-lab-to-nwb"
dandi: "https://dandiarchive.org/dandiset/000559"
date: "2023-05"
funded_project: "SCGB NWB Adoption"
species: Mouse
---

The Datta lab at Harvard Medical School studies how the brain organizes spontaneous behavior into sub-second modules, or syllables, identified with Motion Sequencing (MoSeq). This conversion covered the data behind Markowitz, Gillis et al. (Nature, 2023), in which mice explored an open field while dopamine in the dorsolateral striatum was recorded with fiber photometry and manipulated with closed-loop optogenetics. Our goal was to package these data in NWB and publish them on the DANDI Archive alongside the paper.

## Conversion of Photometry, Optogenetics, and Behavior

We wrote an open-source Python package built on NeuroConv, with custom interfaces for each data stream. Raw and demodulated dLight1.1 signals from the TDT photometry system were stored with the ndx-photometry extension. Optogenetic stimulation was stored as an OptogeneticSeries, covering reinforcement experiments that stimulated on a target syllable and velocity-modulation experiments. Online and offline MoSeq syllable labels were stored with ndx-events, and the MoSeq extraction outputs (processed depth images, position, heading, speed, and body shape measures) with the ndx-depth-moseq extension. Raw depth and infrared video from the Kinect sensor were added through NeuroConv's video interface. Separate conversions handled 3D keypoints from a six-camera Azure Kinect arena, stored with ndx-pose, and in vitro imaging of HEK cells expressing dLight1.1.

## Synchronization

The lab aligned photometry and video using infrared LEDs visible to the depth camera and copied to the TDT system. We applied the recorded alignment slope and offset so that every stream in a file shares a common time base.

## Publication on DANDI

The data are published as Dandiset 000559, with 4,425 NWB files from 69 subjects totaling about 14.8 TB. We also wrote scripts that reproduce figures from the paper directly from the NWB files, and the Dandiset links to an example notebook.
