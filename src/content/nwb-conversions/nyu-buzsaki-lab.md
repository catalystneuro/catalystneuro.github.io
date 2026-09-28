---
lab: "György Buzsáki"
institution: "New York University"
description: "Developed NWB conversion tools for the Buzsáki lab's extensive neurophysiology datasets, handling terabyte-scale data including Neuroscope recordings, LFP signals, and behavioral measurements. The conversion pipeline features specialized interfaces for various data types and supports parallel processing for large-scale conversions, with datasets publicly available through DANDI."
tags: ["electrophysiology", "behavioral tracking", "spatial navigation", "optogenetics"]
github: "https://github.com/catalystneuro/buzsaki-lab-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/000003"
    name: "000003: Physiological Properties and Behavioral Correlates of Hippocampal Granule Cells and Mossy Cells"
  - url: "https://dandiarchive.org/dandiset/000041"
    name: "000041: Network Homeostasis and State Dynamics of Neocortical Sleep"
  - url: "https://dandiarchive.org/dandiset/000044"
    name: "000044: Diversity in neural firing dynamics supports both rigid and learned hippocampal sequences"
  - url: "https://dandiarchive.org/dandiset/000059"
    name: "000059: Cooling of Medial Septum Reveals Theta Phase Lag Coordination of Hippocampal Cell Assemblies"
  - url: "https://dandiarchive.org/dandiset/000166"
    name: "000166: Layer-Specific Physiological Features and Interlaminar Interactions in the Primary Visual Cortex of the Mouse"
  - url: "https://dandiarchive.org/dandiset/000213"
    name: "000213: Transformation of a Spatial Map across the Hippocampal-Lateral Septal Circuit"
  - url: "https://dandiarchive.org/dandiset/000233"
    name: "000233: A metabolic function of the hippocampal sharp wave-ripple"
  - url: "https://dandiarchive.org/dandiset/000552"
    name: "000552: Preconfigured dynamics in the hippocampus are guided by embryonic birthdate and rate of neurogenesis"
  - url: "https://dandiarchive.org/dandiset/000568"
    name: "000568: Probing subthreshold dynamics of hippocampal neurons by pulsed optogenetics"
date: "2019-11"
funded_project: "Ripple U19"
species: ["Rat", "Mouse"]
---

The Buzsáki lab at New York University records large-scale extracellular electrophysiology from the hippocampus and neocortex of rats and mice, and shares the data behind many of its papers through a Globus data bank. Our goal was to convert these published datasets to NWB and publish them on the DANDI Archive.

## Conversion of Electrophysiology

We wrote an open-source Python package with a separate converter for each dataset, built first on NWB Conversion Tools and later on its successor, NeuroConv. Raw and LFP recordings, acquired with Intan systems and stored in the Neuroscope format, were converted with the Neuroscope interfaces, and spike sorting results were read from Neuroscope, Phy, and CellExplorer files. Most of the work went into custom interfaces for data that each project stored differently in MATLAB files, including position tracking, trials and epochs, sleep states, and ripple events.

Some projects needed more. The Tingley metabolic dataset adds accelerometer signals and continuous glucose recordings from a Medtronic iPro2 sensor, the Valero dataset adds optogenetic stimulation, and reward events in two datasets use the ndx-events extension. Because a single dataset can reach several terabytes, we developed each conversion on stubbed sessions and then ran the full conversion in parallel on a remote server.

## Publication on DANDI

The converted data is published in nine Dandisets covering 105 subjects and 917 NWB files, about 23 TB in total. The largest, Dandiset 000233 on the metabolic function of the hippocampal sharp wave-ripple, holds about 12 TB from 25 rats. We later revisited Dandiset 000059 to rechunk and repack its files.

## Demonstrating NWB Usage

For several datasets we wrote Jupyter notebooks that document the source files and display the converted NWB files with NWB Widgets.
