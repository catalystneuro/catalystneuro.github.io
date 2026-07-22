---
lab: "Maria Geffen"
institution: "University of Pennsylvania"
description: "Building NWB conversion pipelines for the Geffen lab's studies of auditory processing, covering electrophysiology, optogenetics, and multi-modal stimuli. Some streams arrive in common formats such as Intan, while task structure is held in the lab's own MATLAB structs, so the pipeline combines NeuroConv interfaces with custom ones."
tags:
  - electrophysiology
  - optogenetics
  - auditory processing
date: "2023-11"
species: Mouse
---

The Geffen lab studies the neural processing of auditory stimuli using electrophysiology, optogenetics, and multi-modal stimuli such as odor. Some of these data streams arrive in common formats, such as Intan for acquisition, while others are custom, such as MATLAB structs describing the task structure. Our goal is to build open data conversion pipelines for several projects currently under development, covering both raw and processed streams. The work combines data interface classes imported from NeuroConv with custom interfaces where the lab's formats require them, and the result is an open-source pipeline library supporting several experiments now running in the lab.

## Conversion Pipelines

We created an open-source Python library to ingest each of these data sources, with a conversion pipeline for each project, shared in a public GitHub repository. The interfaces read data and metadata from the source files and convert them to NWB.

## Publication on DANDI

Example data from each project is uploaded to DANDI in embargo mode, keeping it private until the embargo is lifted. Dandisets are annotated using DANDI best practices, and released from embargo when the corresponding papers are published.

## Demonstrating NWB Usage

We create Jupyter notebooks demonstrating how to read the converted files and access each data stream. The notebooks also show how to stream NWB data directly from the archive, which avoids downloading large data files.
