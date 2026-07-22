---
lab: "Saul Kato"
institution: "University of California, San Francisco"
description: "Developed software allowing the Kato lab to convert functional and structural volumetric imaging of the C. elegans nervous system to NWB, including extensions for Micro-Manager metadata and multi-channel volumetric data, and interactive visualizations for validating the converted files."
tags:
  - calcium imaging
  - volumetric imaging
date: "2021-11"
species: C. elegans
---

The foundations of cognition lab collects functional and structural volumetric data of the *C. elegans* nervous system. Our goal is to develop software so that lab members can readily convert this data to the NWB standard for publication and sharing.

## Processing and Conversion of Imaging Data

We ingest raw and processed data and write it to NWB, covering functional and structural volumetric imaging, acquisition metadata, ROI time series, and ROI metadata such as cell-specific labels. The raw functional volumetric data and the processed ROI time series map onto existing NWB types directly. Two NWB extensions were created for the parts that do not: Micro-Manager metadata, and multi-channel volumetric data.

NWB requires an image mask for each ROI, and the lab's gcamp-extractor pipeline did not emit one. That software is modified to output the 3D ROI image masks used to create the time series, which are then saved into the relevant NWB files.

## Interactive Visualization

We create interactive visualizations of NWB data that use both the functional and the structural data. These validate that the files converted correctly, give lab members a quick way to run simple analyses, and serve as example code for working with NWB data. They include projections of multi-channel structural data, distributions of time series statistics across ROIs such as mean, standard deviation, and skewness, and correlations of time series across ROIs.
