---
lab: "Alexandra Nelson"
institution: "University of California, San Francisco"
description: "Developed NWB conversion tools for the Nelson lab's behavioral neuroscience datasets. The conversion pipeline integrates multiple data streams including TDT electrophysiology recordings, Noldus behavioral tracking data, AIM scoring, and behavioral video recordings. The tools support both interactive notebook-based workflows and scriptable conversion processes, enabling efficient standardization of complex behavioral experiments."
tags: 
  - behavioral tracking
  - electrophysiology
  - Parkinson's disease
github: "https://github.com/catalystneuro/nelson-lab-to-nwb"
dandi:
  - url: https://dandiarchive.org/dandiset/001130
    name: "001130: Aberrant Striatal Activity in Parkinsonism and Levodopa-Induced Dyskinesia"
  - url: https://dandiarchive.org/dandiset/001177
    name: "001177: Abnormal Striatal Activity in a Mouse Model of Impulse Control Disorder in Parkinson's disease"
date: "2023-10"
funded_project: "Aligning Science Across Parkinson's"
species: Mouse
---

The Nelson lab has collected electrophysiological data using optogenetically labeled single-unit recordings in freely moving mice in an open field, as part of the ASAP initiative. Our goals are to package this data at each stage of processing in the NWB format so that it can be shared within the lab and published on the DANDI Archive.

## Conversion of Electrophysiology and Behavior

We wrote an open-source Python package to ingest the data the lab is collecting with the systems used in their paper ["Aberrant Striatal Activity in Parkinsonism and Levodopa-Induced Dyskinesia"](https://doi.org/10.1016/j.celrep.2018.05.059). The conversion covers single-unit activity from microwires on a 32-channel Plexon MAP system; Plexon spike sorting output; video recordings and gross behavior tracking from Noldus EthoVision; fine behavior manually scored by the experimenter as AIM scores; Arduino-controlled TTL optical stimuli; TDT fiber photometry; and the TTL synchronization pulses triggered by the video tracking software and recorded by the electrophysiology system.

## Additional Interfaces

We also created interfaces, or tested existing ones against the lab's data, for a wider set of formats the lab works with: Igor Pro ex-vivo recordings, Intan, Blackrock, Doric photometry and Miniscope files, and histology images from Nikon, Olympus, and Zeiss microscopes.

## Publication on DANDI

We created a pipeline that uploads the converted sessions relating to the paper to the DANDI Archive. On completion the dataset is published on the lab's behalf, with a minted DOI.

## Demonstrating NWB Usage

We created Jupyter notebooks demonstrating how to read the converted files and access each data stream.
