---
lab: "Mark Schnitzer"
institution: "Stanford University"
description: "Developed nwbpkg with the Schnitzer lab, a MATLAB package built on MatNWB that writes cell extraction outputs from CELLMax, EXTRACT, CNMF, CNMF-E, and PCA-ICA to NWB. We also wrote the ndx-extract extension to store the configuration of an EXTRACT run."
tags: ["calcium imaging"]
github: "https://github.com/schnitzer-lab/nwbpkg"
date: "2019-05"
funded_project: "Ripple U19"
species: Mouse
---

The Schnitzer lab at Stanford University extracts cells from calcium imaging movies with several algorithms, including CELLMax, EXTRACT, CNMF, CNMF-E, and PCA-ICA, and stores the results in MATLAB files produced by the lab's CIAtah package. Our goal was to let the lab write these cell extraction outputs to NWB directly from MATLAB.

## A MATLAB Package for Cell Extraction Outputs

We worked with Biafra Ahanonu in the lab on nwbpkg, a MATLAB package built on MatNWB. It can take the image masks and traces of a cell extraction run held in memory and write them to an NWB file, or convert existing MATLAB result files, which it recognizes by the name of the algorithm that produced them. Session, subject, device, and imaging plane metadata are read from a YAML file. The package writes the masks to an ImageSegmentation with one PlaneSegmentation per imaging plane, records the extraction method in the segmentation description, and stores the traces as DfOverF. It supports several devices and imaging planes in one file, and a companion function reads an NWB file back into the arrays that the lab's other MATLAB code expects. The lab's CIAtah package also exposes this export.

## Support in Python Tools

ROIExtractors, the library under NeuroConv's optical physiology interfaces, includes readers for EXTRACT and CNMF-E output, and we wrote the ndx-extract extension to store the configuration options used for an EXTRACT run alongside its results.
