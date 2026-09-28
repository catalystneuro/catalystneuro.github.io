---
lab: "Ivan Soltesz"
institution: "Stanford University"
description: "Developed the ndx-simulation-output extension for storing large-scale simulation output from the Soltesz lab's NeuroH5 software, and began a conversion of Scanbox two-photon imaging and treadmill data."
tags: ["calcium imaging", "two-photon microscopy", "behavioral tracking"]
github: "https://github.com/catalystneuro/soltesz-lab-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/000064"
    name: "000064: Simulation extension example"
date: "2019-11"
funded_project: "Ripple U19"
species: Mouse
---

The Soltesz lab at Stanford University runs both imaging experiments and large-scale simulations of neural circuits. Our work with the lab, funded by the Ripple U19, covered both sides: a way to store simulation output in NWB, and a conversion for imaging and behavior data.

## Storing Simulation Output

Large network simulations can record membrane potential or calcium concentration from hundreds of thousands of compartments across many cells. We wrote the ndx-simulation-output extension, in collaboration with Stanford University and the Allen Institute, to store these data. It defines a CompartmentSeries for continuous data from many compartments of many cells and a Compartments table that holds the number and position of each compartment for every cell. Dandiset 000064 holds an example file of about 218 MB, produced by the Soltesz lab's NeuroH5 simulation software and converted to NWB with this extension.

## Conversion of Imaging and Behavior

In 2021 we started a conversion for two-photon imaging sessions using NWBConverter from nwb-conversion-tools. It combined the Scanbox imaging interface for the raw .sbx movies with a custom interface for treadmill running speed, which the lab stored as NumPy arrays. This work remained on draft branches of the repository and was not merged.
