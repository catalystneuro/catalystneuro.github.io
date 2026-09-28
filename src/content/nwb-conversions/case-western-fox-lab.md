---
lab: "Jessica Fox"
institution: "Case Western Reserve University"
description: "Developed NWB conversion tools for the Fox lab's research on flight control and sensory integration in Drosophila. The pipeline standardizes high-speed video from three cameras, DeepLabCut tracking of the antennae and a haltere, and wingbeat amplitude, frequency, and photodiode signals, aligned using camera triggers recorded in the acquisition file."
tags: ["video", "behavioral tracking", "pose estimation"]
github: "https://github.com/catalystneuro/cohen-u01-to-nwb"
date: "2024-08"
funded_project: "Drosophila Sensation U01"
species: "Drosophila"
---

The Fox lab at Case Western Reserve University studies flight control and sensory integration in Drosophila. Each trial in their experiments combines three high-speed cameras, DeepLabCut tracking of the antennae and a haltere, and a data acquisition file holding wingbeat measurements and camera triggers. This work was part of a U01 project shared with four other fly labs, and our goal was a conversion script the lab could run on each trial folder to produce one NWB file.

## Conversion of Video and Pose Estimation

We built the conversion on NeuroConv. Side and top views from two Fastec IL5 cameras recording at 2,000 frames per second, and a haltere view from a Phantom camera, were linked as external video files through the ExternalVideoInterface, with frame counts and frame rates read from each camera's metadata file. DeepLabCut output for the top camera (the tip and base of each antenna) and for the haltere camera was stored with the ndx-pose extension through NeuroConv's DeepLabCutInterface.

## Conversion of Wingbeat Data

A custom interface reads the lab's MATLAB acquisition file, sampled at 10 kHz. It writes the left and right wingbeat amplitude and the wingbeat frequency from the wingbeat analyzer, along with the left and right photodiode voltages that follow each wing through its stroke, as time series.

## Synchronization

The acquisition file also records a copy of each camera trigger, and each trigger marks the end of a recording. We found the trigger time for the Fastec and Phantom cameras and built each camera's frame timestamps backward from it, which places the videos on the same clock as the wingbeat data.
