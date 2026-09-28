---
lab: "Andrew Leifer"
institution: "Princeton University"
description: "Developed NWB conversion tools for the Leifer lab's C. elegans neural imaging datasets. The conversion pipeline handles complex whole-brain calcium imaging data combined with optogenetic stimulation, supporting systematic mapping of neural signal propagation across thousands of neuron pairs in the worm nervous system."
tags: ["calcium imaging", "optogenetics"]
github: "https://github.com/catalystneuro/leifer_lab_to_nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/001075"
    name: "001075: Neural signal propagation atlas of Caenorhabditis elegans"
date: "2024-03"
funded_project: "SCPAB NWB Adoption"
species: C. elegans
---

The Leifer lab at Princeton University measured how signals propagate between pairs of neurons in the head of the nematode C. elegans, by activating single neurons optogenetically while imaging calcium activity across the whole brain. This work was published as Randi et al. (Nature, 2023). We converted the data behind the paper to NWB and published it on the DANDI Archive.

## Conversion of Imaging and Optogenetics

We wrote an open-source Python package with a command-line tool that converts one session at a time from the lab's PumpProbe system. Custom interfaces read the raw volumetric recordings, in which the red and green channels share each camera frame, and timestamp the frames from the system's frame synchronization logs. The lab's signal extraction used box-shaped regions around each tracked neuron, and we reconstructed these as voxel masks in the segmentation. Each worm was also imaged with NeuroPAL to identify its neurons, and we converted those multicolor volumes along with the labeled segmentation. The volumetric imaging was stored with the ndx-microscopy extension, the targeted optogenetic stimulation with ndx-patterned-ogen, and subject information with the C. elegans subject type from ndx-subjects.

## Publication on DANDI

The data are published as Dandiset 001075, with 223 files from 113 worms totaling about 4.1 TB. Each worm has a file with the raw imaging, and most also have a separate file with the processed segmentation. The repository README documents how to convert new sessions and upload them to the Dandiset.
