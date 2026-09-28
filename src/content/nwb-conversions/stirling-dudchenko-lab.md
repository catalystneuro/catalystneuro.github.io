---
lab: Paul Dudchenko
institution: "University of Stirling"
description: Developed NWB conversion pipelines and analysis workflows for the Dudchenko lab's rodent navigation experiments studying age-dependent alterations in the head-direction signal in Fmr1-/y rats, a model of Fragile X Syndrome, as part of a Simons Foundation SFARI ARC project. The conversion standardized OpenEphys extracellular electrophysiology, spiking units, Bonsai behavioral tracking, sleep-state classification from processed LFP, video, and histology from juvenile and adult rats. The pipeline conformed the data to NWB best practices and made it fully Spyglass compatible, leveraged NeuroConv's backend configuration for state-of-the-art chunking and compression, and published the full dataset to the DANDI Archive along with example notebooks and documentation for the Autism Rat Models Consortium and broader neuroscience community.
github:
  - https://github.com/Wood-Dudchenko-lab/woodcode
  - https://github.com/Wood-Dudchenko-lab/woodsort
  - https://github.com/catalystneuro/woodcode
dandi:
  - url: "https://dandiarchive.org/dandiset/001699"
    name: "001699: Altered developmental profile of the head-direction signal in a rat model of fragile X syndrome"
date: "2025-10"
tags:
  - electrophysiology
  - behavioral tracking
  - spatial navigation
  - video
  - autism
  - sleep
funded_project: SFARI ARC Spyglass
species: Rat
---

The Wood and Dudchenko lab studies the head-direction system in Fmr1-/y rats, a model of Fragile X syndrome, as part of the SFARI Autism Rat Models Consortium. The dataset for Moore et al. contains silicon probe recordings from the postsubiculum of juvenile and adult wild-type and Fmr1-/y rats during open-field foraging and sleep. The lab already had NWB conversion code in its woodcode package, and our goal was to make the files Spyglass compatible, follow NWB best practices, and publish the full dataset on the DANDI Archive.

## Conversion of Data Streams

We extended woodcode so that each file holds raw Open Ephys recordings from Cambridge Neurotech probes, LFP, spike-sorted units with mean waveforms, position and head direction with the raw Bonsai tracking, behavioral video, sleep scoring with a pseudo-EMG signal, and histology images. Probe geometry was stored with ndx-franklab-novela, and files were written with NeuroConv's chunking and compression configuration. Lookup tables record sessions that depart from the standard layout.

## Synchronization

Adult sessions used a camera that sent one TTL pulse per frame to the Open Ephys board, so frames were matched to pulses. In juvenile sessions, an Arduino sent a random pulse sequence to both the acquisition board and an LED in view of the camera. We matched the intervals between LED flashes to the TTL events and interpolated the frames in between.

## Spyglass Compatibility

We documented the requirements Spyglass places on NWB files and wrote the conversion to meet them. Separate scripts insert each file into a Spyglass database, with custom tables for pseudo-EMG and histology. For the lab's woodsort repository we wrote notebooks that run spike sorting and curation inside Spyglass.

## Publication on DANDI

The data are published as Dandiset 001699, with 98 NWB files from 24 rats totaling about 825 GB.
