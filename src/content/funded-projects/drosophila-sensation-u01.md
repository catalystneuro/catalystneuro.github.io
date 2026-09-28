---
title: "Drosophila Sensation U01"
funder: "National Institutes of Health"
status: "completed"
startDate: "2024-08-01"
description: "NWB conversions for five fly labs on a BRAIN Initiative U01 studying multisensory flight control in Drosophila"
image: "/images/sponsors/nih_logo.png"
github:
  - "https://github.com/catalystneuro/cohen-u01-to-nwb"
---

The Drosophila Sensation U01 (U01NS131438) is a BRAIN Initiative exploratory team-research award from the National Institute of Neurological Disorders and Stroke to Cornell University, with Itai Cohen as contact principal investigator. Its project period began in May 2023 and runs through April 2027. The team studies how flies integrate visual, wind, and gyroscopic information to steer in flight, combining two-photon calcium imaging, muscle imaging, whole-cell patch clamp, high-speed behavioral analysis, and optogenetics with control-theoretic models. From August 2024 we worked with five fly labs on the project to convert their data to NWB.

We wrote the conversions in one shared repository, with custom interfaces for each lab's acquisition files. The data span two-photon imaging from Thorlabs and ScanImage microscopes, whole-cell patch clamp recordings with seal tests, high-speed video with DeepLabCut pose estimation, wingbeat signals recorded alongside visual, airflow, and optogenetic stimuli, and confocal images. Several labs recorded camera and imaging frame triggers on a shared acquisition clock, and we used these to place video, imaging, and behavior on one timeline. During the project we added support for Thorlabs ThorImageLS data to ROIExtractors and NeuroConv. The free-flight data behind Ludlow et al., "A multi-muscular, redundant strategy for free-flight roll stability," are published on the DANDI Archive as Dandiset 001851, with 866 NWB files from 797 flies.
