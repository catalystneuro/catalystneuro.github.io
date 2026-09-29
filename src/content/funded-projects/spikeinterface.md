---
title: "SpikeInterface Development"
funder: "Simons Foundation"
status: "completed"
startDate: "2023-01-01"
description: "Simons Foundation support for CatalystNeuro's contributions to SpikeInterface, the open-source Python framework for spike sorting"
image: "/images/funded-projects/spikeinterface_logo.webp"
github:
  - "https://github.com/SpikeInterface/spikeinterface"
---

The Simons Foundation supported CatalystNeuro's contributions to SpikeInterface, the open-source Python framework for spike sorting, starting in 2023. SpikeInterface was introduced in a 2020 eLife paper by developers at ETH Zurich, the University of Edinburgh, CNRS in Lyon, the Flatiron Institute, and the Allen Institute. It provides one interface for reading extracellular recordings in many file formats, running a range of spike sorters, and preprocessing, comparing, and evaluating the results. NeuroConv relies on it for writing electrophysiology data to NWB, so its readers and data model matter directly to our conversion work.

Most of our contributions came from Heberto Mayorquin, who is now listed among SpikeInterface's core maintainers. In 2023 alone he merged 174 pull requests. They added HDF5 and remote streaming support to the NWB recording and sorting extractors, so that files on the DANDI Archive can be read without downloading them, and added or updated readers for formats including NeuroExplorer, CellExplorer, and Neuroscope. He also reworked the synthetic recording and sorting generators used for testing and benchmarking, made binary writing more memory efficient, and improved the project's continuous integration and documentation.
