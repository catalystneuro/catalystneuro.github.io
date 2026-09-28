---
lab: "Allen Institute"
institution: "Allen Institute"
description: "Developed utilities for the Allen Institute's Visual Coding Neuropixels NWB files: a script that repairs session files so they open with PyNWB, and the hdf5zarr package for reading NWB files stored in the cloud through Zarr."
tags: ["electrophysiology"]
github: "https://github.com/catalystneuro/allen-institute-neuropixel-utils"
date: "2020-03"
funded_project: ""
species: Mouse
---

The Allen Institute distributes its Visual Coding Neuropixels recordings as NWB files, which it reads through the AllenSDK. In 2020 we wrote utilities that make these files work with the general NWB tools as well: a script that repairs the files so PyNWB can read them, and a package for reading NWB files stored in the cloud through Zarr.

## Repairing Files for PyNWB

The repair script edits a Visual Coding Neuropixels session file in place so that it opens with PyNWB 1.3 and later. It flattens running speed and wheel rotation timestamps that had been stored with an extra row, and renames a column in the optotagging stimulus table whose name, "name", conflicted with PyNWB. It also copies subject information (sex, age, genotype, and specimen name) from the Allen Institute's custom metadata extension into the standard NWB Subject, leaving the original in place so that the AllenSDK still works.

## Reading NWB Files with Zarr

The hdf5zarr package indexes the chunks of an HDF5 file as Zarr metadata, which can be exported to a single JSON file. With that metadata, an NWB file in DANDI's S3 bucket can be opened through Zarr and read into PyNWB with a custom IO class, fetching only the data a user asks for. The package handles compound, reference, and variable-length string datasets. The README example uses a session file from the Visual Coding Neuropixels dataset, which is on DANDI as Dandiset 000021.
