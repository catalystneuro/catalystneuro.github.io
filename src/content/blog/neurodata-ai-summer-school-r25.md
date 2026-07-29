---
title: "NIH R25 Award for the NeuroData AI Summer School"
date: "2026-07-29"
image: "/images/blog/neurodata-ai-summer-school-banner.jpg"
description: "NINDS has awarded CatalystNeuro an R25 research education grant to support the NeuroData AI Summer School for five years, expanding the NeuroDataReHack workshop we have run at HHMI Janelia since 2022 with a longer format and new material on AI methods."
readTime: "7 min read"
author: "Ben Dichter"
keywords: ["NeuroDataReHack", "NIH", "R25", "education", "NWB", "DANDI", "data reuse", "AI", "Janelia"]
---

The National Institute of Neurological Disorders and Stroke has awarded CatalystNeuro an R25 research education grant (1R25NS149357) to support the [NeuroData AI Summer School](/funded-projects/neurodata-ai-summer-school-r25) for five years. The program is a continuation and expansion of NeuroDataReHack, the residential workshop we have run at [HHMI Janelia Research Campus](https://www.janelia.org/) since 2022. This is the first stable, multi-year funding the program has had, and it changes what we are able to plan. This post describes what the award funds and how the program will change.

## The Gap the Program Addresses

The [DANDI Archive](https://dandiarchive.org/) now holds more than 600 neurophysiology datasets, roughly 550 of them in the [Neurodata Without Borders](https://nwb.org/) format, spanning many species, brain areas, task designs, and recording modalities. Several of these are large, well-documented, and expensive to collect, including releases from [Allen Institute OpenScope](https://alleninstitute.org/division/mindscope/openscope/), the [MICrONS project](https://www.microns-explorer.org/), and the International Brain Laboratory [Brain Wide Map](https://www.internationalbrainlab.com/brainwide-map). The reuse of these datasets is growing, but it is still small relative to what they cost to collect and what they could support.

Reanalysis of open neurophysiology data is plainly viable, and several prominent recent papers have been built substantially or entirely on public datasets ([Schneider et al., 2023](https://www.nature.com/articles/s41586-023-06031-6); [Burman et al., 2023](https://doi.org/10.1016/j.neuron.2023.08.005); [Pachitariu et al., 2024](https://www.nature.com/articles/s41592-024-02232-7); [Wakhloo et al., 2026](https://www.nature.com/articles/s41593-025-02183-y)). The obstacle is not that this kind of work is unwelcome. It is that the groups producing it tend to be computationally sophisticated ones that already know how to work with standardized formats and cloud-hosted archives, and that expertise is distributed unevenly. The specific problem we address is that many neuroscientists who would like to do this work have never been taught how: how standardized formats are organized, how to stream data from a cloud archive rather than downloading it, which analysis tools operate on NWB files directly, and how to evaluate whether a method developed on one lab's recordings will transfer to another's.

The exit survey from the 2026 workshop is full of that reaction. One participant summarized the week in a single sentence:

> I didn't know it was so easy to get started with analysing open datasets!
>
> William Reith, Sainsbury Wellcome Centre

## Relationship to NeuroDataReHack

The Summer School builds on the program that has run at Janelia each summer since 2022, with an expanded curriculum and a longer format. The structure that makes it work is unchanged. Participants arrive with a reanalysis question they want to pursue, form teams around shared datasets and interests, receive instruction in the mornings, and spend the majority of the week on project work with faculty and dataset stewards available to them. Teams present results on the final day, and lectures and tutorials are recorded and published afterward. The 2027 installment will run under the NeuroDataReHack name.

## Curriculum

The foundational portion of the curriculum covers the NWB standard and the DANDI Archive, including file structure, validation, programmatic access, and search. On top of that, participants work with the analysis ecosystem that has grown up around the standard: [SpikeInterface](https://github.com/SpikeInterface/spikeinterface) and [Kilosort](https://github.com/MouseLand/Kilosort) for spike sorting, [Pynapple](https://github.com/pynapple-org/pynapple) for time series analysis, [Neurosift](https://neurosift.app/) for interactive visualization of remote NWB files, and imaging and behavior tools including [suite2p](https://github.com/MouseLand/suite2p) and [Facemap](https://github.com/MouseLand/facemap). The emphasis throughout is on working with real files rather than prepared examples, because most of the difficulty in reanalysis comes from the parts of a dataset that do not match expectations.

## Addition of AI Methods

This award primarily expands the material at the intersection of machine learning and neurophysiology: foundation models for neural data, LLM-assisted analysis workflows, dimensionality reduction and neural decoding, and transfer learning across datasets and recording sessions.

The program has already begun moving in this direction. The [2026 workshop](https://nwb.org/events/hck26-2026-janelia-ndrh/) devoted a section of the schedule to AI-assisted workflows, covering neural foundation models, development with LLMs, and coding agents. What the award funds is the expansion of that material from a handful of sessions into a substantial and well-supported portion of a longer program.

## Comparison with Other Training Programs

Two other programs cover adjacent ground, and they are worth knowing about. [Neuromatch Academy](https://neuromatch.io/) provides broad instruction in computational neuroscience and, more recently, NeuroAI, at a much larger scale and with no travel requirement. [NeuroHackademy](https://neurohackademy.org/) covers scientific computing, reproducibility, and data science for neuroimaging.

Our program is specifically about reanalysis of neurophysiology data in the NWB format on the DANDI Archive, and it assumes participants arrive with a programming background and familiarity with neurophysiology. We schedule around these programs deliberately so that people who would benefit from more than one can attend more than one.

## Partnership with HHMI Janelia and Its Trade-offs

HHMI Janelia Research Campus has hosted and sponsored the program since 2022, providing lodging, meals, and meeting space. This is what allows us to offer the program at no cost to participants, and the residential format produces a level of sustained concentration that a distributed or virtual format does not.

A residential program at a single site caps enrollment at roughly 35 participants, requires a week away from other obligations, and requires travel to Virginia, which is a meaningful barrier for international applicants and for anyone with caregiving responsibilities. We accept that trade-off because the format works, but it does mean the program reaches a small number of people directly. We publish the recorded lectures each year, which extends the reach of the instructional material, though it does not extend the reach of the project work, and the project work is the part participants consistently rate as most valuable.

## Feedback from the 2026 Workshop

At the end of each installment we ask participants whether they would like to leave a comment we can publish. Three from 2026:

> Getting familiarized with open data is a critical skill for anyone who wants to think through their hypothesis before diving deep into an experimental project, or who needs to replicate results on new data. This workshop is a fantastic way to understand what data is already out there, how to use open science tools, and how to contribute yourself to the open data community.
>
> Estrella Villanueva Pivel, LMU Munich

> Collective data collection, data sharing and data reuse will be the future of neuroscience. This workshop is great for computational neuroscientists, and experimentalists who could benefit from using open data to complement their own research.
>
> Siyu Wang, National Institutes of Health

> Why wait for the experiments? Use open data now!
>
> Antonio Velázquez, Universidad Nacional Autónoma de México

## Teaching Each Cohort

Running this program is the part of my year I look forward to most. Participants arrive on Sunday with a question they care about and, frequently, no clear idea how to open the files that might answer it. By Saturday they are standing up and presenting a result. Watching that happen across a room of thirty people at once does not get old, and the final-day presentations are reliably the best hours of the week. I also get to spend six days with people who are enthusiastic about open data, which is not the ambient condition in most of the field.

There is a reason I care about this beyond enjoying it. The promise of open data is not fulfilled by publishing data. It is fulfilled when someone opens a dataset they did not collect and learns something from it that the people who collected it did not know. Every argument for sharing neurophysiology data rests on an assumption that reuse will follow, and reuse does not follow automatically. It follows when enough people know how to do it, and when they have seen it done. That is what this program produces, one cohort at a time, and the participants who leave and go on to reanalyze someone else's recordings are the mechanism by which the whole case for open data stops being an argument and starts being a body of work.

## NeuroDataReHack 2027

The first installment supported by this award will be held at HHMI Janelia Research Campus in Ashburn, Virginia, from Monday, July 19 through Saturday, July 24, 2027, with participants arriving the evening of Sunday, July 18. The event is free to attend, including lodging on campus and meals. We will announce the opening of applications separately, with the full eligibility criteria and application details.

## What Five Years of Funding Changes

Until now the program has run one year at a time. Janelia's support has been generous and consistent, but everything else was assembled annually, which meant the curriculum was largely rebuilt each spring and we could not commit to much beyond the coming summer. A five-year award changes the horizon we can plan against, and that is the part of this I am most pleased about.

The most immediate difference is that teaching materials can accumulate instead of resetting. Tutorials that work can be maintained and revised across installments and published as a resource that outlasts the week they were written for. We can invite faculty further in advance, give applicants an answer earlier, and build the AI portion of the curriculum knowing it has several years to develop rather than a single slot to fill in a schedule. It also means we can follow what participants do after they leave, which is the only real measure of whether the program works and something we have never been able to do properly.

Five cohorts from now I expect this program to look meaningfully different from the one we ran this July, and I am looking forward to finding out how.

## Acknowledgments

We are grateful to HHMI Janelia for hosting and sponsoring this program, to the faculty and advisory committee members from the NWB and DANDI teams, Allen Institute OpenScope, the International Brain Laboratory, and NeuroHackademy, and to the reviewers and program staff at NINDS. We are also grateful to the participants of the past five installments. The evidence that this program works came from their project outcomes and their survey responses, and the application would not have been competitive without it.
