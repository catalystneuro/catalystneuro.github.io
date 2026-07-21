---
title: "VAME Development"
funder: "Gladstone Institute"
status: "active"
startDate: "2024-01-01"
description: "Development of VAME (Variational Animal Motion Embedding) for behavioral analysis"
image: "/images/funded-projects/VAME_Logo.png"
github:
  - "https://github.com/EthoML/VAME"
  - "https://github.com/EthoML/vame-desktop"
---

Contracted by Dr. Jorge Palop's laboratory at the Gladstone Institute, we are developing VAME (Variational Animal Motion Embedding), a deep learning framework for analyzing animal behavior. This project focuses on creating tools that enable researchers to automatically track and analyze complex behavioral patterns in laboratory animals, facilitating the study of neurological conditions and potential therapeutic interventions.

## Scope of Work

VAME is an open-source library that uses machine learning to segment natural behavior. Our aim is to promote its use in the neuroscience community by making it easy to install and to run: better repository practices, tooling, and documentation for developers, and an application with a graphical interface for everyone else.

### Software Engineering Practices

On packaging, the project moves from a `setup.py` configuration to `pyproject.toml`, drops its restriction to a Python version that has reached end of life and is tested against current ones, and corrects its dependency declarations, including a scikit-learn entry that named the deprecated `sklearn` package and no longer worked. Installation becomes pip-compatible with releases on PyPI and conda, continuous deployment allows republishing at the push of a button, and the package adopts proper semantic versioning.

On testing, we develop a robust test suite, run it automatically against changes through continuous integration across a matrix of operating systems and Python versions, and report coverage.

On documentation, we produce a self-contained demo, improve the README and the docstrings, create an API reference, and annotate functions with type hints.

### Desktop Application

We build an application with a graphical interface so that VAME can be run without writing code. Its workflow is designed with the VAME development team, it is straightforward for non-coders to install, it works across platforms, and it is released as open source.
