---
lab: "Eddie Chang"
institution: "University of California, San Francisco"
description: "Developed NWB conversion tools for the Chang lab's high-density electrocorticography (ECoG) recordings in human patients. The project includes conversion of 256-channel neural recordings during speech production, with detailed annotations of speech events and anatomical electrode labels, demonstrating the capability to handle complex human neurophysiology data while maintaining HIPAA compliance."
tags: ["electrophysiology", "behavioral tracking"]
github: "https://github.com/catalystneuro/chang-lab-to-nwb"
dandi: "https://dandiarchive.org/dandiset/000019"
date: "2020-2022"
funded_project: ""
species: Human
---

This engagement covers NWB integration for the Chang lab, spanning direct conversion support, improvements to the lab's visualization software, and new NWB extensions for representing speech and stimulation data.

## NWB Support and Training

We provide conversion support for new projects starting in the lab, covering conversion of new data and of data from previous patients, advice on managing raw and processed data, and guidance on data workflow with respect to NWB. We also run a tutorial and hacking session: a coding tutorial on building ECoG NWB files in Python and MATLAB, a tutorial on the surrounding Python tooling including ecogVIS, NWBWidgets, and time-frequency analysis, and a walkthrough of using git for development.

## Improvements to ecogVIS

We extended ecogVIS so that raw and processed or downsampled data can be saved separately, letting users open the raw data read-only and protecting it from corruption, while keeping a smaller file for day-to-day analysis. The tool can load data from HTK and save to NWB, which eases the transition into both. Because HTK data arrives without much of the important metadata, we added a way to supply what is missing through either a form or a YAML file, and made the visualizations degrade gracefully when metadata is absent: the grid ERP viewer checks for anatomical information in the electrodes table and falls back to an uncolored grid if there is none, and missing electrodes are handled explicitly. The work also covers a move to PySide2, documentation, unit tests and continuous integration, and support for the new extension types below so that ecogVIS can be used during preprocessing.

## NWB Extensions

We built an extension representing hierarchical behavior in general, with speech transcription at multiple levels of granularity as the motivating case. It defines a TranscriptionTier object inheriting from TimeInterval, with start time, stop time, label, and an optional sub-components column that references the next level down, so that words can point to syllables. Users can name and arrange tiers as they need, including higher-level tiers such as speaker. We also built a bipolar scheme extension for both recording and stimulation, allowing multiple electrodes in the anode, and an extension for survey and behavioral data. Each comes with conversion code, iteration with the lab, unit tests, continuous integration, and interactive visualizations in NWBWidgets so the structures can be navigated in a notebook.
