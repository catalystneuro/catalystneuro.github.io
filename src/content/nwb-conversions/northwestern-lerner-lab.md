---
lab: "Talia Lerner"
institution: "Northwestern University"
description: "Developed NWB conversion tools for the Lerner lab's neuroscience datasets studying dopamine circuits and compulsive behavior. The conversion pipeline handles multi-modal data including fiber photometry recordings from striatal regions, optogenetic manipulations, and behavioral measurements during reward learning tasks."
tags: ["calcium imaging", "behavioral tracking"]
github: "https://github.com/catalystneuro/lerner-lab-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/000971"
    name: "000971: Dopamine signaling and compulsive behavior in striatum"
date: "2024-01"
funded_project: "Aligning Science Across Parkinson's"
species: Mouse
---

The Lerner lab published "Dopamine signaling in the dorsomedial striatum promotes compulsive behavior" in Current Biology. That work represents a typical experimental structure for the lab, combining optical imaging with operant behavior and optogenetic stimulation. Our goals are to convert this data to NWB and publish it to the DANDI Archive on the lab's behalf, then adapt the conversion pipeline to ongoing experiments in the ASAP project.

## Conversion of the Released Dataset

We wrote an open-source Python package to convert the data behind the 2022 paper into NWB. The conversion covers fiber photometry, optogenetics, operant behavior, and experimental metadata. Additional components were developed as the project progressed, to stay compatible with the other varieties of experiment the lab performs.

## Publication on DANDI

The converted dataset was published on the DANDI Archive, following the archive's current best practices.

## Adapting the Pipeline to Ongoing Experiments

The lab has ongoing experiments with preliminary data, which are converted with the pipeline from the first aim, adapted to the idiosyncratic features of the new data.

## Software Integration with NWB

The Lerner lab develops GuPPy, an open-source Python toolbox for analyzing fiber photometry data. We assist with integrating that tool with NWB, covering both import and export.
