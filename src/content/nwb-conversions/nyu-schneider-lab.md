---
lab: "David Schneider"
institution: "New York University"
description: "Developed NWB conversion tools for multi-modal neuroscience data including behavioral tracking, electrophysiology recordings, optogenetic stimulation, intrinsic signal imaging, and auditory stimulation. The project includes conversion of behavioral data from .mat files, OpenEphys recordings, optogenetic stimulation parameters, intrinsic signal images, and auditory stimulation data from multiple experimental paradigms. These tools support experiments investigating how the auditory cortex integrates sound and movement information, encodes error and learning signals, and guides sensorimotor adaptation during skilled, sound-generating behaviors in mice."
tags: ["behavioral tracking", "electrophysiology", "optogenetics", "pose estimation", "video"]
github: "https://github.com/catalystneuro/schneider-lab-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/001259"
    name: "001259: Cortical control of skilled, sound-guided behavior in mice"
date: "2024-08"
funded_project: "NYU Librarians"
species: Mouse
---

The Schneider lab at New York University studies how the auditory cortex processes the sounds that mice produce through their own movements. We converted data from three of the lab's projects to NWB.

## Conversion of the Sound-Guided Behavior Experiments

The largest conversion covered experiments by Grant Zempolich in which mice used real-time acoustic feedback to guide skilled forelimb movements. Recordings from auditory cortex and secondary motor cortex, made with 128-channel silicon probes and saved in the legacy Open Ephys format, were converted with a customized Open Ephys interface, and spike sorting results with NeuroConv's Phy interface. We wrote a custom interface for the behavior stored in the lab's MATLAB files: rotary encoder and lickometer traces, task events such as tone onsets and valve openings stored with the ndx-events extension, and a trials table. Optogenetic suppression of auditory or motor cortex was stored as an OptogeneticSeries, and the intrinsic signal imaging used to target auditory cortex was added as reference images. Video from two cameras was aligned using timestamps from the behavior files.

## Other Experiments

For experiments by Alessandro La Chioma, we converted Neuropixels recordings saved in the Open Ephys binary format along with the behavior, and wrote a script that repairs missing channel definitions in Open Ephys settings files. For experiments by Ariadna Corredera and colleagues, in which mice explored an arena with different floor surfaces, the conversion combined recordings from 64-channel Cambridge NeuroTech probes acquired with White Matter hardware, Phy spike sorting, video with SLEAP pose estimation, microphone audio, and the sound stimuli played back to the mice. Each of these conversions has an example notebook for reading the files.

## Publication on DANDI

The sound-guided behavior experiments have been uploaded to Dandiset 001259, which holds 188 files totaling about 540 GB.
