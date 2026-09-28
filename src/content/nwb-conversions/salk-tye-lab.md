---
lab: "Kay Tye"
institution: "Salk Institute"
description: "Developed NWB conversion tools for the Tye lab's valence experiments in mice, covering Open Ephys and Neuropixels electrophysiology, Miniscope calcium imaging, fiber photometry, behavioral video, and DeepLabCut and SLEAP pose estimation. The data behind the neurotensin study and the amygdalostriatal transition zone study are published on the DANDI Archive."
tags: ["behavioral tracking", "electrophysiology", "calcium imaging", "fiber photometry", "pose estimation", "video"]
github: "https://github.com/catalystneuro/tye-lab-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/001195"
    name: "001195: Separable Dorsal Raphe Dopamine Projections Mediate the Facets of Loneliness-like State"
  - url: "https://dandiarchive.org/dandiset/000689"
    name: "000689: Data supporting Neurotensin orchestrates valence assignment in the amygdala"
  - url: "https://dandiarchive.org/dandiset/001203"
    name: "001203: Data supporting \"Amygdalostriatal transition zone neurons encode sustained cue responses to guide defensive behaviors\" (Mills, et al, 2026)"
date: "2023-01"
funded_project: ""
species: Mouse
---

The Tye lab at the Salk Institute studies how the brain assigns positive or negative valence to cues. Several of the lab's projects use a Pavlovian discrimination task in which mice learn that distinct tones predict sucrose, shock, or no outcome. We first converted the data behind Li et al. (Nature, 2022), "Neurotensin orchestrates valence assignment in the amygdala," and later added conversions for recordings from the amygdalostriatal transition zone (ASt). Our goal was to publish these datasets in NWB on the DANDI Archive.

## Conversion of Electrophysiology and Behavior

We wrote an open-source Python package built on NeuroConv. For the neurotensin experiments, the converter combined Open Ephys recordings, Plexon spike sorting, and behavioral video with custom interfaces for task events read from the lab's MATLAB files, DeepLabCut pose estimation stored with ndx-pose, and confocal histology images in Olympus OIF format. A separate interface converted fiber photometry from a second cohort, stored with ndx-photometry.

For the ASt project, one converter combined Open Ephys recordings, Plexon sorting, a custom interface for the lab's curated units, SLEAP pose estimation, and video. A second handled Neuropixels recordings from SpikeGLX with Phy sorting and histology images. A third handled Miniscope calcium imaging, combining the raw Miniscope video with the lab's processed and motion-corrected movies and CNMF-E segmentation.

## Batch Conversion

Each conversion reads a spreadsheet with one row per session, listing the source files and subject metadata, and converts the sessions in parallel.

## Publication on DANDI

The neurotensin data are published as Dandiset 000689, with 85 files from 36 mice totaling about 575 GB, including electrophysiology, behavioral video, histology, and fiber photometry. The ASt electrophysiology and behavior are in Dandiset 001203, with 51 files from 25 mice totaling about 1.5 TB, which accompanies Mills et al. (Neuron, 2026).
