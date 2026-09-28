---
title: "Ripple U19 NWB Adoption"
funder: "National Institutes of Health"
status: "completed"
startDate: "2019-11-01"
description: "A BRAIN Initiative U19 on hippocampal sharp-wave ripples that funded our NWB conversions, extensions, and ROIExtractors work"
image: "/images/sponsors/nih_logo.png"
github:
  - "https://github.com/catalystneuro/ndx-simulation-output"
  - "https://github.com/catalystneuro/roiextractors"
---

The Ripple U19 was a BRAIN Initiative Team-Research BRAIN Circuit Programs award from the National Institute of Neurological Disorders and Stroke (U19NS104590) to Stanford University. It ran from September 2017 to June 2023 under five principal investigators, with Ivan Soltesz as contact principal investigator. The consortium studied how hippocampal circuits generate the sharp-wave ripple and how memories are replayed during it, and paired experiments with a full-scale biophysical model of the hippocampus. Its Data Science Resource Core was charged with a common storage format for the consortium's experimental and simulation data and with collaboration with Neurodata Without Borders, and from 2019 the consortium funded CatalystNeuro to bring its data into NWB.

Our work covered the range of data the consortium produced. We converted published electrophysiology datasets recorded from the hippocampus and neocortex of rats and mice and published them on the DANDI Archive, where they make up nine Dandisets and about 23 TB. For calcium imaging, we worked on a MATLAB package that writes cell extraction results from several algorithms to NWB, and the grant also funded work on ROIExtractors, the Python library that now reads optical physiology formats for NeuroConv. For the consortium's network simulations, we wrote the ndx-simulation-output extension, which stores membrane potential or calcium concentration from hundreds of thousands of compartments across many cells.
