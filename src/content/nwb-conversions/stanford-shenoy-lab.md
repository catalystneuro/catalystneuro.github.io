---
lab: "Krishna Shenoy"
institution: "Stanford University"
description: "Developed comprehensive NWB conversion tools for the Shenoy lab's diverse motor neuroscience datasets. The conversion pipeline handles multiple experimental paradigms including center-out reaching tasks, Neuropixels recordings in monkeys, and maze navigation tasks. Created analysis and visualization pipelines for examining neural population dynamics during reaching and delay activity in premotor cortex. The tools support both direct streaming from DANDI and local data conversion workflows."
tags: ["motor control", "brain-computer interface", "electrophysiology", "behavioral tracking"]
github: "https://github.com/catalystneuro/shenoy-lab-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/000070"
    name: "000070: Neural population dynamics during reaching"
date: "2021-02"
funded_project: "SCGB NWB Adoption"
species: Macaque
---

We assist the Shenoy lab in converting key animal electrophysiology datasets from published and upcoming research, building custom conversion pipelines to NWB for raw and processed data acquired with Blackrock Utah arrays and Neuropixels probes, as part of the Simons Foundation data standardization project. We also help the lab publish a subset of these datasets on DANDI for public release.

## Conversion of the Center-Out Reaching Task

We built a conversion pipeline combining raw datasets from the Blackrock Utah array, spike-sorted data or threshold crossings, and behavioral information including arm and eye tracking. Custom extensions carry the lab, subject, experimental setup, and probe information specific to the experiment. The result is published on DANDI following best practices, and NWB Widgets is used to stream and visualize the data as a check that the files are correct.

## Conversion of Mouse Neuropixels Data

We built pipelines for the lab's Neuropixels datasets, covering raw recordings from SpikeGLX, spikes sorted with Kilosort and Phy, behavioral data, and any custom extensions needed for lab, subject, setup, and probe information.

## Conversion of the Maze Dataset

The maze dataset is converted along the same lines as the center-out reaching task.

## Future Possibilities

Further work could interface NWB files with Neuropixels utils, add custom interactive visualizations that act as a dashboard for exploring each published dataset, and convert the dataset behind "High-performance brain-to-text communication via imagined handwriting."
