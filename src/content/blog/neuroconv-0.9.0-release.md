---
title: "NeuroConv 0.9.0 Release"
date: "2025-12-08"
description: "NeuroConv 0.9.0 introduces redesigned TIFF and Miniscope converters, new behavioral data documentation, NWB repacking functionality, and SpikeGLX improvements."
image: "/images/software/neuroconv_logo.png"
readTime: "3 min read"
keywords: ["NeuroConv", "NWB", "neurophysiology", "data conversion", "TIFF", "Miniscope", "SpikeGLX", "release"]
---

# NeuroConv 0.9.0 Release

We are pleased to announce the release of [NeuroConv 0.9.0](https://pypi.org/project/neuroconv/). This version includes several significant improvements to data conversion workflows and expanded documentation for common use cases.

- **Redesigned TIFF Converter:** The TIFF converter has been substantially redesigned. It now handles datasets distributed across multiple files, multichannel acquisitions, and volumetric stacks. A [new tutorial](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/imaging/tiff.html) demonstrates how to convert arbitrary TIFF datasets using the updated interface.

- **Enhanced Miniscope Support:** The Miniscope converter now fully leverages the Miniscope configuration file, allowing automatic aggregation of all data belonging to a recording session. Support has also been added for head-direction files produced alongside each session. [Documentation](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/imaging/miniscope.html).

- **Behavioral and Sensor Data Documentation:** New documentation has been added describing how to convert behavioral and sensor data from multiple acquisition systems to NWB. Formats such as Neuralynx, Blackrock, and Intan which often record analog sensor channels alongside neural data are supported via a unified [how-to guide](https://neuroconv.readthedocs.io/en/stable/how_to/add_behavioral_and_sensor_data.html).

- **NWB File Repacking:** New backend configuration functionality has been added, allowing users to automatically "repack" their NWB files. This is useful if you previously created an NWB file and want to improve either its compression or chunking patterns (to make it more cloud friendly) without changing its contents. [Documentation](https://neuroconv.readthedocs.io/en/stable/how_to/repacking_nwb_files.html).

- **SpikeGLX Improvements:** For recordings via SpikeGLX, we introduced two new improvements: first, support for including the synchronization ("sync") channel during conversion; second, enhanced metadata customization for both analog and digital channels in the NIDQ interface. [Documentation](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/recording/spikeglx.html#nidq-board).

See the [full changelog](https://github.com/catalystneuro/neuroconv/releases/tag/v0.9.0) for all changes in this release.

We welcome feedback, bug reports, and suggestions for use cases or data formats that are not yet supported. If you encounter issues or think we should address additional workflows, please [open an issue](https://github.com/catalystneuro/neuroconv/issues).
