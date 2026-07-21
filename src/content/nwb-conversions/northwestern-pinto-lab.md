---
lab: "Lucas Pinto"
institution: "Northwestern University"
description: "Developed comprehensive NWB conversion tools for the Pinto lab's two-photon imaging datasets. The conversion pipeline handles Bruker Ultima microscope data, Suite2P segmentation outputs, and holographic stimulation experiments. Created a custom NWB extension (ndx-pinto-metadata) for storing ViRMEN experimental metadata, and the tools support both command-line and interactive notebook-based workflows for data conversion and analysis."
tags: ["behavioral tracking", "calcium imaging", "spatial navigation"]
github: "https://github.com/catalystneuro/pinto-lab-to-nwb"
date: "2023-03"
funded_project: "SCGB NWB Adoption"
species: Mouse
---

The Pinto lab collects optical imaging data from mice acquired on a Bruker microscope as stacks of TIFF files, segmented with suite2p. Subject position and other behavior are tracked within virtual reality sessions using their ViRMEn system, and holographic stimulation gives optogenetic control at cellular resolution. Our goals, as part of the Simons Collaboration on the Global Brain data standardization effort, are to package this data in the NWB format so that it can be shared within the lab and published on the DANDI Archive.

## Conversion of Optical Imaging and Behavior

We wrote an open-source Python package to ingest the lab's data into NWB. The conversion covers wide-field and two-photon imaging, with volumetric and multi-channel support for each imaging pipeline; optogenetic data and metadata; suite2p segmentations; ViRMEn output; and experimental metadata.

## Publication on DANDI

We created a pipeline that uploads a specified list of experiment sessions to the DANDI Archive. No data needed immediate publication, so the value here is that the lab has a straightforward route to publish once the corresponding paper is accepted.

## Interactive Visualizations

We created interactive visualizations of NWB data that combine behavior with the neural responses, such as trial-conditioned ROI responses and receptive field analyses. These validate that the files converted correctly, give lab members a quick way to run simple analyses, and serve as example code for working with NWB data.
