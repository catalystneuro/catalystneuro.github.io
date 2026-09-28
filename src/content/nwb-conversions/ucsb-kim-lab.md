---
lab: "Sung Soo Kim"
institution: "University of California, Santa Barbara"
description: "Developed NWB conversion tools for the Kim lab's research on Drosophila visual processing. The pipeline standardizes two-photon imaging data, behavioral videos, and visual stimulus information. These tools integrate synchronization signals from MATLAB files and fluorescence traces from segmented regions of interest, facilitating analysis of neural responses to visual stimuli in relation to behavioral outputs."
tags: ["calcium imaging", "two-photon microscopy", "video", "behavioral tracking", "visual processing"]
github: "https://github.com/catalystneuro/cohen-u01-to-nwb"
date: "2024-08"
funded_project: "Drosophila Sensation U01"
species: "Drosophila"
---

The Kim lab at the University of California, Santa Barbara records two-photon calcium imaging in Drosophila while presenting visual patterns and measuring wingbeats. The rig pairs a custom microscope controlled by ScanImage with a behavior camera and a National Instruments DAQ that records wingbeat signals, the position of the visual pattern, and frame pulses from both the microscope and the camera. This work was part of a U01 project shared with four other fly labs. The lab asked for a flexible set of routines it could use to prepare its data for DANDI.

## Conversion of Imaging, Stimuli, and Behavior

We built the conversion on NeuroConv, with custom interfaces for each stream. ScanImage TIFF files were read through ROIExtractors and written as a TwoPhotonSeries per channel. The lab's ROIs, defined as polygons, were rasterized into image masks in a PlaneSegmentation, and their dF/F traces were stored as a RoiResponseSeries. The visual stimulus, a 16 by 80 pixel image at every DAQ sample, was stored as an ImageSeries, and trials were derived from the lab's trial and condition vectors. Wingbeat and pattern position signals were stored as time series, and the behavior video was linked as an external file.

## Synchronization

All streams share the DAQ clock. We detected rising edges in the two-photon frame pulse and in the camera pulse to assign a time to each imaging frame and each video frame. The imaging alignment accounts for multiple channels sharing one pulse per imaging plane and drops frames recorded after the DAQ stopped. The dF/F traces, stimuli, and trials were already sampled on the DAQ clock.
