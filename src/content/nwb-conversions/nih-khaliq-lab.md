---
lab: Zayd Khaliq
institution: "National Institutes of Health"
description: Developing NWB conversion tools for the Khaliq lab's ex-vivo primate research. The pipeline standardizes patch clamp electrophysiology recordings in ABF format, calcium imaging data from Bruker systems (TIFF files), synchronization TTL pulses, and pharmacological data. These tools enable comprehensive analysis of hundreds of individual cells and facilitate data sharing through the DANDI Archive, with future plans for interactive Neurosift visualizations.
tags: 
  - electrophysiology
  - calcium imaging
  - patch clamp
github: https://github.com/catalystneuro/khaliq-lab-to-nwb
date: "2024-12"
funded_project: "Aligning Science Across Parkinson's"
species: "Macaque"
---

The Khaliq lab has collected ex-vivo primate data combining patch clamp electrophysiology with calcium imaging, as part of the ASAP initiative. Our goals are to package this data at each stage of processing in the NWB format so that it can be shared within the lab and published on the DANDI Archive.

## Conversion of Data Streams

We wrote an open-source Python package to ingest data from the lab's acquisition systems into NWB. The package covers patch clamp recordings in ABF format, with hundreds of cells recorded one per session; calcium imaging acquired on a Bruker system and stored as TIFF files, covering tens of cells; TTL pulses from the Bruker system used for synchronization; pharmacology records; and subject metadata. The code is publicly available in a GitHub repository that also documents how to install the package and run the conversion scripts.

## Publication on DANDI

We created a pipeline that uploads the specified list of converted sessions to the DANDI Archive automatically, and a Dandiset annotated according to DANDI best practices. The Dandiset is embargoed, so access stays private until the embargo is lifted.

## Demonstrating NWB Usage

We created Jupyter notebooks demonstrating how to read the converted files and access each data stream. These notebooks were submitted to the [DANDI example-notebooks repository](https://github.com/dandi/example-notebooks). As time allowed, we also worked on interactive visualizations in Neurosift so that patch clamp NWB data on DANDI can be explored through a dashboard rather than downloaded first.
