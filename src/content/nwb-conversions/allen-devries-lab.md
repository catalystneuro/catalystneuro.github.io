---
lab: "Saskia de Vries"
institution: "Allen Institute"
description: "Developed NWB conversion tools for large-scale two-photon calcium imaging datasets from the Allen Brain Observatory. The project includes conversion of multi-layer recordings from different cell types in mouse visual cortex, handling complex data including cellular responses, running behavior, and visual stimulation parameters across multiple brain areas."
tags: ["calcium imaging", "two-photon microscopy", "behavioral tracking", "visual processing"]
github: "https://github.com/catalystneuro/visual-coding-to-nwb-v2"
dandi:
  - url: "https://dandiarchive.org/dandiset/000728"
    name: "000728: Allen Institute - Visual Coding - Optical Physiology"
date: "2023-10"
funded_project: ""
species: Mouse
---

The Allen Brain Observatory Visual Coding optical physiology dataset surveys visually evoked activity in the mouse with two-photon calcium imaging of GCaMP6-expressing neurons across cortical layers, visual areas, and Cre lines. The Allen Institute originally released these data as NWB files written in the first version of the format, which DANDI does not accept. Our goal was to convert every session to current NWB and publish the full dataset on the DANDI Archive.

## Conversion of Imaging and Behavior

We built a NeuroConv converter with custom interfaces that read the original files directly. The processed imaging interface carries over the segmented ROIs with their pixel masks and cross-session cell IDs, a maximum intensity projection, the corrected, neuropil, and demixed fluorescence traces, dF/F, and ROI contamination ratios. Where the AllenSDK provides dF/F events, which the original files lack, we added them as a separate series. Other interfaces handle running speed from the running disk encoder, pupil location and size from eye tracking, and the raw two-photon movies from separate HDF5 files, written to NWB in chunks.

## Conversion of Visual Stimuli

Each stimulus type has its own interface. Drifting gratings, static gratings, and spontaneous activity periods are stored as interval tables with their stimulus parameters, and natural scenes, natural movies, and locally sparse noise are stored as image templates with an index series of presentation times. The epoch group in the original files is generally empty, so we generated epoch tables through the AllenSDK and added them.

## Publication on DANDI

Sessions were processed in parallel, each one downloaded from the Allen Institute's public S3 bucket, converted, uploaded to DANDI, and then deleted locally. The data are published as Dandiset 000728, with 3,036 NWB files from 271 mice totaling about 62 TB, and the Dandiset links to an example notebook.
