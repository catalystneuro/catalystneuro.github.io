---
lab: "Marie Suver"
institution: "Vanderbilt University"
description: "Developed NWB conversion tools for the Suver lab's research on flight control and sensory integration in Drosophila. The pipeline standardizes whole-cell patch clamp recordings with seal tests, multi-camera video with DeepLabCut tracking, and tachometer, puffer, and photodiode signals from airflow and optic flow behavioral experiments."
tags: ["electrophysiology", "patch clamp", "behavioral tracking", "pose estimation", "video"]
github: "https://github.com/catalystneuro/cohen-u01-to-nwb"
date: "2024-08"
funded_project: "Drosophila Sensation U01"
species: "Drosophila"
---

The Suver lab at Vanderbilt University studies flight control and sensory integration in Drosophila using airflow and optic flow stimuli. They shared two kinds of data: whole-cell patch clamp recordings made alongside multi-camera video, and behavioral experiments that measure wingbeats with a tachometer. This work was part of a U01 project shared with four other fly labs, and our goal was a set of conversion scripts covering both.

## Conversion of Patch Clamp Recordings

Each experiment's MATLAB file holds one row per trial with membrane potential, injected current, a filtered membrane potential from the amplifier's 10x output, a puffer signal, and a tachometer signal that detects wing flapping. We stored the voltage and current as CurrentClampSeries and CurrentClampStimulusSeries in the intracellular recordings table, with the AM Systems 2400 amplifier as the device. Seal tests from before and after the experiment were added to the same table, and we computed input and access resistance from them. Videos from three views were linked as external files, and DeepLabCut tracking from the left lateral view was added through NeuroConv's DeepLabCutInterface.

## Conversion of Behavioral Experiments

The behavioral data come from three protocols. In WindySteps, airflow rises or falls in 50 cm/s steps. In SpeedyBars, optic flow is presented at a range of speeds. In Coco, wind, visual motion, or both oscillate at different frequencies. We wrote a conversion for each. Tachometer and puffer signals, plus a photodiode signal for SpeedyBars and Coco, were stored as time series, and each protocol's parameters became columns of the trials table. The scripts also accept video and DeepLabCut output when the lab has them.
