---
title: "NWB Widgets"
funder: "Allen Institute"
status: "completed"
startDate: "2020-04-01"
description: "Interactive Jupyter widgets for exploring NWB files, developed with Allen Institute support and since replaced by Neurosift"
image: "/images/software/nwb-widgets-logo.png"
github: 
- "https://github.com/NeurodataWithoutBorders/nwbwidgets"
---

The Allen Institute supported our development of NWB Widgets, a library of interactive Jupyter widgets for exploring NWB files. A user can browse the hierarchical structure of an NWB 2.0 file and open a visualization for each data object, with views for extracellular and intracellular electrophysiology, optical physiology, behavior, and time series. A Panel interface opens files from local disk or streams them directly from the DANDI Archive, and new visualizations can be added by registering a function for a neurodata type.

The work for the Allen Institute, which began in 2020, added widgets built around the Institute's data: session rasters, grouped peristimulus time histograms, tuning curves, rendering of electrode locations in the Allen Common Coordinate Framework, and a dashboard that plays imaging frames alongside electrical traces. We released the package on PyPI through version 0.10.2 in February 2023. NWB Widgets is no longer maintained, and Neurosift, a browser-based viewer to which we contribute, has replaced it in our own work.
