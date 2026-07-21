---
lab: "Robert Turner"
institution: "University of Pittsburgh"
description: "Comprehensive NWB conversion tools for the Turner lab's electrophysiology datasets from parkinsonian macaque studies. The conversion pipeline handles three distinct experimental paradigms: (1) Multi-area recordings (motor cortex, striatum, STN, GPi/GPe) during center-out reaching tasks with TDT recording systems, (2) Motor cortex single-unit recordings with antidromic cell-type identification (pyramidal tract and corticostriatal neurons) during visuomotor step-tracking with muscle stretch perturbations, and (3) Further datasets with specialized behavioral protocols. Includes custom NWB extension (ndx-turner-metadata) for lab-specific metadata, specialized interfaces for TDT recordings with filtered/raw data streams, and MATLAB-based electrophysiology data with trial-aligned analog signals (kinematics, EMG, LFP). Tools support multi-session experiments with interactive tutorials for data visualization and analysis."
tags: ["motor control", "electrophysiology", "behavioral tracking", "Parkinson's disease", "MPTP", "cell-type identification", "antidromic stimulation"]
github: "https://github.com/catalystneuro/turner-lab-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/000947"
    name: "000947: Reach-related Single Unit Activity in the Parkinsonian Macaque"
  - url: "https://dandiarchive.org/dandiset/001636"
    name: "001636: Pyramidal tract and corticostriatal neuron recordings in MPTP-treated macaque performing visuomotor tasks"
date: "2025-10"
funded_project: "Aligning Science Across Parkinson's"
species: Macaque
---
The Turner lab has collected single-unit recordings from macaque primary motor cortex during a joint flexion and extension task, as part of the ASAP initiative. The data were acquired both before and after induction of model parkinsonism through MPTP treatment, with corticospinal and corticostriatal neurons identified by antidromic stimulation. Our goal is to package this dataset in the NWB format and publish it to the DANDI Archive.

## Conversion of Data Streams

We developed an open-source Python package to convert the dataset to NWB, shared in a public GitHub repository. The pipeline handles extracellular electrophysiology, covering spike times, waveforms, and antidromic stimulation traces; behavioral task events including trial timing, reach targets, perturbations, and rewards; analog kinematics recorded as elbow joint angle; and trial-based LFP and EMG signals where present.

The pipeline uses compression and chunking so that the files store efficiently and can be read directly in cloud environments. All data are converted and annotated in accordance with NWB best practices. Where inter-trial interval timing is available, the recordings are reconstructed as a contiguous representation, which makes the data more reusable and more compatible with downstream analysis tools.

## Publication on DANDI

We created a pipeline that uploads the specified list of converted sessions to the DANDI Archive automatically, along with a Dandiset annotated according to DANDI best practices.

## Demonstrating NWB Usage

We created Jupyter notebooks demonstrating how to read the converted files, access each data stream, and generate example visualizations. These notebooks were submitted to the [DANDI example-notebooks repository](https://github.com/dandi/example-notebooks).
