---
lab: "Marino Pagan"
institution: "University of Edinburgh"
description: "Developing NWB conversion tools for the Pagan lab's research on flexible decision-making in SFARI Autism Rat Models. The pipeline standardizes behavioral data from the Bcontrol system, behavioral video recordings, and future electrophysiological data from SpikeGadgets. These tools facilitate data sharing within the lab and publication on the DANDI Archive, while ensuring compatibility with Spyglass pipelines for reliable analysis."
tags: ["electrophysiology", "behavioral tracking", "video", "decision-making"]
github: "https://github.com/catalystneuro/pagan-lab-to-nwb"
date: "2025"
funded_project: "SFARI ARC Spyglass"
species: "Rat"
---

The Pagan lab is collecting behavioral and electrophysiological data to study the neural basis of flexible decision-making, as part of the SFARI Autism Rat Models Consortium. Behavioral data is acquired through the Bcontrol system alongside video recordings, with SpikeGadgets electrophysiology to follow. Our goals are to package this data at each stage of processing in the NWB format so that it can be shared within the lab and published on the DANDI Archive, and to have it ingested into a Spyglass pipeline.

## Conversion of Data Streams

We are writing an open-source Python package to convert each data stream from its raw format to NWB, shared in the public repository [pagan-lab-to-nwb](https://github.com/catalystneuro/pagan-lab-to-nwb). The interfaces cover behavioral data from Bcontrol, behavioral video, electrophysiology recordings from SpikeGadgets once available, and subject metadata. Documentation covers installation and usage, including scripts for each protocol, and the conversion handles time alignment across data streams.

## Spyglass Compatibility

The conversion pipelines are adapted as necessary to comply with Spyglass-specific requirements for NWB files, so that the files can be ingested into a Spyglass pipeline for reliable and reproducible analysis. We are working with the Flatiron RSE team to integrate these files as source data.

## Publication on DANDI

Example data from each project is uploaded to DANDI in embargo mode, keeping it private until the embargo is lifted. Dandisets are annotated using DANDI best practices, and released from embargo when the corresponding papers are published.

## Demonstrating NWB Usage

We create Jupyter notebooks demonstrating how to read the converted files and access each data stream. The notebooks also show how to stream NWB data directly from the archive, which avoids downloading large data files.
