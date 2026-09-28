---
lab: "Michale Fee"
institution: "Massachusetts Institute of Technology"
description: "Developed NWB conversion tools for two Fee lab datasets: calcium imaging in mice from a lightweight head-mounted microscope with EXTRACT segmentation, and Neuropixels recordings from the zebra finch caudomedial nidopallium during song motif playback."
tags: ["electrophysiology", "behavioral tracking", "calcium imaging", "video"]
github: "https://github.com/catalystneuro/fee-lab-to-nwb"
date: "2022-05"
funded_project: "SCGB NWB Adoption"
species: ["Mouse", "Zebra finch"]
dandi:
    - url: https://dandiarchive.org/dandiset/000691
      name: "000691: An optical design enabling lightweight and large field-of-view head-mounted microscopes"
---

The Fee lab at MIT records neural activity in zebra finches and mice. We worked with the lab on two datasets: calcium imaging from a lightweight head-mounted microscope, recorded by Joseph Scherrer, and Neuropixels recordings from the caudomedial nidopallium of zebra finches presented with song motifs, recorded by Michael Happ. Our goal was to convert both to NWB.

## Conversion of Imaging

The imaging data came from the microscope described in Scherrer et al. (Nature Methods, 2023) and were saved as AVI files. We wrote a custom extractor and interface that read these frames and convert them to grayscale using a channel weighting specified by the lab. Cell segmentation from EXTRACT was added through a custom segmentation interface, with the EXTRACT settings stored using the ndx-extract extension. A behavior video of the mouse in its home arena was added with NeuroConv's video interface, and both the imaging and the video were timestamped from the lab's CSV files.

## Conversion of Electrophysiology and Song Stimuli

For the zebra finch recordings, NeuroConv interfaces handled the SpikeGLX action potential and LFP streams and the Phy spike sorting output. We wrote a custom interface for the times at which song motifs were played, shifted onto the Neuropixels clock using audio and SpikeGLX event times recorded by the lab. Motifs and their syllables were stored as a hierarchical table with the ndx-hierarchical-behavioral-data extension, using syllable durations from the lab's dataset log, and the audio was stored as a stimulus with ndx-sound. We also built a widget that shows the sound's waveform and spectrogram next to the motif table and plays the audio.

## Publication on DANDI

The imaging data are published as Dandiset 000691, which holds the recording from one mouse, about 15 GB, together with its behavior video.
