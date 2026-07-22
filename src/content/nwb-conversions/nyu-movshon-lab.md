---
lab: "Tony Movshon"
institution: "New York University"
description: "Developed comprehensive NWB conversion tools for the Movshon lab's diverse electrophysiology and visual neuroscience datasets. The conversion pipeline handles multiple data formats including Blackrock, OpenEphys, and SpikeGLX recordings, with integrated spike sorting through SpikeInterface. The tools support both command-line and graphical user interface workflows, enabling efficient processing of complex visual neuroscience experiments. The project facilitates the standardization of the lab's extensive visual cortex recordings, supporting their research into neural mechanisms of visual perception and motion processing."
tags: ["visual processing", "electrophysiology", "behavioral tracking"]
github: "https://github.com/catalystneuro/movshon-lab-to-nwb"
date: "2021-01"
funded_project: "SCGB NWB Adoption"
species: Macaque
---

The Movshon lab holds electrophysiology and stimulus and behavioral data in several different forms. The goal of this project, part of the Simons Collaboration on the Global Brain data standardization effort, is to unify data formats across those technologies and help the lab standardize around modern processing pipelines for electrophysiology.

## Processing of Electrophysiology

We ingest data from SpikeGLX, OpenEphys, and Blackrock into SpikeInterface, demonstrating preprocessing of extracellular recordings, running the popular semi-automatic spike sorters such as Kilosort2 and Ironclust, post-processing of sorted datasets, comparison and benchmarking of sorter outputs, validation and curation including through Phy, visualization of recordings and sorting results, and export to NWB.

## Conversion of Stimulus Data

We ingest Expo data from a drifting gratings experiment and write it into the same NWB file, synchronized with the electrophysiology. The conversion is reachable through a web interface, a Python API, and a command line interface.

## Interactive Visualizations

We create interactive visualizations of NWB data that combine the stimuli with the neural response, such as PSTH and simple tuning analyses. These validate that the files converted correctly, give lab members a quick way to run simple analyses, and serve as example code for working with NWB data.

## Future Directions

The lab also collects behavioral and stimulus data on MWorks, which is entirely unlike Expo. Converting MWorks data to NWB and combining it with the electrophysiology is feasible on the same pattern, covering eye movements, trial stimulus parameters and responses, and flexible inputs such as levers and EEG leads.
