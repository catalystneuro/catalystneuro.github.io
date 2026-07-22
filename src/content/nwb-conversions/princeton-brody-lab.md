---
lab: "Carlos Brody"
institution: "Princeton University"
description: "Developed NWB conversion tools for the Brody lab's neurophysiology datasets focused on decision-making and neural circuits. The project includes custom processing pipelines and utility code for converting experimental data to the standardized NWB format, with specialized Python-based conversion tools."
tags: ["electrophysiology", "behavioral tracking"]
github: "https://github.com/catalystneuro/brody-lab-to-nwb"
date: "2021-03"
funded_project: "SCGB NWB Adoption"
species: Rat
---

The Brody lab collects SpikeGLX, SpikeGadgets, and Neuralynx data, with OpenEphys to follow. Our goals, as part of the Simons Collaboration on the Global Brain data standardization effort, are to improve the efficiency of their existing processing pipelines through semi-automated curation in SpikeInterface, and in doing so make conversion to NWB convenient for publication and sharing.

## Processing and Conversion of Electrophysiology

We develop and integrate motion correction algorithms alongside the spike sorting algorithms in SpikeInterface, then ingest SpikeGLX, SpikeGadgets, and Neuralynx data into the same pipeline. The pipeline demonstrates preprocessing of extracellular recordings, running spike sorters such as Kilosort2 and Ironclust, comparison and benchmarking of their outputs, validation and curation including through Phy, visualization of recordings and sorting results, and export to NWB.

Prototyping starts from the SpikeGLX, SpikeGadgets, and Neuralynx data the lab has already collected. Time and availability permitting, the work extends to their upcoming OpenEphys setup.

## Conversion of Behavioral Task Data

We ingest high-level data from the lab's behavioral recording systems, covering events, states, and DeepLabCut output, and write it either into the same NWB file as the electrophysiology or into behavior-only files. The conversion is reachable through a tailored Python API.

## Interactive Visualizations

We create interactive visualizations of NWB data that combine behavior with the neural response, such as PSTH and place field analyses. These validate that the files converted correctly, give lab members a quick way to run simple analyses, and serve as example code for working with NWB data.
