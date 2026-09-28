---
lab: "Itai Cohen"
institution: "Cornell University"
description: "Developed NWB conversion tools for the Cohen lab's free-flight optogenetics experiments in Drosophila. The pipeline standardizes wing and body angles reconstructed from high-speed video, LED stimulation, and driver and effector line metadata, along with Zeiss confocal images used to confirm the optogenetic lines."
tags: ["behavioral tracking", "video", "optogenetics"]
github: "https://github.com/catalystneuro/cohen-u01-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/001851"
    name: "001851: A multi-muscular, redundant strategy for free-flight roll stability behavioral data archive"
date: "2024-08"
funded_project: "Drosophila Sensation U01"
species: "Drosophila"
---

The Cohen lab at Cornell University films Drosophila in free flight with high-speed cameras and perturbs flight with optogenetics. Flies expressing CsChrimson or GtACR1 under a driver line were stimulated with an LED during flight to activate or silence the targeted neurons, and the lab reconstructed wing and body angles from the video. This work was part of a U01 project shared with four other fly labs. Our goal was to convert these experiments to NWB, along with the confocal images from immunohistochemistry that the lab uses to confirm the optogenetic protocol worked.

## Conversion of Free-Flight Optogenetics

Each row of the lab's MATLAB structure is one filmed flight, and we wrote each to its own NWB file. Body pitch, roll, and yaw and the stroke, deviation, and pitch angles of each wing were stored as SpatialSeries. The stimulation was stored as an OptogeneticSeries, with the LED drive current converted to irradiance in milliwatts per square millimeter using the lab's calibration curve. Subject metadata records the driver and effector lines, and the lab's MP4 of the stitched camera views is linked as an external video file.

## Conversion of Confocal Imaging

We wrote an interface for Zeiss .czi files that stores each channel's z-stack as a set of images, with microscope metadata parsed from the file header.

## Publication on DANDI

The free-flight data behind Ludlow et al., "A multi-muscular, redundant strategy for free-flight roll stability," are published as Dandiset 001851. It holds 866 NWB files from 797 flies with their videos, about 35 GB in total, written with this conversion script.
