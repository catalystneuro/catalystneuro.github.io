---
lab: "Naoshige Uchida"
institution: "Harvard University"
description: "Developing NWB conversion tools for the Uchida lab's behavioral and fiber photometry datasets studying social behavior and observational fear learning. The conversion pipeline handles fiber photometry from Doric hardware (raw and processed MATLAB signals), multi-camera behavioral video (six cameras), DANNCE / social-DANNCE pose estimation, pCampi synchronization data (H5 files with TTL pulses), stimulus and trial event data (e.g., foot shock times), and subject metadata, with Neuropixels electrophysiology (SpikeGLX) including spike-sorted output and trial structure as a stretch goal. The pipeline performs time alignment across data streams and adapts conversions for ingestion into a Spyglass analysis pipeline."
tags: ["fiber photometry", "behavioral tracking", "pose estimation", "video", "electrophysiology"]
github: "https://github.com/catalystneuro/uchida-lab-to-nwb"
date: "2026-04"
funded_project: "SFARI ARC Spyglass"
species: Rat
---

The Uchida lab is collecting behavioral and fiber photometry data to study social behavior and observational fear learning, as part of the SFARI Autism Rat Models Consortium. Behavioral data include multi-camera video recordings from six cameras with pose estimation via social-DANNCE, alongside fiber photometry acquired on Doric hardware. Experiments are coordinated through pCampi, which records TTL synchronization pulses to an H5 file. The lab also collects Neuropixels electrophysiology in trial-based paradigms, though that is not the primary focus of the ARC project. Our goals are to package this data at each stage of processing in the NWB format so that it can be shared within the lab and published on the DANDI Archive, and to have it ingested into a Spyglass pipeline.

## Conversion of Data Streams

We are writing an open-source Python package to convert each data stream from its raw format to NWB, shared in the public repository [uchida-lab-to-nwb](https://github.com/catalystneuro/uchida-lab-to-nwb). The interfaces cover fiber photometry from Doric, including both raw and processed MATLAB signals; behavioral video from the six-camera recordings; pose estimation from DANNCE and social-DANNCE models; synchronization data from pCampi; stimulus and trial event data such as foot shock times in the fear chamber protocols; and subject metadata. Neuropixels recordings from SpikeGLX, covering raw data, spike-sorted output, and trial structure, are a stretch goal. Documentation covers installation and usage, including scripts for each protocol, and the conversion handles time alignment across data streams.

## Spyglass Compatibility

The conversion pipelines are adapted as necessary to comply with Spyglass-specific requirements for NWB files, so that the files can be ingested into a Spyglass pipeline for reliable and reproducible analysis. We are working with the Flatiron RSE team to integrate these files as source data.

## Publication on DANDI

Example data from each project is uploaded to DANDI in embargo mode, keeping it private until the embargo is lifted. Dandisets are annotated using DANDI best practices, and released from embargo when the corresponding papers are published.

## Demonstrating NWB Usage

We create Jupyter notebooks demonstrating how to read the converted files and access each data stream. The notebooks also show how to stream NWB data directly from the archive, which avoids downloading large data files, and how to read the data through Spyglass.
