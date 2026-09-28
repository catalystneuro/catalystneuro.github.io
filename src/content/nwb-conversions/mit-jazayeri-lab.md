---
lab: "Mehrdad Jazayeri"
institution: "Massachusetts Institute of Technology"
description: "Developed NWB conversion tools for the Jazayeri lab's primate neurophysiology datasets studying working memory and mental navigation. The conversion pipeline handles Neuropixels and V-Probe recordings from frontal and entorhinal cortex, aligned to eye tracking, joystick, and task events."
tags: ["electrophysiology", "behavioral tracking", "spatial navigation"]
github: "https://github.com/catalystneuro/jazayeri-lab-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/000130"
    name: "000130: DMFC activity during time interval reproduction"
  - url: "https://dandiarchive.org/dandiset/000897"
    name: "000897: Entorhinal cortex activity during mental navigation"
  - url: "https://dandiarchive.org/dandiset/000620"
    name: "000620: Multi-object working memory in macaque frontal cortex"
date: "2023-07"
funded_project: "SCGB NWB Adoption"
species: Macaque
---

The Jazayeri lab at MIT records neural activity in rhesus macaques performing cognitive tasks. We worked with the lab on two of these experiments: a multi-object working memory task recorded by Nicholas Watters and John Gabel, and a mental navigation task recorded by Sujaya Neupane in the Jazayeri and Fiete labs. Our goal was to convert each session to NWB so the data could be published on the DANDI Archive.

## Conversion of Electrophysiology

We wrote an open-source Python package built on NeuroConv, with a separate conversion for each experiment. Both handle Neuropixels recordings from SpikeGLX and Plexon V-Probe recordings stored as raw binary files, for which we wrote a custom interface that generates the probe geometry. Spike sorting results were read from Kilosort output, and sorted spikes that fell past the end of a recording were trimmed. For the working memory task, we aligned the SpikeGLX and Open Ephys clocks to the MWorks task clock using linear transforms fit to recorded sync pulses.

## Conversion of Behavior

For the working memory task, we wrote interfaces for eye position, pupil size, the trials table, and a per-frame table of display events, and used the ndx-events extension for reward and audio events. For the mental navigation task, we added eye and joystick position and a trials table read from the lab's MATLAB files. Each session was written as two files, one with the raw recordings and one with the behavior and sorted units.

## Publication on DANDI

The mental navigation data are in Dandiset 000897, which holds 30 files from 15 sessions across two monkeys, about 362 GB in total. The working memory data were published as Dandiset 000620, 142 files from two monkeys totaling about 5.5 TB.
