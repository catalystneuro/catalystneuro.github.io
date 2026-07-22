---
title: "Voluseg Development"
funder: "Vanderbilt University"
status: "completed"
startDate: "2023-06-01"
description: "Development of Voluseg for volumetric segmentation of calcium imaging data"
github:
- https://github.com/mikarubi/voluseg
---

Led by Luiz Tauffer in collaboration with Dr. Mika Rubinov's laboratory at Vanderbilt University, we integrated modern software engineering practices with Voluseg, a specialized tool for volumetric segmentation of calcium imaging data. This project focused on creating advanced algorithms and tools that enable neuroscientists to efficiently process and analyze three-dimensional calcium imaging datasets, facilitating the study of neural activity patterns in complex brain structures.

## Scope of Work

The Rubinov lab, known for its contribution to "Glia Accumulate Evidence that Actions Are Futile and Suppress Unsuccessful Behavior" (Cell, 2019), used the [Voluseg](https://github.com/mikarubi/voluseg) pipeline for cell segmentation and component detection in zebrafish studies. Interest from the wider community created demand to turn Voluseg into a mature, user-friendly package, so we brought to it the practices we maintain in tools such as PyNWB and SpikeInterface.

### Software Engineering

We refactored the code to follow current practice, with automated formatting, pre-commit hooks, and continuous integration to keep quality and formatting consistent, and comprehensive function docstrings following a standard convention.

### Packaging

The project moved from `setup.py` to `pyproject.toml`, was tested across the major operating systems and Python versions, and was set up for straightforward distribution through PyPI with continuous deployment.

### Testing

We built a test suite covering the major functionality, integrated it into continuous integration through GitHub Actions so it runs across multiple environments, and targeted test coverage of at least 70 percent.

### Documentation

We revised the README so the package introduces itself properly, and built full documentation covering installation, self-contained tutorials, and an API reference.

### Containerization and Cloud Deployment

We created a Dockerfile and container for running Voluseg, wrote infrastructure code to launch that container in the cloud, and demonstrated the pipeline running there end to end.

### Reading HDF5 Files

Voluseg was extended to read 4D HDF5 files, including NWB data from [Dandiset 000350](https://dandiarchive.org/dandiset/000350), which holds the two-photon data behind the 2019 paper.
