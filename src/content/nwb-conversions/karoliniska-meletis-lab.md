---
lab: "Konstantinos Meletis"
institution: "Karolinska Institutet"
description: "Developed NWB conversion tools for the Meletis lab's multi-modal datasets studying dopaminergic circuits. The conversion pipeline handles fiber photometry data recording calcium transients from DAT+ and Anxa1+ terminals in the striatum, as well as dopamine release using dLight1.3. The tools also process behavioral data from multiple tasks including Water Consumption, Open Field Tests with DeepLabCut pose estimation and VAME behavioral classification, Arrow Maze Choice Tasks, and Forelimb Reaching Tasks."
tags:
  - behavioral tracking
  - video
  - calcium imaging
  - fiber photometry
  - pose estimation
  - Parkinson's disease
github: "https://github.com/catalystneuro/meletis-lab-to-nwb"
date: "2025-05"
funded_project: "Aligning Science Across Parkinson's"
species: Mouse
---

The Meletis lab has collected fiber photometry and behavioral data in mice across several different task setups, as part of the ASAP initiative. Our goal is to package this dataset in the NWB format and publish it to the DANDI Archive.

## Conversion of Data to NWB

We are developing an open-source Python package to convert each of the lab's protocols to NWB:

- **Water consumption.** Mice recorded consuming water from a spout at 60 fps in lateral view. Fiber photometry and video.
- **Optogenetic self-stimulation.** Mice freely nosepoked to trigger bilateral SNc laser stimulation, with nosepoke events recorded by beam break detection. Event times and optogenetics, with no video.
- **Fixed ratio and progressive ratio.** Water-restricted mice nosepoking for water rewards under a progressively increasing ratio schedule. Event times.
- **Open field.** Mice exploring a 40x40 cm arena, recorded from below at 30 fps across 195 videos. DeepLabCut provides pose estimation of key body points for locomotion and postural analysis, and VAME provides unsupervised classification of behavioral motifs. Fiber photometry, video, DeepLabCut, and VAME.
- **Arrow maze choice task.** A T-maze in which mice learned to associate a corridor with a water reward, 28 mice across 4 sessions each. Video and event times.
- **Forelimb reaching.** Mice retrieving water from an incrementally distanced spout, recorded at 60 fps with events extracted using Kinovea, 18 mice across 4 sessions each. Video and event times.

Documentation covers installing and using the conversion software. The pipeline uses compression and chunking so the files store efficiently and can be read directly in cloud environments, and all data is converted and annotated in accordance with NWB best practices. Where inter-trial interval timing is available, recordings are reconstructed as a contiguous representation, which makes the data more reusable and more compatible with downstream analysis tools.

## Publication on DANDI

We created a pipeline that uploads the specified list of converted sessions to the DANDI Archive automatically, along with a Dandiset annotated according to DANDI best practices.

## Demonstrating NWB Usage

We create Jupyter notebooks demonstrating how to read the converted files, access each data stream, and generate example visualizations. These notebooks are submitted to the [DANDI example-notebooks repository](https://github.com/dandi/example-notebooks).
