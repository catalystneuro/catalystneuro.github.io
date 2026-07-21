---
lab: "Christine Constantinople"
institution: "New York University"
description: "Developed comprehensive NWB conversion tools for the Constantinople lab's diverse neuroscience datasets. The conversion pipeline handles multiple data streams including fiber photometry recordings and electrophysiology data, with support for both processed behavioral data and spike sorting. The tools include specialized extractors and interfaces for different experimental paradigms, along with extensive metadata handling through YAML configuration files."
tags: ["behavioral tracking", "electrophysiology", "calcium imaging"]
github: "https://github.com/catalystneuro/constantinople-lab-to-nwb"
date: "2024-07"
funded_project: "NYU Librarians"
species: Rat
---

The Constantinople lab runs a high-throughput setup with many rats performing a Bpod-based behavioral task, alongside several neurophysiology acquisition systems including fiber photometry, Neuropixels, and video monitoring, each with its own standard processing pipeline. Our goal is to build open data conversion pipelines for several projects currently under development. A second goal is to train personnel in the NYU Library Division in standardizing and publishing neurophysiology data, so they are included throughout the process.

The work spans four projects. The first covers behavioral data output by Bpod for the preprint ["Distinct value computations support rapid sequential decisions"](https://www.biorxiv.org/content/10.1101/2023.03.14.532617v2), including behavior annotations in a custom MATLAB format and task-defined parameters. The second uses fiber photometry and optogenetics to study the influence of estrogenic hormones and the reproductive cycle on the same behavioral task, and covers photometry data, the synchronization signal sent to the Doric system's NIDAQ, and signals from rig lights corresponding to task events. The third performs the same behavioral task while Neuropixels records extracellular electrophysiology from roughly 20 rats, synchronized by an Arduino sending barcodes to both the Bpod and OpenEphys systems, and covers the OpenEphys recordings plus Kilosort spike sorting and Phy curation. The fourth records video and processes it with DeepLabCut for semi-automated pose estimation.

## Conversion Pipelines

We wrote an open-source Python library to ingest each of these data sources, with a conversion pipeline for each project, shared in the public repository [constantinople-lab-to-nwb](https://github.com/catalystneuro/constantinople-lab-to-nwb). The interfaces cover Bpod output, fiber photometry, OpenEphys electrophysiology, Kilosort and Phy, video, and DeepLabCut.

## Publication on DANDI

Example data from each project is uploaded to DANDI in embargo mode, keeping it private until the embargo is lifted. Dandisets are annotated using DANDI best practices, and released from embargo when the corresponding papers are published.

## Demonstrating NWB Usage

We created Jupyter notebooks demonstrating how to read the converted files and access each data stream. The notebooks also show how to stream NWB data directly from the archive, which avoids downloading large data files.
