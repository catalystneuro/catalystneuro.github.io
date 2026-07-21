---
lab: "Daniel Dombeck"
institution: "Northwestern University"
description: "Developed NWB conversion tools for the Dombeck lab's fiber photometry datasets studying dopamine neuron subtypes. The conversion pipeline handles multi-modal data including GCaMP6f calcium signals, behavioral measurements, and genetic subtype information from the substantia nigra and striatum during reward and movement tasks."
tags: ["behavioral tracking", "calcium imaging", "motor control"]
github: "https://github.com/catalystneuro/dombeck-lab-to-nwb"
dandi:
    - url: https://dandiarchive.org/dandiset/001038
      name: "001038: Unique functional responses differentially map onto genetic subtypes of dopamine neurons"
date: "2024-02"
funded_project: "Aligning Science Across Parkinson's"
species: Mouse
---

The Dombeck lab has collected multi-channel fiber photometry data from mice receiving optogenetic stimulation while running on a treadmill, as part of the ASAP initiative. Our goals are to package this data at each stage of processing in the NWB format so that it can be shared within the lab and published on the DANDI Archive.

## Conversion of Photometry, Behavior, and Optogenetic Stimuli

We wrote an open-source Python package to ingest data from the lab's acquisition and processing systems into NWB. The conversion covers raw multi-channel fiber photometry from a homebuilt Digidata acquisition system, along with the [MATLAB releases of that data on Zenodo](https://zenodo.org/records/7871634); preprocessed photometry including bleaching correction and DF/F calculation, again with its [Zenodo release](https://zenodo.org/records/7871982); locomotion speed; optogenetic stimuli; raw video; DeepLabCut pose estimation; mouse metadata such as age, strain, and time since injection; and neurophysiology synchronization signals.

The conversion also covers the lab's imaging work: raw multichannel two-photon data in ScanImage format, preprocessed imaging covering motion correction and both manual and Suite2p segmentation, treadmill velocity including the signal from the friction brake, and lick tube signals giving reward and licking times.

## Publication on DANDI

We created a pipeline that uploads the specified list of converted sessions to the DANDI Archive in embargo mode. The embargo runs until the preprint is formally accepted by a reviewing journal, at which point the dataset becomes publicly available.

## Demonstrating NWB Usage

We created a Jupyter notebook demonstrating how to read the converted files and access each data stream.
