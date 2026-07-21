---
lab: Shantanu Jadhav
institution: "Brandeis University"
description: Converted behavior and electrophysiology data from multiple projects, including integration with Spyglass as part of a Simons Foundation SFARI ARC project. The first dataset includes behavioral tracking, video recordings, spike sorting, and LFP recordings from experiments studying neural mechanisms of learning and memory. The second dataset focuses on pro-social behaviors in wild-type and Fmr1-/y rat pairs performing cooperative tasks on W mazes to obtain joint rewards, aiming to investigate the neural mechanisms underlying social interaction deficits associated with autism spectrum disorders.
github: https://github.com/catalystneuro/jadhav-lab-to-nwb
dandi:
  - url: "https://dandiarchive.org/dandiset/001343"
    name: "001343: Subiculum and CA1 coordination in rats during learning of a novel complex navigational task"
  - url: "https://dandiarchive.org/dandiset/001471"
    name: "001471: Social Cooperative Learning Deficits in a Rat Model of Fragile X Syndrome"
date: "2024-10"
tags:
  - electrophysiology
  - behavioral tracking
  - video
  - autism
funded_project: SFARI ARC Spyglass
species: Rat
---

The Jadhav lab has two projects funded by the SFARI Autism Rat Models Consortium that they would like converted to NWB. Both consist primarily of SpikeGadgets electrophysiology combined with behavioral video and DeepLabCut pose estimation. The lab has previous experience converting datasets to NWB after the fact, and wanted assistance making sure the converted data is compatible with Spyglass and follows the relevant best practices.

## Conversion Pipelines

We are writing an open-source Python package to convert each data stream from both projects into NWB, shared in the public repository [jadhav-lab-to-nwb](https://github.com/catalystneuro/jadhav-lab-to-nwb). The interfaces cover extracellular electrophysiology from SpikeGadgets, behavioral video, and pose estimation from DeepLabCut. Where appropriate, interfaces are adapted from NeuroConv or from the lab's own JLab-Analysis-Suite. Further components are developed as the project progresses, to stay compatible with the other varieties of experiment the lab performs.

Both projects include multi-subject data, so we are also developing a way to represent that in NWB and to carry it into the Spyglass pipeline.

## Spyglass Compatibility

The conversion pipelines are adapted as necessary to comply with Spyglass-specific requirements for NWB files, so that analysis stays reliable and reproducible. We are working with the Flatiron RSE team to integrate these files as source data in a Spyglass pipeline.

## Publication on DANDI

Example data from each project is uploaded to DANDI in embargo mode, keeping it private until the embargo is lifted. Dandisets are annotated using DANDI best practices, and released from embargo when the corresponding papers are published.
