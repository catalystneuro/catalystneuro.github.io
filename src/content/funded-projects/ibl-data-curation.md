---
title: "IBL Data Curation"
funder: "International Brain Laboratory"
status: "completed"
startDate: "2025-08-01"
description: "Converting International Brain Laboratory datasets, including the Brain Wide Map, to NWB and publishing them on DANDI"
image: "/images/institutions/ibl_logo.webp"
github:
  - "https://github.com/catalystneuro/IBL-to-nwb"
  - "https://github.com/catalystneuro/IBL-widefield-to-nwb"
  - "https://github.com/catalystneuro/IBL-mesoscope-to-nwb"
  - "https://github.com/catalystneuro/IBL-fiberphotometry-to-nwb"
---

The International Brain Laboratory contracted CatalystNeuro, starting in 2025, to curate and standardize the collaboration's datasets for public release on the DANDI Archive. IBL is a multi-institution collaboration whose labs run a shared decision-making task in mice and store the results in IBL's own ONE format. The work built on the IBL-to-NWB pipeline we first wrote in 2020, and IBL's own engineers contributed to the same code.

The largest piece was the Brain Wide Map, Neuropixels recordings made across multiple IBL labs. We rewrote the conversion on NeuroConv, with custom interfaces for the raw SpikeGLX data, spike sorting, trials, wheel movement, licks, pose estimation, pupil tracking, and brain region assignments, and converted the 459 sessions on AWS with one instance per session. Dandiset 000409, first published in March 2026, holds 2,048 files from 139 mice, about 50 TB, and the repository pins its software environment so the conversion can be reproduced. We then built separate pipelines for IBL's widefield imaging, two-photon mesoscope, and fiber photometry datasets, the first of which has data on Dandiset 001712.
