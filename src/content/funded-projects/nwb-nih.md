---
title: "Neurodata Without Borders NIH Grant"
funder: "National Institutes of Health"
status: "active"
startDate: "2021-04-01"
description: "A BRAIN Initiative U24 to LBNL and CatalystNeuro for NWB training, support, and software, including NeuroConv and cloud work"
image: "/images/funded-projects/nwb_logo.png"
github:
  - "https://github.com/catalystneuro/neuroconv"
  - "https://github.com/catalystneuro/roiextractors"
  - "https://github.com/NeurodataWithoutBorders/nwb-benchmarks"
---

The National Institute of Neurological Disorders and Stroke funds Advancing Standardization of Neurophysiology Data Through Dissemination of NWB (U24NS120057), a BRAIN Initiative resource grant to Lawrence Berkeley National Laboratory. Oliver Rübel of LBNL is the contact principal investigator and Ben Dichter of CatalystNeuro is the other principal investigator. The project began in April 2021 and is in a no-cost extension through February 2027. It serves two groups: neuroscience labs, through training, user support, and coverage of new technologies, and tool developers, through maintenance of the core NWB software and integration with other data tools. A 2023 administrative supplement added work on converting and analyzing NWB data in the cloud.

Our part of the work centers on the software that gets data into NWB. NeuroConv, which was developed with more than 50 labs, was built in part under this grant, as was ROIExtractors, the library that reads optical physiology formats for NeuroConv. The project also supports labs adopting NWB through hackathons, one-on-one consultations, and tutorials. Under the cloud supplement we packaged NeuroConv in Docker images and added tools for running conversions as AWS Batch jobs, and together with the LBNL team we built NWB Benchmarks, a suite that measures how storage layout affects reading and writing NWB files locally and from cloud storage.
