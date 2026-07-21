---
lab: Jim Surmeier
institution: "Northwestern University"
description: NWB conversion pipeline for Surmeier lab's multimodal ex-vivo brain slice recordings from a mouse model of Parkinson's disease and levodopa-induced dyskinesia. The dataset includes patch-clamp electrophysiology (somatic and dendritic excitability), two-photon calcium imaging (standard imaging and line scans) with simultaneous electrophysiology, acetylcholine biosensor recordings (GRABACh3.0), confocal microscopy for spine density analysis, optogenetic stimulation, behavioral scoring (AIM scores and contralateral rotations), and video recordings. Data encompasses direct and indirect pathway spiny projection neurons (dSPNs and iSPNs) from the dorsolateral striatum in 6-OHDA lesioned mice with chronic levodopa treatment. All protocols are linked to protocols.io documentation.
tags:
  - electrophysiology
  - calcium imaging
  - optogenetics
  - behavioral tracking
  - video
  - two-photon microscopy
  - Parkinson's disease
github: https://github.com/catalystneuro/surmeier-lab-to-nwb
dandi:
  - url: "https://dandiarchive.org/dandiset/001538"
    name: "001538: State-dependent modulation of spiny projection neurons controls levodopa-induced dyskinesia in a mouse model of Parkinson's disease"
date: "2025-01"
species: "Mouse"
funded_project: "Aligning Science Across Parkinson's"
---

The Surmeier lab has collected an extensive dataset combining electrophysiology, optical imaging, and behavioral data from ex-vivo brain slice experiments with optogenetics and pharmacological interventions. Our goals are to package this data at each stage of processing in the NWB format so that it can be shared within the lab and published on the DANDI Archive.

## Conversion of Data Streams

We built interfaces covering ABF recordings, Bruker optical sensor recordings with their metadata, electrophysiology acquired on the Bruker system, manual segmentation data in the lab's own format, behavioral annotations from a custom lab format, behavioral video, and electrical stimulation signals and metadata.

Each conversion uses compression for efficient storage and chunking strategies tuned for cloud access. Documentation covers installation and usage, including scripts for the lab's several protocols: ex-vivo brain slices with optogenetics, pairing ABF recordings with optogenetic stimulus information; electrophysiology combined with optical imaging, pairing Bruker optical sensor data with electrical recordings; two-photon laser scanning microscopy with electrical stimulation, processing imaging data alongside stimulation events; and behavioral pharmacology, converting videos, tracking data, and drug administration metadata. Each protocol's conversion handles time alignment across its data streams.

## Publication on DANDI

We created a pipeline that uploads the specified list of converted sessions to the DANDI Archive automatically, and a Dandiset annotated according to DANDI best practices. The Dandiset links to the lab's protocols on protocols.io and incorporates the relevant manuscript data and metadata.

## Demonstrating NWB Usage

We created Jupyter notebooks demonstrating how to read the converted files and access each data stream. These notebooks were submitted to the [DANDI example-notebooks repository](https://github.com/dandi/example-notebooks).
