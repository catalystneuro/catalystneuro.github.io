---
lab: "Alfredo Gonzalez-Sulser"
institution: "University of Edinburgh"
description: "Developing NWB conversion tools for the Gonzalez-Sulser lab's chronic EEG recordings across multiple SFARI rat lines, studying circadian rhythms, sleep-wake cycles, and seizure activity. The pipeline standardizes multi-day wireless TainiTec recordings alongside the lab's automated sleep state classifications and seizure timestamps, and adapts the resulting files for ingestion into a Spyglass pipeline."
tags:
  - electrophysiology
  - EEG
  - sleep
  - epilepsy
  - autism
  - circadian rhythms
  - Spyglass
github: "https://github.com/catalystneuro/gonzalez-sulser-lab-to-nwb"
date: "2025-04"
funded_project: "SFARI ARC Spyglass"
species: Rat
---

The Gonzalez-Sulser lab has collected chronic EEG data across multiple SFARI lines to study circadian rhythms, sleep-wake cycles, and seizure activity, as part of the SFARI Autism Rat Models Consortium. Recordings are acquired wirelessly with a TainiTec system and NeuroNexus EEG grids, giving 14 EEG channels and 2 EMG channels over multi-day sessions, typically three days at a time. The lab has developed automated sleep detection and seizure scoring pipelines that produce brain state classifications and seizure timestamps for each recording. Data from five SFARI lines has been collected, one of which, GRIN2B, is already published. Our goals are to package this data at each stage of processing in the NWB format so that it can be shared within the lab and published on the DANDI Archive, and to have it ingested into a Spyglass pipeline.

## Conversion of Data Streams

We are writing an open-source Python package to convert each data stream from its raw format to NWB, shared in the public repository [gonzalez-sulser-lab-to-nwb](https://github.com/catalystneuro/gonzalez-sulser-lab-to-nwb). The interfaces cover chronic EEG from the TainiTec wireless system across its 14 EEG and 2 EMG channels; sleep state classifications, as brain state labels for each epoch; seizure timestamps; light cycle timing metadata, so recordings can be aligned to the circadian cycle; and subject metadata. Documentation covers installation and usage, including scripts for each protocol, and the conversion handles time alignment across data streams.

All five lines use the same wireless system and folder organization, so we develop the pipeline against the published GRIN2B dataset and validate it against the remaining lines to confirm it generalizes.

## Spyglass Compatibility

The conversion pipelines are adapted as necessary to comply with Spyglass-specific requirements for NWB files, so that the files can be ingested into a Spyglass pipeline for reliable and reproducible analysis. We are working with the Flatiron RSE team to integrate these files as source data.

## Publication on DANDI

Data from each line is uploaded to DANDI. The published GRIN2B dataset is made publicly available, while datasets from unpublished lines are uploaded in embargo mode and stay private until the embargo is lifted. Dandisets are annotated using DANDI best practices, and released from embargo when the corresponding papers are published.

## Demonstrating NWB Usage

We create Jupyter notebooks demonstrating how to read the converted files and access each data stream. The notebooks also show how to stream NWB data directly from the archive, which avoids downloading large data files, and how to read and query the data through Spyglass.
