---
title: "GuPPy Development"
funder: "Michael J. Fox Foundation"
status: "active"
startDate: "2025-08-01"
description: "Software engineering for GuPPy, the Lerner Lab's fiber photometry analysis tool"
image: "/images/software/guppy_logo.png"
github:
  - "https://github.com/LernerLab/GuPPy"
---

Supported by the Aligning Science Across Parkinson's (ASAP) initiative, we work with Dr. Talia Lerner's laboratory at Northwestern University on [GuPPy](https://github.com/LernerLab/GuPPy), Guided Photometry Analysis in Python. GuPPy is a free and open-source tool for analyzing fiber photometry data, covering artifact correction, signal normalization, peak detection, and visualization. The Lerner Lab leads the scientific development and the analysis methods, while we build the software engineering foundation underneath them, so that a tool written to answer one lab's questions can be installed, trusted, and used by the wider community.

## Scope of Work

### Packaging and Distribution

GuPPy is now distributed as `guppy-neuro` on PyPI, built from a `pyproject.toml` configuration and released through a continuous deployment workflow, so a new version reaches users without anyone assembling it by hand. Installation no longer depends on cloning the repository and reproducing a development environment.

### Quality Assurance

The project runs its test suite against pull requests and on a daily schedule, across a matrix of operating systems and Python versions, with coverage reported on every change. Formatting and linting run through pre-commit hooks so that style stays consistent without being argued about in review.

### Reliability and Error Handling

Analysis code written for a single lab tends to assume that its inputs are well formed. We work through those assumptions so that malformed or unexpected recordings produce a clear message about what is wrong rather than a traceback from somewhere deep in the pipeline.

### Data Sharing Across Platforms

GuPPy reads NWB files through a recording extractor built on the [ndx-fiber-photometry](https://github.com/catalystneuro/ndx-fiber-photometry) extension, so data standardized for the DANDI Archive can be analyzed without being converted back into a lab-specific layout first. This closes the loop between the conversion work we do for ASAP labs and the analysis those labs actually run.

Documentation for the project is published at [guppy.readthedocs.io](https://guppy.readthedocs.io/).
