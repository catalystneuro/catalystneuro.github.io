---
title: "GuPPy Development"
funder: "Michael J. Fox Foundation"
status: "active"
startDate: "2025-08-01"
description: "Turning GuPPy, the Lerner Lab's fiber photometry analysis tool, into a sustainable platform for Parkinson's disease research"
image: "/images/software/guppy_logo.png"
github:
  - "https://github.com/LernerLab/GuPPy"
---

Supported by the Aligning Science Across Parkinson's (ASAP) initiative, we are working with Dr. Talia Lerner's laboratory at Northwestern University on [GuPPy](https://github.com/LernerLab/GuPPy), Guided Photometry Analysis in Python. GuPPy is a free and open-source tool, released by the Lerner Lab in 2021, that carries fiber photometry recordings from raw signal through artifact removal, ΔF/F calculation with isosbestic control normalization, and peri-event analysis, all through a graphical interface that does not require the user to write code.

Fiber photometry has become a central technique in Parkinson's research because it reaches deep structures such as the substantia nigra and striatum in freely behaving animals, and because it can isolate dopaminergic populations through genetic targeting. The hardware for these experiments is largely standardized and commercially available. The analysis is not. Most laboratories still run custom code, which makes results difficult to compare across labs and difficult to reproduce. GuPPy addresses that gap, and this project addresses the software engineering debt that limits how far GuPPy can spread.

The Lerner Lab leads the scientific direction and the analysis methods. Our role is the engineering underneath them, organized around three aims over twenty-four months.

## Modernizing the Development Infrastructure

Installing GuPPy previously meant cloning the repository, building a conda environment from operating-system-specific pinned requirements, and running notebooks from inside the checkout. GuPPy is now a proper Python package, built from a `pyproject.toml` and published to PyPI as `guppy-neuro`, so installation is a single `pip install` and the analysis functions can be imported into other scripts. Releases are tagged on GitHub and published automatically.

The test suite runs on every pull request and on a daily schedule, across a matrix of operating systems and Python versions, with coverage reported through Codecov. We are targeting 85 percent coverage, with unit tests over the critical operations such as ΔF/F calculation, artifact removal, and peri-event histogram generation, integration tests over complete workflows, and benchmarks that keep large recordings from becoming slow without anyone noticing. Formatting, linting, and spell checking run through pre-commit hooks, and we are annotating the codebase with docstrings and type hints toward 95 percent coverage of public functions and classes.

Documentation is published at [guppy.readthedocs.io](https://guppy.readthedocs.io/) and follows the four-part structure of tutorials, how-to guides, technical reference, and explanation, with an API reference generated from the docstrings and a troubleshooting section drawn from questions users actually ask.

## Robustness and Resilience

GuPPy's original architecture coupled its processing stages tightly enough that a failure in one of them could invalidate an entire analysis. We are separating data loading, artifact removal, signal processing, and visualization into modules with defined inputs and outputs, so that a failure in one stage leaves the results of the earlier stages intact, and so that a lab can substitute its own component for one of ours without rewriting the rest.

Alongside that, we are replacing silent failures and cryptic tracebacks with validation that names the problem and suggests the fix, telling the user which column is missing from which file rather than reporting an invalid input. Input handling is becoming more forgiving of ordinary variation in file and column naming, and support is expanding to additional acquisition systems so that GuPPy keeps working as photometry hardware evolves.

## Integration with the DANDI Archive

The third aim connects GuPPy to the data ecosystem it sits in. GuPPy reads NWB files through a recording extractor built on the [ndx-fiber-photometry](https://github.com/catalystneuro/ndx-fiber-photometry) extension, so recordings standardized for the [DANDI Archive](https://dandiarchive.org) can be analyzed without first being converted back into a lab-specific layout.

We are building a browser inside GuPPy's interface for finding datasets on DANDI, with filtering by experimental parameters, brain region, and indicator, and previews of metadata and example traces. Data streams from the archive rather than being downloaded whole, with caching for datasets that are opened repeatedly, so that a recording too large to keep on a laptop is still analyzable on one. This closes the loop between the conversion work we do for ASAP laboratories and the analysis those laboratories run.

## Working with ASAP Laboratories

The work is guided by beta testing in Parkinson's laboratories across the ASAP network, several of which we already collaborate with on NWB conversion. We begin by surveying their acquisition systems, file formats, and current analysis pipelines, then write the adapters needed for GuPPy to read their data as it exists rather than as we would prefer it. Training sessions follow, recorded and supplemented with lab-specific documentation, and the final phase folds what we learn from those sessions back into the software.
