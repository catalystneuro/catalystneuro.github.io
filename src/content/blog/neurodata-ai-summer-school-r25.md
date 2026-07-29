---
title: "NIH R25 Award for the NeuroData AI Summer School"
date: "2026-07-29"
description: "NINDS has awarded CatalystNeuro an R25 research education grant to support the NeuroData AI Summer School for five years, expanding the NeuroDataReHack workshop we have run at HHMI Janelia since 2022 with a longer format and new material on AI methods."
readTime: "5 min read"
author: "Ben Dichter"
keywords: ["NeuroDataReHack", "NIH", "R25", "education", "NWB", "DANDI", "data reuse", "AI", "Janelia"]
---

The National Institute of Neurological Disorders and Stroke has awarded CatalystNeuro an R25 research education grant (1R25NS149357) to support the NeuroData AI Summer School for five years. The program is a continuation and expansion of NeuroDataReHack, the residential workshop we have run at [HHMI Janelia Research Campus](https://www.janelia.org/) since 2022. This post describes what the award funds and how the program will change.

## The Gap the Program Addresses

The [DANDI Archive](https://dandiarchive.org/) now holds more than 600 neurophysiology datasets, roughly 550 of them in the [Neurodata Without Borders](https://nwb.org/) format, spanning many species, brain areas, task designs, and recording modalities. Several of these are large, well-documented, and expensive to collect, including releases from [Allen Institute OpenScope](https://alleninstitute.org/division/mindscope/openscope/), the [MICrONS project](https://www.microns-explorer.org/), and the International Brain Laboratory [Brain Wide Map](https://www.internationalbrainlab.com/brainwide-map). The reuse of these datasets is growing, but it is still small relative to what they cost to collect and what they could support.

Reanalysis of open neurophysiology data is plainly viable, and several prominent recent papers have been built substantially or entirely on public datasets ([Schneider et al., 2023](https://www.nature.com/articles/s41586-023-06031-6); [Burman et al., 2023](https://doi.org/10.1016/j.neuron.2023.08.005); [Pachitariu et al., 2024](https://www.nature.com/articles/s41592-024-02232-7); [Wakhloo et al., 2026](https://www.nature.com/articles/s41593-025-02183-y)). The obstacle is not that this kind of work is unwelcome. It is that the groups producing it tend to be computationally sophisticated ones that already know how to work with standardized formats and cloud-hosted archives, and that expertise is distributed unevenly. The specific and fairly narrow problem we can address is that many neuroscientists who would like to do this work have never been taught how: how standardized formats are organized, how to stream data from a cloud archive rather than downloading it, which analysis tools operate on NWB files directly, and how to evaluate whether a method developed on one lab's recordings will transfer to another's.

## Relationship to NeuroDataReHack

The Summer School is the same program that has run at Janelia each summer since 2022, with an expanded curriculum and a longer format. The core structure does not change. Participants arrive with a reanalysis question they want to pursue, form teams around shared datasets and interests, receive instruction in the mornings, and spend the majority of the week on project work with faculty and dataset stewards available to them. Teams present results on the final day, and lectures and tutorials are recorded and published afterward. The 2027 installment will run under the NeuroDataReHack name.

## Curriculum

The foundational portion of the curriculum covers the NWB standard and the DANDI Archive, including file structure, validation, programmatic access, and search. On top of that, participants work with the analysis ecosystem that has grown up around the standard: [SpikeInterface](https://github.com/SpikeInterface/spikeinterface) and [Kilosort](https://github.com/MouseLand/Kilosort) for spike sorting, [Pynapple](https://github.com/pynapple-org/pynapple) for time series analysis, [Neurosift](https://neurosift.app/) for interactive visualization of remote NWB files, and imaging and behavior tools including [suite2p](https://github.com/MouseLand/suite2p) and [Facemap](https://github.com/MouseLand/facemap). The emphasis throughout is on working with real files rather than prepared examples, because most of the difficulty in reanalysis comes from the parts of a dataset that do not match expectations.

## Addition of AI Methods

The material at the intersection of machine learning and neurophysiology is what this award primarily expands: foundation models for neural data, LLM-assisted analysis workflows, dimensionality reduction and neural decoding, and transfer learning across datasets and recording sessions.

This is not a new direction so much as an accelerated one. The [2026 workshop](https://nwb.org/events/hck26-2026-janelia-ndrh/) already devoted a section of the schedule to AI-assisted workflows, covering neural foundation models, development with LLMs, and coding agents. What the award funds is the expansion of that material from a handful of sessions into a substantial and well-supported portion of a longer program.

## Comparison with Other Training Programs

Two other programs cover adjacent ground, and prospective applicants should consider whether one of them is a better fit. [Neuromatch Academy](https://neuromatch.io/) provides broad instruction in computational neuroscience and, more recently, NeuroAI, at a much larger scale and with no travel requirement. [NeuroHackademy](https://neurohackademy.org/) covers scientific computing, reproducibility, and data science for neuroimaging.

Our program is specifically about reanalysis of neurophysiology data in the NWB format on the DANDI Archive, and it assumes participants already have some programming background and some familiarity with neurophysiology. We schedule around these programs deliberately so that people who would benefit from more than one can attend more than one.

## Partnership with HHMI Janelia and Its Trade-offs

HHMI Janelia Research Campus has hosted and sponsored the program since 2022, providing lodging, meals, and meeting space. This is what allows us to offer the program at no cost to participants, and the residential format produces a level of sustained concentration that a distributed or virtual format does not.

A residential program at a single site caps enrollment at roughly 35 participants, requires a week away from other obligations, and requires travel to Virginia, which is a meaningful barrier for international applicants and for anyone with caregiving responsibilities. We accept that trade-off because the format works, but it does mean the program reaches a small number of people directly. We publish the recorded lectures each year, which extends the reach of the instructional material, though it does not extend the reach of the project work, and the project work is the part participants consistently rate as most valuable.

## NeuroDataReHack 2027

The first installment supported by this award will be held at HHMI Janelia Research Campus in Ashburn, Virginia, from Monday, July 19 through Saturday, July 24, 2027, with participants arriving the evening of Sunday, July 18. The event is free to attend, including lodging on campus and meals. We will announce the opening of applications separately, with the full eligibility criteria and application details.

## Acknowledgments

We are grateful to HHMI Janelia for hosting and sponsoring this program, to the faculty and advisory committee members from the NWB and DANDI teams, Allen Institute OpenScope, the International Brain Laboratory, and NeuroHackademy, and to the reviewers and program staff at NINDS. We are also grateful to the participants of the past five installments. The evidence that this program works came from their project outcomes and their survey responses, and the application would not have been competitive without it.
