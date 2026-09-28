---
lab: "Carlos Brody"
institution: "Princeton University"
description: "Developed spike sorting pipelines and NWB conversion tools for the Brody lab's rat electrophysiology. SpikeInterface notebooks cover SpikeGLX Neuropixels, SpikeGadgets wireless tetrode, and Neuralynx tetrode recordings, and three converters combine these recordings with the lab's trial data and sorted units, including sessions from the Poisson clicks task."
tags: ["electrophysiology", "behavioral tracking", "decision-making"]
github: "https://github.com/catalystneuro/brody-lab-to-nwb"
date: "2021-03"
funded_project: "SCGB NWB Adoption"
species: Rat
---

The Brody lab at Princeton University records from rats with Neuropixels probes through SpikeGLX, wireless tetrodes through SpikeGadgets, and tetrodes through Neuralynx. As part of the Simons Collaboration on the Global Brain data standardization effort, our goals were to bring these recordings into a common spike sorting pipeline in SpikeInterface and to make conversion to NWB straightforward for publication and sharing.

## Processing of Electrophysiology

We wrote a SpikeInterface notebook for each acquisition system. Each one walked through filtering and common referencing, running several spike sorters such as Kilosort2, Ironclust, and SpyKING CIRCUS, computing waveforms, templates, and quality metrics, exporting to Phy for manual curation, comparing sorters to build an ensemble, applying automatic curation thresholds, and writing the sorted spikes to NWB. The SpikeGadgets notebook added a grid search over sorter parameters, and a later notebook updated the pipeline for Neuropixels 2.0 recordings with a newer SpikeInterface release, including plots of drift over time. We also added probe files for the lab's 32-, 64-, and 128-channel tetrode configurations.

## Conversion of Behavioral Task Data

We wrote three converters with nwb-conversion-tools. For chronic Neuropixels sessions from the Poisson clicks task, the SpikeGLX raw and LFP interfaces were combined with a custom interface for the processed trial data. For Neuralynx tetrode sessions, custom interfaces read trials and sorted units from the lab's Msorted MATLAB files, adding columns for pharmacological and laser manipulations when a session had them. For wireless tetrode sessions, the SpikeGadgets recording interface was combined with custom interfaces for the trial data in protocol_info files and for units curated in Phy, with their single- or multi-unit labels and mean waveforms.
