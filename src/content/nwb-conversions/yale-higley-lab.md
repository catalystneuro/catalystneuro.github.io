---
lab: "Michael Higley"
institution: "Yale University"
description: "Developed NWB conversion tools for the Higley lab's neurophysiology datasets, including the Lohani 2022 study which combines behavioral measurements with neural recordings. The conversion pipeline handles multi-modal data integration and implements custom behavioral interfaces for specialized experimental protocols."
tags: ["electrophysiology", "behavioral tracking"]
github: "https://github.com/catalystneuro/higley-lab-to-nwb"
date: "2023-09"
funded_project: "Aligning Science Across Parkinson's"
species: Mouse
---

The Higley lab has collected multi-channel widefield and two-photon imaging data from mice running freely on a wheel while visually stimulated, as part of the ASAP initiative. The imaging data are preprocessed for rigid transformation and hemodynamic correction, then parcellated. The behavioral data include video recordings of the mouse's face and wheel speed tracking. Our goals are to package this data at each processing stage in the NWB format so that it can be shared within the lab and published on the DANDI Archive.

## Conversion of Optical Imaging and Behavior

We wrote an open-source Python package to ingest the data underlying the lab's preprint, [Rapid fluctuations in functional connectivity of cortical networks encode spontaneous behavior](https://www.biorxiv.org/content/10.1101/2021.08.15.456390v4.full). The conversion covers dual mesoscopic and two-photon imaging data acquired on a custom microscope and written as ScanImage TIFF files, along with the outputs of rigid transformation, hemodynamic correction, and filtering; ROI segmentation from functional parcellation with Local Selective Spectral Clustering; wheel motion recorded through a magnetic angle sensor into Spike2 files; face motion including pupil and whiskers, imaged with a miniature CMOS camera; face movement and pupil dilation as FaceMap output; the visual stimulus pattern; and the TTL synchronization pulses triggered by each system.

## Publication on DANDI

We created a pipeline that uploads the specified list of converted sessions to the DANDI Archive in embargo mode. The embargo runs until the preprint is formally accepted by a reviewing journal, at which point the dataset becomes publicly available.

## Demonstrating NWB Usage

We created Jupyter notebooks demonstrating how to read the converted files and access each data stream.
