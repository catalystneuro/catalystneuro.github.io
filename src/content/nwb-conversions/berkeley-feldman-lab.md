---
lab: Dan Feldman
institution: "University of California, Berkeley"
description: Developed NWB conversion tools for the Feldman lab's neurophysiology datasets studying sensory processing in the somatosensory system. The conversion pipeline handles complex data structures from electrophysiological recordings and behavioral measurements, with specialized interfaces for processing neural activity during sensory stimulation tasks.
tags:
  - electrophysiology
github: https://github.com/catalystneuro/feldman-lab-to-nwb
date: "2021-03"
funded_project: ""
species: Mouse
---

The Feldman lab at UC Berkeley studies tactile coding in mouse somatosensory cortex. For this project the lab recorded with Neuropixels probes through SpikeGLX while delivering piezo stimuli in trials, with trial and stimulus parameters logged to CSV files. Our goal was to convert these recordings to NWB and to build processing tools around the NWB files.

## Conversion of Electrophysiology and Trials

We built the conversion on nwb-conversion-tools, combining its SpikeGLX recording and LFP interfaces with a custom interface for the lab's trial data. Each session is split into segments, each with header, stimulus, and trial files, and the stimulus layout of a segment determines which fields those files contain. The custom interface reads all segments and writes a single trials table that records, for each trial, the stimulus elements delivered and their times, amplitudes, shapes, durations, and go/no-go assignments.

## Synchronization

Two channels on the SpikeGLX NIDQ board carried the trial structure: a signal marking when a trial is in progress, and an analog message at the start of each trial encoding the trial, stimulus, and segment numbers as hexadecimal digits in 10 ms voltage steps. We decoded these signals to obtain trial times, and when a recording did not begin at the first trial, we trimmed it to match.

## Processing Pipelines

We wrote a SpikeInterface notebook that preprocesses the recording, runs spike sorting, computes quality metrics, and writes the sorted units to the same NWB file. A faster pipeline for short recordings detects spikes on each channel, writes them to NWB with trial information decoded from the NIDQ file alone, and displays the result with custom NWB Widgets views that pair PSTHs and tuning curves with a clickable map of electrode positions. A utility also exports the NWB contents to the lab's existing SPIKES.mat format.
