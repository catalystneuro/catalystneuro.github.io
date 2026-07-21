---
lab: "Sergey Stavisky"
institution: "University of California, Davis"
description: "Developed comprehensive NWB conversion tools for the Stavisky lab's brain-to-text decoding datasets. The conversion pipeline handles complex neural decoding data including RNN decoder outputs, language model predictions, and processed electrophysiology signals. Created custom visualization widgets for analyzing decoding performance, trial-aligned data, and temporal evolution of phoneme and word predictions. The tools support Redis-based data streaming and include extensive configuration options through YAML files."
tags: ["brain-computer interface", "electrophysiology", "behavioral tracking"]
github: "https://github.com/catalystneuro/stavisky-lab-to-nwb"
date: "2023-05"
funded_project: "SCGB NWB Adoption"
species: Macaque
---

The Stavisky lab collects data from human clinical trial participants using Utah arrays acquired through a Blackrock system, and in time Neuropixels through SpikeGLX. Our goals are to package this clinical data in the NWB format so that it can be shared within the lab, and to allow publication of processed or derived data on the DANDI Archive.

## Conversion of Electrophysiology and Behavior

We ingest data into NWB covering extracellular recordings, video tracking of the subject, audio recordings of the session, spiking data such as threshold crossings or sorted units, and any derived or processed data that follows. Because this is clinical data, we also built pipelines that let whoever runs the conversion choose which modalities to include in the output file, so that the result adheres to the sharing policies governing protected patient data.

## Publication on DANDI

We created a pipeline that uploads a subset of the data to the DANDI Archive. No clinical data required immediate publication, so mock data was used to prototype and test the feature, giving the lab a straightforward route to publish once suitable data has been acquired.

## Interactive Visualizations

We created interactive visualizations of NWB data that combine behavior with neural responses, such as PSTH and place field analyses. These validate that the files converted correctly, give lab members a quick way to run simple analyses on NWB files, and serve as example code for working with NWB data.

## Processing of Electrophysiology

As time allowed, we developed a spike sorting pipeline using SpikeInterface to improve identification of individual units beyond the baseline threshold crossings currently used. The pipeline is compatible with both the present Blackrock acquisition format and the future Neuropixels formats, and covers preprocessing of extracellular recordings, running selected sorters including ensembles, comparison and benchmarking of their outputs, and validation and curation either automatically from quality metrics or manually.
