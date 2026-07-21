---
lab: "Mark Howe"
institution: "Boston University"
description: "Developed NWB conversion tools for the Howe lab's neurophysiology datasets studying neural circuits involved in learning and decision-making. The conversion pipeline handles multi-modal data including neural recordings and behavioral measurements during complex behavioral tasks."
tags:
  - electrophysiology
  - behavioral tracking
  - decision-making
  - Parkinson's disease
github: "https://github.com/catalystneuro/howe-lab-to-nwb"
date: "2024-04"
funded_project: "Aligning Science Across Parkinson's"
species: "Mouse"
dandi:
  - url: https://dandiarchive.org/dandiset/001084
    name: "001084: Targeted micro-fiber arrays for measuring and manipulating localized multi-scale neural dynamics over large, deep brain volumes during behavior"
---

The Howe lab has collected deep brain volumetric multi-channel optical data using multi-fiber arrays in head-fixed behaving mice, as part of the ASAP initiative. Our goals are to package this data at each stage of processing in the NWB format so that it can be shared within the lab and published on the DANDI Archive.

## Conversion of Photometry and Behavioral Data

We wrote an open-source Python package to ingest the data behind ["Targeted micro-fiber arrays for measuring and manipulating localized multi-scale neural dynamics over large, deep brain volumes during behavior"](https://www.sciencedirect.com/science/article/pii/S0896627323009704) into NWB. The conversion covers fiber photometry acquired by imaging large fiber bundles with Hamamatsu cameras, the results of motion and hemodynamic artifact correction, and the extracted fluorescence time series. Behavioral data covers annotated events, video, and locomotion. The lab's preprocessing pipeline, the annotated structure of the preprocessed data, and the preprocessing code itself are [published on Zenodo](https://zenodo.org/records/10272874).

## Publication on DANDI

We created a pipeline that uploads the specified list of converted sessions to the DANDI Archive automatically, along with a Dandiset annotated according to DANDI best practices.

## Demonstrating NWB Usage

We created Jupyter notebooks demonstrating how to read the converted files and access each data stream. These notebooks were submitted to the [DANDI example-notebooks repository](https://github.com/dandi/example-notebooks).
