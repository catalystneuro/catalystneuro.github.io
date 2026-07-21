---
lab: "Tim Hanks"
institution: "University of California, Davis"
description: "Developing NWB conversion tools for the Hanks lab's behavioral and fiber photometry datasets studying decision-making and working memory in rats. The pipeline standardizes multi-region Doric photometry recordings, Bpod trial data read from the lab's SQL database, behavioral video, and pose estimation outputs, and adapts the resulting files for ingestion into a Spyglass pipeline."
tags:
  - fiber photometry
  - behavioral tracking
  - video
  - pose estimation
  - decision-making
  - working memory
  - Spyglass
github: "https://github.com/catalystneuro/hanks-lab-to-nwb"
date: "2025-05"
funded_project: "SFARI ARC Spyglass"
species: Rat
---

The Hanks lab is collecting behavioral and fiber photometry data to study the neural basis of decision-making and working memory in rats. Behavioral data consists of session-based trial records from two experimental protocols: an auditory working memory delay response task, and a bandit task in which animals track reward probabilities across ports whose contingencies switch over trials. Behavioral events include auditory stimuli, LED port cues, port entries, and reward delivery, all controlled and recorded through Bpod. Video recordings of subjects are also collected, with pose estimation work ongoing. Fiber photometry recordings capture simultaneous multi-region fluorescence signals, up to four brain regions per session across a set of five regions, acquired with a Doric system using isosbestic and ligand channels. The behavioral setup and data management follow a framework adapted from the Brody lab, with trial data written directly to a SQL database.

Our goals are to package this data at each stage of processing in the NWB format so that it can be shared within the lab and published on the DANDI Archive, and to have it ingested into a Spyglass pipeline. Working with Professor Hanks and the lab team, we identified four aims.

## Conversion of Data Streams

We are writing an open-source Python package to convert each data stream from its raw format to NWB. The conversion pipelines are shared in a public repository, [hanks-lab-to-nwb](https://github.com/catalystneuro/hanks-lab-to-nwb), which implements and tests the following interfaces:

- **Fiber photometry.** Converts Doric acquisition files containing simultaneous multi-region fluorescence signals on isosbestic and ligand channels. Channel-to-brain-region mappings and LED wavelengths are incorporated as metadata, and artifact time windows identified by the lab's preprocessing workflow are stored as annotated time intervals. Both the raw fluorescence traces and the results of the DF/F calculation are included.
- **Bpod behavior.** Converts trial-structured behavioral data exported from the lab's SQL database, originally written by Bpod. The interface parses and stores all relevant event times, including auditory stimulus onsets, LED cue events, port entry and exit times, and reward delivery events.
- **Video.** Stores the raw behavioral video recordings.
- **Pose estimation.** As pose estimation outputs become available, from DeepLabCut, SLEAP, or a similar tool, this interface stores the resulting body-position time series in NWB's standard pose estimation data type.
- **Subject metadata.** Subject ID, species, age, sex, and implant site coordinates for each fiber photometry channel.

We provide detailed documentation for installing and using the conversion software, including scripts that handle data from each protocol. The conversion of each protocol handles the time alignment of data across streams. The lab runs two types of experimental protocol and the pipeline accommodates both. Where possible it is built with an eye toward generalization, so that it can be reused for future datasets beyond the immediate scope of the ARC project.

## Spyglass Compatibility

The conversion pipelines are adapted as necessary to comply with Spyglass-specific requirements for NWB files, so that the files can be ingested into a Spyglass pipeline for reliable and reproducible analysis. We are working with the Flatiron RSE team to integrate these files as source data. This involves testing the ingestion of converted NWB files into Spyglass, coordinating with the Spyglass team to add support for data types specific to this lab that the pipeline does not yet handle, and creating a notebook demonstrating how to read and query the lab's data directly from the Spyglass database.

## Publication on DANDI

Example data from the project is uploaded to DANDI in embargo mode, keeping it private until the embargo is lifted. Because data collection is ongoing, an initial representative set of sessions is uploaded first, with the full dataset to follow. Dandisets are annotated using DANDI best practices, including standard ontologies for brain areas and other experimental metadata. When the corresponding papers are published, the Dandisets are released from embargo and made open.

## Demonstrating NWB Usage

We create Jupyter notebooks that demonstrate how to read the converted files and access each data stream. The notebooks also show how to stream NWB data directly from the DANDI Archive, which avoids downloading large data files, and how to read and query the data through the Spyglass pipeline. They include standard visualizations such as event-aligned fiber photometry activity. We also validate the automatic data visualization tools integrated with DANDI to confirm that they work correctly with the lab's data.
