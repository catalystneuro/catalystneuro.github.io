---
lab: Peter Kind
institution: "University of Edinburgh"
description: Converting multimodal neuroscience data including extracellular electrophysiology recordings from OpenEphys/Intan systems, behavioral scoring data, video recordings with MoSeq pose estimation, and sensory stimulation data. The conversion pipeline ensures compatibility with Spyglass for advanced analysis capabilities.
github: https://github.com/catalystneuro/kind-lab-to-nwb
date: "2025-01"
tags:
  - electrophysiology
  - behavioral tracking
  - autism
funded_project: SFARI ARC Spyglass
species: Rat
---

The Kind lab has collected extracellular electrophysiology data alongside behavioral video and pose estimation from MoSeq, across a range of behavioral protocols, as part of the SFARI Autism Rat Models Consortium. Our goals are to package this data at each stage of processing in the NWB format so that it can be shared within the lab and published on the DANDI Archive, and to have it ingested into a Spyglass pipeline.

## Conversion of Data Streams

We are writing an open-source Python package to convert each data stream to NWB, shared in the public repository [kind-lab-to-nwb](https://github.com/catalystneuro/kind-lab-to-nwb). The interfaces cover extracellular electrophysiology from OpenEphys and Intan systems; behavioral scoring data and related metadata from the lab's custom spreadsheet format; behavioral video; pose estimation from MoSeq; sensory stimulation data and metadata; and subject metadata. Documentation covers installation and usage, including scripts for each protocol, and the conversion handles time alignment across data streams.

## Spyglass Compatibility

The conversion pipelines are adapted as necessary to comply with Spyglass-specific requirements for NWB files, so that the files can be ingested into a Spyglass pipeline for reliable and reproducible analysis. We are working with the Flatiron RSE team to integrate these files as source data.

## Publication on DANDI

Example data from each project is uploaded to DANDI in embargo mode, keeping it private until the embargo is lifted. Dandisets are annotated using DANDI best practices, and released from embargo when the corresponding papers are published.

## Demonstrating NWB Usage

We create Jupyter notebooks demonstrating how to read the converted files and access each data stream. The notebooks also show how to stream NWB data directly from the archive, which avoids downloading large data files.
