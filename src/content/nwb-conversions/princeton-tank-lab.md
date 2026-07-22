---
lab: "David Tank"
institution: "Princeton University"
description: "Developed comprehensive NWB conversion tools for the Tank lab's behavioral and electrophysiology datasets. Created a custom NWB extension (ndx-tank-metadata) for storing experiment-specific metadata including maze configurations and rig parameters. The conversion pipeline integrates Neuropixels recordings with VirMen behavioral data, including detailed trial structure, behavioral metrics, and synchronized TTL events. The tools support extensive metadata handling and include specialized visualization widgets for behavioral analysis."
tags: ["spatial navigation", "electrophysiology", "behavioral tracking"]
github: "https://github.com/catalystneuro/tank-lab-to-nwb"
date: "2020-10"
funded_project: "SCGB NWB Adoption"
species: Mouse
---

The Tank and Brody labs were beginning to collect Neuropixels data, and our goal in this Simons Collaboration on the Global Brain project is to help them standardize around modern processing pipelines for electrophysiology.

## Conversion of Electrophysiology

We ingest SpikeGLX Neuropixels data into SpikeInterface, demonstrating preprocessing of extracellular recordings, running the popular semi-automatic spike sorters such as Kilosort2 and Ironclust, post-processing of sorted datasets, comparison and benchmarking of sorter outputs, validation and curation including through Phy, visualization of recordings and sorting results, and export to NWB. The pipeline aims to keep the choice of motion correction algorithm flexible.

The work starts from Brody lab Neuropixels data, which had already been collected, and extends to the Tank lab's data once their acquisition system is producing it. Time permitting, tetrode recordings from the Brody lab are folded into the same pipeline.

## Conversion of Task Data

We ingest high-level ViRMEn data from a T-maze decision-making task and write it into the same NWB file, synchronized with the electrophysiology through either TTL pulses or I2C. The conversion is reachable through a web interface, a tailored Python API, and a tailored command line interface. Time permitting, the Brody lab's auditory task and its associated behavioral responses are converted as well.

## Interactive Visualizations

We create interactive visualizations of NWB data that combine behavior with the neural response, such as PSTH and place field analyses. These validate that the files converted correctly, give lab members a quick way to run simple analyses, and serve as example code for working with NWB data.
