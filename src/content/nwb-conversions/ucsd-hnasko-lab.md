---
lab: Thomas Hnasko
institution: "University of California, San Diego"
description: Developing NWB conversion tools for the Hnasko lab's research on fiber photometry alongside behavioral measurements. The pipeline standardizes data from TDT systems (fiber photometry and TTL pulses), behavioral videos from AnyMaze, synchronization signals, histology images from Zeiss microscopes, and in-progress work on processed fiber photometry data and pose estimation. These tools enable comprehensive analysis of neural activity in relation to behavior and facilitate data sharing through the DANDI Archive.
tags: ["fiber photometry", "behavioral tracking", "optogenetics", "pose estimation", "video"]
github: https://github.com/catalystneuro/hnasko-lab-to-nwb
date: "2024-11"
species: Mouse
funded_project: "Aligning Science Across Parkinson's"
---

The Hnasko lab collects fiber photometry data while recording behavioral video and delivering shocks or optogenetic stimuli. Our goals are to package this data at each stage of processing in the NWB format so that it can be shared within the lab and published on the DANDI Archive.

## Conversion Pipeline

We wrote an open-source Python package to ingest data from the systems used in the lab's ongoing data collection into NWB. The pipeline covers fiber photometry recorded on a TDT system, shock and optogenetic TTL pulses stored as TDT system logs, raw behavioral video recorded through AnyMaze, the synchronization signals that tie AnyMaze to the TDT system, and histology images captured as CZI files on a Zeiss microscope. Processed fiber photometry and DeepLabCut pose estimation are being added as that work progresses.

## Publication on DANDI

We created a pipeline that uploads the specified list of converted sessions to the DANDI Archive automatically, into an embargoed Dandiset annotated according to DANDI best practices. The Dandiset is released from embargo and made open when the corresponding papers are published.

## Demonstrating NWB Usage

We created Jupyter notebooks demonstrating how to read the converted files and access each data stream. These notebooks were submitted to the [DANDI example-notebooks repository](https://github.com/dandi/example-notebooks).

## Integrating Analyses with NWB

As time permits, we adapt the analysis code written by the lab to take NWB files as input, so that results can be reproduced directly from the NWB files.
