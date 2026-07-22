---
lab: "Helen N. Schwerdt"
institution: "University of Pittsburgh"
description: "Developed NWB conversion tools for Schwerdt Lab's multi-modal neurochemical and electrophysiology datasets from rhesus monkeys. The pipeline supports conversion of fast-scan cyclic voltammetry (FSCV) signals, extracellular electrophysiology (Neuralynx) recordings from chronic striatal implants, spike times, and behavioral task events during reward-biased eye movement tasks."
tags: ["electrophysiology", "behavioral tracking"]
github: "https://github.com/catalystneuro/schwerdt-lab-to-nwb"
date: "2025-06"
funded_project: "Aligning Science Across Parkinson's"
species: Macaque
---

The Schwerdt lab has collected simultaneous electrophysiology and fast-scan cyclic voltammetry recordings from chronically implanted electrodes in nonhuman primates. Our goals are to package this data at each stage of processing in the NWB format so that it can be shared within the lab and published on the DANDI Archive.

## Conversion Pipeline

We wrote an open-source Python package to ingest the data behind the manuscript ["Micro-invasive probes for monitoring electrical and chemical neural activity in nonhuman primates"](https://doi.org/10.1101/2025.01.30.635139) into NWB. The pipeline is shared in the public repository [schwerdt-lab-to-nwb](https://github.com/catalystneuro/schwerdt-lab-to-nwb) and implements interfaces for extracellular electrophysiology from Neuralynx, both raw and processed; FSCV signals recorded on the lab's custom hardware, covering raw voltammograms alongside trial-aligned dopamine concentration changes, pH, and movement artifacts; spike sorting results from Plexon Offline Sorter; and behavioral task events including trial structure and event timestamps.

The pipeline is modular and extensible, so it can take on additional datasets with a similar structure as new data becomes available.

## Publication on DANDI

We created a pipeline that uploads the specified list of converted sessions to the DANDI Archive automatically, into an embargoed Dandiset annotated according to DANDI best practices. The Dandiset is released from embargo and made open when the corresponding papers are published.

## Demonstrating NWB Usage

We created Jupyter notebooks demonstrating how to read the converted files, access each data stream, and generate example visualizations. These notebooks were submitted to the [DANDI example-notebooks repository](https://github.com/dandi/example-notebooks).
