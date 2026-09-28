---
lab: "Marshall Hussain Shuler"
institution: "Johns Hopkins University"
description: "Developed NWB conversion tools for the Shuler lab's electrophysiology and behavioral datasets. The conversion pipeline integrates SpikeGLX recordings with behavioral event data, including specialized tools for data synchronization and cloud-based spike sorting workflows. The tools support comprehensive metadata handling through standardized JSON and CSV formats."
tags: ["behavioral tracking", "electrophysiology"]
github: "https://github.com/catalystneuro/shuler-lab-to-nwb"
date: "2022-11"
funded_project: ""
species: "Mouse"
---

The Shuler lab at Johns Hopkins University records from mice with Neuropixels probes while they perform a behavioral task involving LEDs, ports, licks, and rewards. We worked with the lab on a pipeline that converts each session to NWB, and on infrastructure for running spike sorting in the cloud.

## Conversion of Electrophysiology and Behavior

We wrote an open-source Python package that uses NeuroConv's SpikeGLX interface for the raw Neuropixels recording and reads subject information from a small JSON file for each animal. The lab's task software writes a timestamped log of events, which the lab exports to CSV. From that log we wrote the LED, lick, reward, and other task events as behavioral event series, and built a trials table recording the task, phase, and port of each trial. An example notebook runs the conversion and opens the result in NWB Widgets.

## Synchronization

Camera trigger pulses appear both in the task log and on the Neuropixels sync channel. We aligned every behavioral event to the SpikeGLX clock by interpolating between the matched pulse times, and dropped events that fell outside the recording.

## Spike Sorting in the Cloud

We also set up spike sorting on AWS Batch. A Docker image bundles SpikeInterface with compiled Kilosort 2.5 and Kilosort 3, reads a recording either from SpikeGLX files in S3 or from an NWB file on the DANDI Archive, runs one or more sorters on a GPU instance, and writes the results back to S3, with a comparison across sorters when more than one is run. The repository documents the AWS configuration and a cost estimate: downloading, processing, and sorting 78 minutes of Neuropixels data cost about $1.44.
