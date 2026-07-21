---
lab: "Jacob Reimer"
institution: "Baylor College of Medicine"
description: "Developed NWB conversion tools for the Reimer lab's two-photon imaging datasets. The conversion pipeline handles complex datasets including calcium imaging from the two-photon random access mesoscope (2P-RAM), behavioral measurements (locomotion, eye tracking), and olfactory stimuli. The tools support the standardization of large-scale imaging experiments involving tens of thousands of neurons across multiple visual cortical areas."
tags: ["visual processing", "calcium imaging", "behavioral tracking"]
github: "https://github.com/catalystneuro/reimer-arenkiel-lab-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/001176"
    name: "001176: Cortical acetylcholine dynamics are predicted by cholinergic axon activity and behavior state"
  - url: "https://dandiarchive.org/dandiset/001170"
    name: "001170: Mesoscale Two-Photon Calcium Imaging of Population Level Odor Responses from the Mouse Olfactory Bulb"
date: "2024-04"
funded_project: "Aligning Science Across Parkinson's"
species: "Mouse"
---

The Reimer and Arenkiel labs have collected two-photon mesoscopic imaging data from mice while delivering odor stimuli, as part of the ASAP initiative. Our goals are to package this data at each stage of processing in the NWB format so that it can be shared within the labs and published on the DANDI Archive.

## Conversion of Imaging Data

We wrote an open-source Python package to ingest the data into NWB. The conversion covers two-photon mesoscopic imaging as TIFF stacks, preprocessed imaging output from EZCalcium, the machine learning model parameters used for denoising, experimental metadata following the MICrONS conventions, odor delivery stimuli represented with the ndx-odor-metadata extension, and synchronization signals.

Some of that metadata lives in a DataJoint database rather than in the acquisition files, so part of the work was agreeing how to reach it, whether by granting access to the database directly, exporting it as CSVs or as a containerized copy, or exposing it through a public endpoint.

## Publication on DANDI

We created a pipeline that uploads the specified list of converted sessions to the DANDI Archive in embargo mode. The embargo runs until the preprint is formally accepted by a reviewing journal, at which point the dataset becomes publicly available.

## Demonstrating NWB Usage

We created Jupyter notebooks demonstrating how to read the converted files and access each data stream.
