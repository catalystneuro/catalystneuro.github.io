---
lab: Yang Dan
institution: "University of California, Berkeley"
description: "Developed NWB conversion tools for the Dan lab's sleep-wake project. The pipeline standardizes multiple data streams including EEG, EMG, fiber photometry, optogenetic stimulation data, behavioral videos, and DeepLabCut pose estimation. These tools enable comprehensive analysis of brain activity during sleep and wakefulness, facilitating data sharing through the DANDI Archive with example visualization notebooks for exploring the data relationships across modalities. This project culminated in two Dandisets: The first (#001617) focuses on the neural dynamics of sleep-wake regulation, as recorded by EEG, EMG, and fiber photometry, and probed by optogenetic stimulation. The second (#001711) centers on behavioral outcomes as captured by video and pose estimation data, alongside EEG and EMG recordings."
tags:
  - electrophysiology
  - fiber photometry
  - optogenetics
  - behavioral tracking
  - video
  - sleep
github: https://github.com/catalystneuro/dan-lab-to-nwb
dandi:
  - url: "https://dandiarchive.org/dandiset/001617"
    name: "001617: Characterization of Sleep-Wake Patterns and Neural Activity in a Progressive Mouse Model of Parkinson's disease"
  - url: "https://dandiarchive.org/dandiset/001711"
    name: "001711: Characterization of Sleep-Wake Patterns and Motor Behavior in a Progressive Mouse Model of Parkinson's disease"
date: "2024-12"
funded_project: "Aligning Science Across Parkinson's"
species: "Mouse"
---

The Dan lab has collected preliminary data comparing brain activity during sleep and wakefulness, using simultaneous EEG and fiber photometry, as part of the ASAP initiative. Our goals are to package this data at each stage of processing in the NWB format so that it can be shared within the lab and published on the DANDI Archive.

## Conversion of Project Data

We wrote an open-source Python package to ingest data from the systems used in the lab's sleep-wake project into NWB, covering EEG, EMG, fiber photometry, optogenetics, and behavioral video. Further components are developed as the project progresses, to stay compatible with the other varieties of experiment the lab performs.

## Publication on DANDI

We created a pipeline that uploads the specified list of converted sessions to the DANDI Archive automatically, and a Dandiset annotated according to DANDI best practices. Because data collection is ongoing and the corresponding paper is not yet published, the data is not uploaded publicly; it may be uploaded in embargo mode instead, with a decision on public release taken with the lab toward the end of the project.

## Demonstrating NWB Usage

We created Jupyter notebooks demonstrating how to read the converted files, access each data stream, and generate example visualizations. These notebooks were submitted to the [DANDI example-notebooks repository](https://github.com/dandi/example-notebooks).
