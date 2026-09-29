---
title: "SFARI ARC Spyglass"
funder: "Simons Foundation"
status: "active"
startDate: "2024-10-23"
description: "Standardizing autism research data into NWB and Spyglass"
image: "/images/sponsors/simons_foundation_logo.avif"
github:
  - "https://github.com/catalystneuro/neuroconv-spyglass"
---

The Simons Foundation Autism Research Initiative (SFARI) funds CatalystNeuro to standardize data from labs in its Autism Rat Models Consortium (ARC). SFARI established the consortium in 2022 to study behavior and circuits relevant to autism in rat lines carrying CRISPR/Cas9 loss-of-function mutations in high-confidence autism risk genes. Since October 2024 we have been converting ARC data to Neurodata Without Borders (NWB) and making the files compatible with Spyglass, the DataJoint-based analysis framework developed in Loren Frank's lab, working with the Flatiron Institute's research software engineers to use them as source data in Spyglass pipelines.

The project now spans nine labs in the United States, Canada, and the United Kingdom, most of them working with rat models such as Fmr1 knockout rats. The data include SpikeGadgets, Open Ephys, and Neuropixels recordings, multi-day wireless EEG, fiber photometry, Miniscope imaging, and multi-camera video with DeepLabCut, MoSeq, and DANNCE pose estimation. We write each conversion to meet the requirements Spyglass places on NWB files and collect reusable interfaces in the neuroconv-spyglass repository. The first complete dataset, on the head-direction signal in juvenile and adult Fmr1 knockout rats, is published as Dandiset 001699. We also contribute fixes upstream to Spyglass, have opened a discussion with its developers on supporting EEG, and are developing an NWB extension for sleep staging.
