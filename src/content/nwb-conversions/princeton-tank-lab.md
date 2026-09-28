---
lab: "David Tank"
institution: "Princeton University"
description: "Developed NWB conversion tools for the Tank lab's behavioral and electrophysiology datasets. Created a custom NWB extension (ndx-tank-metadata) for storing experiment-specific metadata including maze configurations and rig parameters. The conversion pipeline integrates Neuropixels recordings with VirMen behavioral data, including detailed trial structure, behavioral metrics, and synchronized TTL events. The tools support extensive metadata handling and include specialized visualization widgets for behavioral analysis."
tags: ["spatial navigation", "electrophysiology", "behavioral tracking", "decision-making"]
github: "https://github.com/catalystneuro/tank-lab-to-nwb"
date: "2020-10"
funded_project: "SCGB NWB Adoption"
species: Mouse
---

The Tank lab at Princeton University records neural activity during the towers task, which runs in virtual mazes built with ViRMEn. When the lab began collecting Neuropixels data, our goal in this Simons Collaboration on the Global Brain project was to help them adopt a modern processing pipeline for electrophysiology and to convert the recordings and task data to NWB.

## Processing of Electrophysiology

We wrote a SpikeInterface notebook for the lab's SpikeGLX Neuropixels recordings. It loaded the AP and LFP streams and the TTL signals, synchronized the recording with the task, and then walked through preprocessing, running several spike sorters such as Kilosort2, Ironclust, and SpyKING CIRCUS, computing waveforms and quality metrics, curation in Phy, comparing sorters to build an ensemble, automatic curation, and writing the sorted spikes to NWB.

## Conversion of Task Data

The converter, built on nwb-conversion-tools, combined the SpikeGLX recording and LFP interfaces with a custom interface for the ViRMEn behavior files. For synchronization, the first TTL pulse recorded on the NIDQ board marked the start of the task, and the electrophysiology was trimmed to begin there. The ViRMEn interface wrote position, view angle, velocity, and collisions as time series, an epoch for each maze block, and a trials table with the choice, trial type, and the onset, offset, and position of left and right cues. Rig configuration and maze parameters were stored with a custom extension, ndx-tank-metadata.

## Interactive Visualizations

We added custom widgets for NWB Widgets, including a place field widget adapted to the towers task and a trace viewer for the behavioral time series, with a notebook that displays a converted file.
