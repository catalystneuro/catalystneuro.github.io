---
lab: "Misha Ahrens"
institution: "Janelia Research Campus"
description: "Developed NWB conversion tools for the Ahrens lab's whole-brain calcium imaging data in zebrafish. The project includes conversion of complex behavioral and neural recording datasets, including studies of glia-neuron interactions and behavioral state transitions. The data pipeline handles multi-modal integration of calcium imaging, behavioral measurements, and experimental metadata."
tags: ["calcium imaging", "behavioral tracking"]
github: "https://github.com/catalystneuro/ahrens-lab-to-nwb"
dandi: "https://dandiarchive.org/dandiset/000350"
date: "2022-07"
funded_project: "SCGB NWB Adoption"
species: Zebrafish
---

The Ahrens lab at Janelia Research Campus images activity across the whole brain of larval zebrafish while they swim in virtual reality. This conversion covered the data behind Mu et al. (Cell, 2019), which showed that radial astrocytes accumulate evidence that swimming has failed to move the fish and then suppress further swimming. Our goal was to convert these datasets to NWB and publish them on the DANDI Archive.

## Conversion of Imaging Data

We wrote an open-source Python package built on NeuroConv. The lab stored each volume of the whole-brain imaging as its own HDF5 file, so we wrote a custom imaging extractor and interface that read these frame files in order. A custom segmentation interface added the segmented cells with their raw and detrended fluorescence traces. Sessions imaged with a single indicator and sessions imaged in two colors, with GCaMP6f in neurons and jRGECO1b in glia, were handled by separate converters, and the two-color converter wrote separate imaging series and segmentations for neurons and glia.

## Conversion of Behavior

Custom interfaces added the raw signals recorded alongside the imaging: swim signals from electrodes on the tail, the camera shutter TTL signal that forms the basis of the imaging timestamps, and the velocity, gain, and type of the visual stimulus. Processed behavior included filtered swim signals, swim intervals with their power, burst events stored with the ndx-events extension, a trials table marking closed-loop and open-loop periods, and intervals classified as active, passive, or transient.

## Publication on DANDI

The data are published as Dandiset 000350, with 12 NWB files from 12 fish totaling about 5.9 TB. The repository includes a notebook for browsing and streaming the files on DANDI Hub.
