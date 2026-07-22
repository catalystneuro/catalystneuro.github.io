---
lab: "Bence Olveczky"
institution: "Harvard University"
description: "Developing NWB conversion tools for the Olveczky lab's behavioral and electrophysiological datasets studying learned and natural behaviors. The pipeline standardizes 256-channel flexible probe and Neuropixels recordings, continuous tetrode data, six-camera video with sDANNCE pose estimation, and trial structure, and adapts the resulting files for ingestion into a Spyglass pipeline."
tags:
  - electrophysiology
  - behavioral tracking
  - video
  - pose estimation
  - motor control
  - Spyglass
github: "https://github.com/catalystneuro/olveczky-lab-to-nwb"
date: "2026-04"
funded_project: "SFARI ARC Spyglass"
species: Rat
---

The Olveczky lab is collecting behavioral and electrophysiological data to study the neural basis of learned and natural behaviors, as part of the SFARI Autism Rat Models Consortium. Behavioral data includes multi-camera video from six cameras with pose estimation via sDANNCE, across several behavioral protocols. Electrophysiological recordings include flexible probes carrying 256 channels in prefrontal cortex, Neuropixels, and continuous tetrode recordings, with fiber photometry a possibility in future protocols. The behavioral setup and data streams overlap substantially with the Uchida lab's, since the experiments run in the same facility. Some behavioral data is already published on Harvard Dataverse. Our goals are to package this data at each stage of processing in the NWB format so that it can be shared within the lab and published on the DANDI Archive, and to have it ingested into a Spyglass pipeline.

## Conversion of Data Streams

We are writing an open-source Python package to convert each data stream from its raw format to NWB, shared in the public repository [olveczky-lab-to-nwb](https://github.com/catalystneuro/olveczky-lab-to-nwb). The interfaces cover extracellular electrophysiology from the 256-channel flexible probes and from Neuropixels, including raw data and spike-sorted output; continuous tetrode recordings, both raw and snippeted; behavioral video from the six-camera rig; pose estimation from sDANNCE; event data and trial structure; and subject metadata. Documentation covers installation and usage, including scripts for each protocol, and the conversion handles time alignment across data streams.

The lab runs behavior-only experiments as well as behavior combined with electrophysiology, and may add fiber photometry later. The pipeline accommodates each protocol type, and where possible is built with an eye toward generalization, so that it can be reused for datasets beyond the immediate scope of the ARC project.

## Spyglass Compatibility

The conversion pipelines are adapted as necessary to comply with Spyglass-specific requirements for NWB files, so that the files can be ingested into a Spyglass pipeline for reliable and reproducible analysis. We are working with the Flatiron RSE team to integrate these files as source data.

## Publication on DANDI

Example data from each project is uploaded to DANDI in embargo mode, keeping it private until the embargo is lifted. Dandisets are annotated using DANDI best practices, and released from embargo when the corresponding papers are published. Previously published data, such as the behavioral dataset on Harvard Dataverse, is linked from the DANDI listing so that it stays discoverable alongside the rest.

## Demonstrating NWB Usage

We create Jupyter notebooks demonstrating how to read the converted files and access each data stream. The notebooks also show how to stream NWB data directly from the archive, which avoids downloading large data files, and how to read and query the data through Spyglass.
