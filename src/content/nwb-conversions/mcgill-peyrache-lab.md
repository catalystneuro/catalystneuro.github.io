---
lab: "Adrien Peyrache"
institution: "McGill University"
description: "Converting the Peyrache lab's raw Miniscope calcium imaging data to NWB and linking it to the processed outputs already published on DANDI, alongside development of an NWB extension for sleep data. The extension formalizes sleep stage annotations, staging method metadata, and sub-stage descriptors, with the lab's sleep recordings converted as a reference implementation."
tags:
  - calcium imaging
  - electrophysiology
  - behavioral tracking
  - video
  - sleep
  - Miniscope
  - EEG
  - Spyglass
github: "https://github.com/catalystneuro/peyrache-lab-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/001676"
    name: "001676: Peyrache lab Miniscope calcium imaging"
date: "2025-05"
funded_project: "SFARI ARC Spyglass"
---

The Peyrache lab records calcium imaging data using Miniscopes, alongside behavioral tracking and electrophysiology, as part of the SFARI Autism Rat Models Consortium. The processed outputs from the existing Miniscope dataset are already published on the DANDI Archive as [Dandiset 001676](https://dandiarchive.org/dandiset/001676), including processed calcium traces, ROI spatial footprints, CellReg cross-session registration, behavioral tracking, synchronization signals, and session metadata.

The lab also conducts extensive sleep recordings that combine EEG, electrophysiology, and behavioral tracking, an area of growing relevance to autism research. Beyond the immediate ARC dataset, Professor Peyrache is engaged in a broader initiative to standardize and share sleep data across species and labs, in collaboration with researchers at the Simons Foundation and sleep scientists internationally. A long-term goal is to build a community around open sleep data, with NWB and DANDI as the technical backbone. This collaboration takes a first step toward that by developing an NWB sleep extension that can serve as a reusable standard across the field.

## Conversion of Data Streams

We are writing an open-source Python package to convert the lab's raw format to NWB, shared in the public repository [peyrache-lab-to-nwb](https://github.com/catalystneuro/peyrache-lab-to-nwb) and integrated with the pipeline the lab has already developed. The work implements and tests an interface for raw Miniscope video files, reading data and metadata from the source files and converting them to NWB. Raw data is appended to the already converted session files so that provenance is preserved, linking the raw videos to the processed outputs and metadata already in Dandiset 001676. We are also reviewing the subject, session, and experimental setup metadata. Documentation covers installation and usage, and the conversion handles time alignment across data streams.

## NWB Sleep Extension

We are designing and implementing an NWB extension that represents sleep-specific data streams formally. The extension covers sleep stage annotations for wake, non-REM, and REM as epoch intervals; staging method metadata recording whether scoring was manual or algorithmic; confidence scores where applicable; and sub-stage descriptors such as slow-wave sleep. It is published to the NWB Extension Catalog and accompanied by a tutorial notebook showing how to write and read sleep-annotated NWB files. An example sleep dataset from the Peyrache lab is converted as a reference implementation.

## Publication on DANDI

The converted raw Miniscope video files are uploaded to the existing Dandiset 001676, extending it with the raw imaging data. The sleep dataset is uploaded to a new embargoed Dandiset, which serves as the reference implementation for the NWB sleep extension. Both Dandisets are annotated following DANDI best practices.

## Demonstrating NWB Usage

We create Jupyter notebooks demonstrating how to read the converted files and access each data stream. One notebook covers the Miniscope dataset, showing how to stream raw video alongside the processed outputs without downloading large files, and reproducing figures from the associated paper, Skromne Carrasco, Viejo, and Peyrache, "Months-long stability of the head-direction system," Nature 652, 167-173 (2026). A second notebook demonstrates how to write and read sleep-annotated NWB files using the new extension.

## Engagement with the Spyglass Ecosystem

We are engaging with the Spyglass development team to explore pathways toward compatibility between NWB-formatted calcium imaging data and the Spyglass analysis framework. This involves studying the DataJoint Element for calcium imaging to understand how calcium imaging data is currently handled within the DataJoint ecosystem, and identifying what would be needed to bring similar functionality into Spyglass. We are also exploring how sleep data, including EEG recordings and sleep stage annotations formatted with the new extension, could be more readily ingested and analyzed within Spyglass. Our role in this aim is primarily consultative: we contribute domain expertise in NWB data standards, calcium imaging workflows, and sleep data, and take part in discussions with the Spyglass team about approaches to integration.
