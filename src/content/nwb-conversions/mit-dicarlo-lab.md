---
lab: "James DiCarlo"
institution: "Massachusetts Institute of Technology"
description: "Developed NWB conversion tools for the DiCarlo lab's neuroscience datasets. The conversion pipeline processes data from Macaca mulatta (rhesus macaques), including Utah array recordings acquired using the Intan data acquisition system, behavioral data encoded in the MWorks format, and visual stimuli presented as images or video. Additionally, the pipeline incorporates an optimized spike-threshold crossing algorithm and tools for calculating peristimulus time histograms (PSTH)."
tags: ["visual processing", "electrophysiology", "behavioral tracking"]
github: "https://github.com/catalystneuro/dicarlo-lab-to-nwb"
date: "2024-05"
funded_project: "SCGB NWB Adoption"
species: Macaque
---

The DiCarlo lab is developing a pipeline that integrates electrophysiological and behavioral data to generate benchmark data within the framework of the Brain-Score project. Our objective is to help them integrate each stage of processing with the NWB format, and to support publication of the final benchmark data on the DANDI Archive. The work builds on [NeuroConv](https://neuroconv.readthedocs.io/en/main/index.html), our open-source conversion library, and [SpikeInterface](https://github.com/SpikeInterface/spikeinterface), a library for building extracellular electrophysiology processing pipelines.

## Conversion of Electrophysiology and Task Data

We extended NEO to read Intan data in the one-file-per-channel format, built a custom conversion interface for MWorks and for behavioral data such as eye tracking and photodetector signals, and built NeuroConv interfaces for the images and videos displayed to the subject. We also built an NWB neurodata extension for peri-stimulus time histograms. Acquired data is written to NWB using chunking and lossless compression, which keeps file sizes down and makes cloud access efficient.

## Processing of Electrophysiology

Intan data is ingested from NEO into SpikeInterface. We developed a SpikeInterface processing pipeline for threshold detection on Utah arrays, including the lab's own algorithm as an option, and a spike sorting pipeline for the same arrays that handles concatenation of both recording data and metadata across multiple experimental sessions. Both write their results to NWB.

## Ingestion into the Lab's Project Format

We built a pipeline that aggregates the peri-stimulus time histograms of single recording sessions for the same subject, integrates the lab's quality control algorithm into the aggregation step, and splits the data into training and testing NWB files.

## Validation and Publication on DANDI

Once the pipeline was delivered, the lab tested it against their own data. Subject to that testing and to available resources, a selection of projects may be uploaded to DANDI, with one Dandiset for the training data and another for the testing data, and embargo mode used for data not yet ready to publish.

## Documentation and Training

We provide documentation and training for installing the software, running it, and reading the resulting NWB files.
