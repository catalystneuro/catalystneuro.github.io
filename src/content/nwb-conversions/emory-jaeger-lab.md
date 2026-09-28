---
lab: "Dieter Jaeger"
institution: "Emory University"
description: "Developed NWB conversion tools for the Jaeger lab's motor cortex and thalamus experiments in mice, covering Intan electrophysiology, treadmill, LabVIEW, and Bpod behavior, optogenetic stimulation, and FRET imaging, with the ndx-fret extension."
tags: ["electrophysiology", "motor control", "behavioral tracking", "optogenetics"]
github: "https://github.com/catalystneuro/jaeger-lab-to-nwb"
date: "2019-10"
funded_project: ""
species: "Mouse"
---

The Jaeger lab at Emory University records from motor cortex and the ventromedial thalamus of mice during licking, reaching, and treadmill tasks. Their experiments used several acquisition systems, each with its own file format. Our goal was to convert each experiment type to NWB with a common tool.

## Conversion of Electrophysiology and Behavior

We wrote an open-source Python package with a separate NWBConverter from nwb-conversion-tools for each of four experiment types. For treadmill sessions, we combined a custom interface for Intan .rhd recordings, with electrode groups in the anterior lateral motor cortex, the caudal forelimb area of motor cortex, and the ventromedial thalamus, with an interface for the treadmill CSV files that stored trial parameters, treadmill speed, beam breaks, and nose position. For a LabVIEW licking task, we converted the trial summary files, including the side of the air puff and the optogenetic condition of each trial, left and right licks, and the stimulation of the ventromedial thalamus with a 470 nm laser as an OptogeneticSeries. For Bpod sessions, we converted the trials table with the state sequence of each trial and stored port entries and exits with the ndx-events extension.

## Conversion of FRET Imaging

Cortical imaging data in .rsd and .rsh files recorded separate donor and acceptor channels. We wrote the ndx-fret extension to store these as a pair of FRET series.

## Editing Metadata

The package included example notebooks for each experiment and a command that opened the conversion in the NWB Web GUI, where users could edit metadata, run the conversion, and inspect the resulting file.
