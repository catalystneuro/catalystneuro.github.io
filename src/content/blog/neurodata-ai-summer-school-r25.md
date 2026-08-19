---
title: "NIH R25 Award for the NeuroData AI Summer School"
date: "2026-07-29"
image: "/images/blog/neurodata-ai-summer-school-banner.jpg"
description: "NINDS has awarded us a five-year R25 grant for the NeuroData AI Summer School. After running NeuroDataReHack at HHMI Janelia on year-to-year funding since 2022, we can finally plan for the long term, and I could not be more excited about it."
readTime: "7 min read"
author: "Ben Dichter"
keywords: ["NeuroDataReHack", "NIH", "R25", "education", "NWB", "DANDI", "data reuse", "AI", "Janelia"]
---

The National Institute of Neurological Disorders and Stroke has awarded CatalystNeuro a five-year R25 research education grant (1R25NS149357) for the [NeuroData AI Summer School](/funded-projects/neurodata-ai-summer-school-r25), and I am thrilled. This is the program we have run as NeuroDataReHack at [HHMI Janelia Research Campus](https://www.janelia.org/) every summer since 2022, and for the first time it has stable, multi-year funding behind it. We can stop rebuilding it every spring and start building it properly.

This post covers what the award funds, how the program grows, and what I think the next five years look like.

## The Best Week of My Year

Running this program is the part of my year I look forward to most, and I want to be direct about why.

Participants arrive on Sunday with a question they genuinely care about and, very often, no idea how to open the files that might answer it. Six days later they are on their feet presenting a result. Watching that happen thirty times at once, in one room, does not get old. The final-day presentations are the best hours of my working year, every year, and I have never once left Janelia on the Saturday without a list of things I want to go try myself. I also get to spend six days surrounded by people who are excited about open data, which is not the ambient condition in most of neuroscience and is a real pleasure.

The reason this program matters goes past my enjoying it. Publishing data does not fulfill the promise of open data. That promise is fulfilled when someone opens a dataset they did not collect and finds something in it that the people who collected it did not know was there. Every argument for sharing neurophysiology data rests on an assumption that reuse will follow, and reuse does not follow on its own. It follows when enough people know how, and when they have watched someone sitting next to them do it. That is exactly what this program produces, one cohort at a time. The people who leave Janelia and go on to reanalyze someone else's recordings are how the case for open data stops being an argument and becomes a body of work.

## The Gap We Are Closing

The [DANDI Archive](https://dandiarchive.org/) now holds more than 600 neurophysiology datasets, roughly 550 of them in the [Neurodata Without Borders](https://nwb.org/) format, spanning a remarkable range of species, brain areas, task designs, and recording modalities. Some of them are extraordinary resources: large, thoroughly documented, and enormously expensive to collect, including releases from [Allen Institute OpenScope](https://alleninstitute.org/division/mindscope/openscope/), the [MICrONS project](https://www.microns-explorer.org/), and the International Brain Laboratory [Brain Wide Map](https://www.internationalbrainlab.com/brainwide-map). Reuse of these datasets is growing. It is also still nowhere near what they cost to collect or what they could support, and closing that gap is the whole reason this program exists.

Reanalysis of open neurophysiology data plainly works, and several prominent recent papers have been built substantially or entirely on public datasets ([Schneider et al., 2023](https://www.nature.com/articles/s41586-023-06031-6); [Burman et al., 2023](https://doi.org/10.1016/j.neuron.2023.08.005); [Pachitariu et al., 2024](https://www.nature.com/articles/s41592-024-02232-7); [Wakhloo et al., 2026](https://www.nature.com/articles/s41593-025-02183-y)). The obstacle is not that this kind of work is unwelcome. It is that the groups doing it tend to be computationally sophisticated ones that already know their way around standardized formats and cloud-hosted archives, and that expertise is distributed unevenly. The problem we can actually solve is that a great many neuroscientists who want to do this work have never been taught how: how standardized formats are organized, how to stream data from a cloud archive instead of downloading it, which analysis tools read NWB files directly, and how to judge whether a method developed on one lab's recordings will transfer to another's.

None of that is hard to learn. It is just rarely taught. Which is why my favorite line in this year's exit survey was this one:

> I didn't know it was so easy to get started with analysing open datasets!
>
> William Reith, Sainsbury Wellcome Centre

## The Same Program, Growing

The Summer School is the program we have run at Janelia every summer since 2022, with a bigger curriculum and a longer week. The structure that makes it work is not changing, because it works. Participants arrive with a reanalysis question they want to pursue, form teams around shared datasets and interests, take instruction in the mornings, and spend most of the week deep in project work with faculty and dataset stewards on hand. Teams present on the final day. Lectures and tutorials are recorded and published afterward. The 2027 installment will run under the NeuroDataReHack name.

## Curriculum

The foundation is the NWB standard and the DANDI Archive: file structure, validation, programmatic access, and search. From there participants get their hands on the analysis ecosystem that has grown up around the standard, including [SpikeInterface](https://github.com/SpikeInterface/spikeinterface) and [Kilosort](https://github.com/MouseLand/Kilosort) for spike sorting, [Pynapple](https://github.com/pynapple-org/pynapple) for time series analysis, [NeMoS](https://github.com/flatironinstitute/nemos) for fitting generalized linear models to spiking data, [Neurosift](https://neurosift.app/) for interactive visualization of remote NWB files, and imaging and behavior tools including [suite2p](https://github.com/MouseLand/suite2p) and [Facemap](https://github.com/MouseLand/facemap). Several of these tools are taught by the people who wrote them, which participants tell us every year is one of the best parts of the week.

Throughout, we work with real files rather than tidy prepared examples, and that is deliberate. Nearly all the difficulty in reanalysis lives in the parts of a dataset that do not match your expectations, and you cannot learn to handle that from a sanitized notebook.

## The AI Expansion

This is the piece the award primarily funds and the piece I am most eager to build out: foundation models for neural data, LLM-assisted analysis workflows, dimensionality reduction and neural decoding, and transfer learning across datasets and recording sessions.

We are not starting from zero here. The [2026 workshop](https://nwb.org/events/hck26-2026-janelia-ndrh/) already gave a section of the schedule to AI-assisted workflows, covering neural foundation models, development with LLMs, and coding agents, and it landed harder than almost anything else we taught. When we asked what participants wanted more of, tutorials on using AI agents effectively came back more often than any other answer. The award turns a handful of sessions into a substantial, properly supported strand running through a longer program.

## How We Fit Alongside Other Programs

Two other programs cover adjacent ground and both are excellent. [Neuromatch Academy](https://neuromatch.io/) teaches computational neuroscience and, more recently, NeuroAI, at a far larger scale and with no travel required. [NeuroHackademy](https://neurohackademy.org/) covers scientific computing, reproducibility, and data science for neuroimaging.

We do something narrower: reanalysis of neurophysiology data in the NWB format on the DANDI Archive, for people who arrive already having a programming background and some neurophysiology behind them. We schedule around these programs on purpose, so that anyone who would benefit from more than one can attend more than one.

## Partnership with HHMI Janelia

HHMI Janelia Research Campus has hosted and sponsored the program since 2022, and the campus is a huge part of why the week works as well as it does. Participants stay in private rooms on campus, a few minutes' walk from the rooms where the sessions run, so nobody is booking hotels, arranging transport, or arriving late because of traffic. Meals are provided throughout, and the kitchen cheerfully handles the full range of dietary requirements that thirty-odd people from a dozen countries turn up with, which sounds like a small thing until you have watched a workshop elsewhere lose an hour a day to people hunting for lunch. The meeting spaces are genuinely built for this kind of work, with room for teams to spread out, break off, and come back together, and with staff on hand who have done this many times and are wonderful at it. In the evenings the campus pub is open to the group, and a good deal of the best conversation of the week happens there rather than in any scheduled session.

Janelia sponsoring all of this is what lets us offer the program at no cost to participants. It also produces a level of sustained concentration that no distributed or virtual format I have seen comes close to. For six days, the people who can answer your question are in the building.

There is one real cost to a residential program on a single campus. It caps enrollment at roughly 35 people, it asks for a week away from everything else, and it requires travel to Virginia, which is a genuine barrier for international applicants and for anyone with caregiving responsibilities. We publish the recorded lectures every year, and those carry the instruction much further than the room does. They do not carry the project work, and the project work is what participants rate as most valuable. I would far rather run an outstanding week for 35 people than a diluted one for 300, but I will not pretend the trade is free.

## What Participants Said

At the end of every installment we ask participants whether they would like to leave a comment we can publish. These are three from 2026, and I will admit to rereading them more than once.

> Getting familiarized with open data is a critical skill for anyone who wants to think through their hypothesis before diving deep into an experimental project, or who needs to replicate results on new data. This workshop is a fantastic way to understand what data is already out there, how to use open science tools, and how to contribute yourself to the open data community.
>
> Estrella Villanueva Pivel, LMU Munich

> Collective data collection, data sharing and data reuse will be the future of neuroscience. This workshop is great for computational neuroscientists, and experimentalists who could benefit from using open data to complement their own research.
>
> Siyu Wang, National Institutes of Health

> Why wait for the experiments? Use open data now!
>
> Antonio Velázquez, Universidad Nacional Autónoma de México

## NeuroDataReHack 2027

The first installment supported by this award will be held at HHMI Janelia Research Campus in Ashburn, Virginia, from Monday, July 19 through Saturday, July 24, 2027, with participants arriving the evening of Sunday, July 18. The event is free to attend, including lodging on campus and meals. We will announce the opening of applications separately, with the full eligibility criteria and application details, and I would encourage anyone who has been thinking about reanalyzing open data to watch for it.

## What Five Years Lets Us Build

Until now the program has run one year at a time. Janelia's support has been generous and unwavering, but everything else was assembled annually, which meant the curriculum was largely rebuilt each spring and we could not commit to much beyond the coming summer. A five-year award changes the horizon we get to plan against, and honestly that is the part of this I am most excited about.

The most immediate difference is that teaching materials can accumulate instead of resetting. Tutorials that work can be maintained and revised across installments and published as a resource that outlasts the week they were written for. We can invite faculty further in advance, give applicants an answer earlier, and build the AI strand knowing it has years to develop rather than a single slot to fill in a schedule. We can also follow what participants do after they leave, which is the only real measure of whether any of this works and something we have never been able to do properly.

Five cohorts from now I expect this program to look meaningfully different from the one we ran this July, and I cannot wait to find out how.

## Acknowledgments

Enormous thanks to HHMI Janelia for hosting and sponsoring this program, to the faculty and advisory committee members from the NWB and DANDI teams, Allen Institute OpenScope, the International Brain Laboratory, and NeuroHackademy, and to the reviewers and program staff at NINDS. Most of all, thank you to the participants of the past five installments. The evidence that this program works came from your project outcomes and your survey responses, and the application would not have been competitive without you.
