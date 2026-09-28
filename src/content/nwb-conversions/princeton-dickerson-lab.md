---
lab: "Bradley Dickerson"
institution: "Princeton University"
description: "Developed NWB conversion tools for the Dickerson lab's research on Drosophila sensory processing. The pipeline standardizes two-photon imaging of GCaMP7f and tdTomato from a Thorlabs microscope run by ThorImageLS, together with wingbeat amplitude and visual stimulus signals recorded by ThorSync."
tags: ["calcium imaging", "two-photon microscopy", "behavioral tracking", "visual processing"]
github: "https://github.com/catalystneuro/cohen-u01-to-nwb"
date: "2024-08"
funded_project: "Drosophila Sensation U01"
species: "Drosophila"
---

The Dickerson lab at Princeton University images neural activity in Drosophila with a two-photon microscope while recording wingbeat responses to a visual arena. The sample data came from a Thorlabs Bergamo microscope run by ThorImageLS, imaging GCaMP7f and tdTomato in two channels, and from ThorSync, which recorded wingbeat and visual stimulus signals alongside the microscope's frame counter. This work was part of a U01 project shared with four other fly labs, and our goal was a script that brings both streams into one NWB file per session.

## Conversion of Two-Photon Imaging

ThorImageLS writes one OME-TIFF file per frame and channel, with acquisition settings in an Experiment.xml file. During this project we added a Thor extractor to ROIExtractors and a ThorImagingInterface to NeuroConv, which read the file list from the embedded OME metadata and the frame rate from Experiment.xml. Our conversion extends that interface to write each channel as its own TwoPhotonSeries, labeled with its indicator.

## Conversion of Behavior

A custom interface reads the ThorSync HDF5 file. Left wingbeat amplitude and left-minus-right wingbeat amplitude, both outputs of the lab's wingbeat analysis program, were stored as time series, and the X and Y signals from the visual arena controller were stored as a SpatialSeries. Their timestamps were computed from ThorSync's frame counter and the 4 Hz frame rate the lab reported.

## Demonstrating NWB Usage

A Jupyter notebook in the repository shows how to open a converted file and plot the imaging, wingbeat, and visual stimulus data.
