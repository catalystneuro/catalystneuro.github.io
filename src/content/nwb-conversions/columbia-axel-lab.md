---
lab: "Richard Axel"
institution: "Columbia University"
description: "Developed NWB conversion tools for the Axel lab's whole-brain two-photon calcium imaging in Drosophila, recorded with ball motion and tracked body positions. The pipeline converts raw volumes from MATLAB files and processed results from NumPy files, and includes a graphical interface for editing metadata and viewing the result with NWB Widgets."
tags: ["calcium imaging", "two-photon microscopy", "behavioral tracking"]
github: "https://github.com/catalystneuro/axel-lab-to-nwb"
date: "2019-07"
funded_project: "SCGB NWB Adoption"
species: Drosophila
---

The Axel lab at Columbia University recorded volumetric two-photon calcium imaging across the whole central brain of Drosophila, with nuclear GCaMP6s in one channel and the red marker redStinger in the other, together with ball motion and tracked body positions. Our goal was a conversion pipeline the lab could run on these data, along with tutorials explaining each step.

## Conversion of Imaging Data

The conversion function reads raw imaging volumes from MATLAB files and processed results from NumPy files, and writes them to a single NWB file. Each color channel has its own imaging plane and TwoPhotonSeries. The raw volumes are large, so they are written one time point at a time with an iterative data writer, and a tutorial notebook compares chunking and compression settings for data of this shape. Segmented cells, stored in the source files as a sparse matrix of voxel indices, are converted to three-dimensional voxel masks, and their dF/F traces are stored with them. The reference volume image is stored with ndx-grayscalevolume, an NWB extension we created for three-dimensional grayscale images.

## Conversion of Behavior

Ball motion is stored as a time series, and the positions of eight tracked body points are stored as spatial series. Trial boundaries were derived from a trial flag in the processed data and written to the trials table.

## Metadata Editing and Visualization

The package includes a graphical interface, built with nwbn-conversion-tools, for editing the metadata in the lab's YAML file, running the conversion, and viewing the result with NWB Widgets.
