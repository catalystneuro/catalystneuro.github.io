---
lab: "Thomas Clandinin"
institution: "Stanford University"
description: "Developed NWB conversion tools for the Clandinin lab's whole-brain imaging data in Drosophila, featuring volumetric two-photon calcium imaging while flies walked on an air-suspended ball. The conversion includes custom interfaces for the lab's NIfTI imaging files and Bruker metadata, processed brain volumes registered to an atlas, and FicTrac ball tracking."
tags: ["calcium imaging", "behavioral tracking", "two-photon microscopy", "video", "motor control"]
github: "https://github.com/catalystneuro/clandinin-lab-to-nwb"
dandi: "https://dandiarchive.org/dandiset/000727"
date: "2023-07"
funded_project: "SCPAB NWB Adoption"
species: Drosophila
---

The Clandinin lab at Stanford University recorded neural activity across the whole brain of Drosophila during walking. This conversion covered the data behind Brezovec et al., "Mapping the Neural Dynamics of Locomotion across the Drosophila Brain," in which flies walked on an air-suspended ball in the dark while pan-neuronal GCaMP6f and a tdTomato structural marker were imaged with volumetric two-photon microscopy on a Bruker Ultima IV system. Our goal was to publish the imaging, ball tracking, and processed brain volumes in NWB on the DANDI Archive.

## Conversion of Imaging Data

The lab stored each scan as NIfTI files alongside the Bruker XML configuration. We wrote an imaging extractor that reads the NIfTI volumes with nibabel and takes channel names, frame rates, pixel sizes, and start times from the XML, and a NeuroConv interface that writes each scan as a TwoPhotonSeries. Each file holds the functional scan (256 x 128 x 49 voxels at about 1.8 volumes per second) and a higher-resolution anatomical scan, each in the green GCaMP and red tdTomato channels. A second interface added the processed functional data, which the lab had motion corrected, filtered, z-scored, and registered to the Functional Drosophila Atlas.

## Conversion of Behavior

Walking was measured with FicTrac, which tracks the rotation of the ball from a camera. We used NeuroConv's FicTrac interface with the 9 mm ball diameter reported in the paper and added the FicTrac camera video.

## Synchronization

FicTrac and video timestamps were set at a uniform 50 Hz from the session start, taken from the functional scan. The anatomical scans were placed on the same timeline using the start times in their XML files.

## Publication on DANDI

The data are published as Dandiset 000727, with 18 NWB files from nine flies totaling about 610 GB.
