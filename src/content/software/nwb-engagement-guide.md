---
name: "NWB Adoption Engagement Guide"
description: "Guide for labs working with CatalystNeuro on NWB data conversion projects"
type: "guide"
docs: "/guides/nwb-engagement-guide"
---

#### Welcome to your NWB adoption engagement with CatalystNeuro!

CatalystNeuro is an international neuro-data science team that specializes in helping neurophysiology labs develop custom software pipelines that convert data from their particular data streams and file formats to the Neurodata Without Borders (NWB) data standard. We have built data standardization solutions for [over 60 labs](/nwb-conversions) from 19 different research institutions, and have developed software and expertise in understanding and transforming large and varied neurophysiology data.

Our pipelines use core software to handle large data volumes from multiple simultaneous data streams, packaging this data into NWB files that are compatible with the [DANDI Archive](https://dandiarchive.org) and optimized for cloud computing. These pipelines are released as open source GitHub repositories that the labs are able to copy, modify, and run. We can also help labs upload this data to the [DANDI Archive](https://dandiarchive.org), either in embargo mode or as released public data.

## Project Scope

A typical engagement starts with a kick-off meeting, where we will discuss the scope of the project, what we need from the lab, and what they can expect from us. We will then send a scope of work, which establishes the aims for the project based on the kick-off meeting. After setting up a point-person and transferring data, we will explore the data, asking detailed questions and scheduling meetings as necessary to gather all of the metadata that is essential for publication and understand the data in sufficient detail to build the conversion. The project may have a mid-way meeting, and will conclude with a final meeting where the CatalystNeuro team presents our conversion solution to the lab and ensures that it meets their needs. We can also provide a technical handoff meeting, where we help the lab install the software on their own computers and teach them how to run it and make minor modifications.

Projects may also involve integrating NWB I/O into the data processing tools currently used by the lab, building interactive visualizations of NWB data, and/or building advanced data processing pipelines.

## Core NWB Software

Through these engagements over several years, we develop key software that provide more and more automation for the building of conversion pipelines, allowing us to build solutions for labs that are faster to implement, more performant, and less error-prone. This core software is also released as open source, so anyone can use it to create their own conversion pipelines. This includes the following libraries:

- **[NWB GUIDE](https://nwb-guide.readthedocs.io)** (GUI for Data Entry) provides a user-friendly no-code graphical user interface for converting data to NWB, inspecting NWB files, and exploring the data within NWB files.
- **[NeuroConv](https://neuroconv.readthedocs.io)** automates conversion of data from common formats into the Neurodata Without Borders (NWB) format for distribution on the [DANDI Archive](https://dandiarchive.org). When working with new labs, we tend to devote some of the effort to incorporating code of any new formats into these libraries for use in future conversion projects by ourselves or others.
- **[NWB Inspector](https://nwbinspector.readthedocs.io)** scans NWB files for common mistakes and ensures adherence to best practices.

## Kick-off Meeting

We have a kick-off meeting with a lab to determine what data we will be converting and to assign a point person in the lab. During this meeting, we want to establish:

- What data will be converted? Is it associated with a publication or pre-print?
- Information gathering about the dataset.
- Is the data ready to be submitted to DANDI? Would it be published in embargo mode or not?
- How will the data be transferred (see [Data Transfer](#data-transfer))?
- Who would be the point-person for the lab?
- What is the expected timeline for this project.

## Point-person

The lab point-person is a key role for a good lab engagement. This person is responsible for transferring the source data, for providing documentation for any confusing aspects of the data, and for answering detailed questions. The point person does not generally need to develop code for this project, but should be technical, as many of the questions involve details of how to read and interpret the data, and gather any missing metadata. The point-person may not know the answer to every question we ask, but nonetheless they are responsible for routing the question to the necessary personnel from the lab and ensuring that we get the information we need. This can be a non-trivial amount of work, but it is essential for us to be able to build an accurate conversion pipeline.

## Data Transfer

We set up a data transfer so we can get our hands on the data in its current format.

We usually suggest using Globus Connect to transfer data, as it is fast, reliable and can handle TBs of data. Here are some [step-by-step instructions](https://catalystneuro.com/guides/globus-guide.md) for how to utilize Globus to upload your data to our size-unrestricted Google Drive folder. We are also able to access data in other ways. When possible, it is better to store the data as they come out of the acquisition system (raw data) and the output of the preprocessing pipeline.

## Information on the Dataset

Any information on the dataset and technologies/methodologies used are welcome. It will help the CatalystNeuro team speed up the initial process of data examination.

We suggest providing a preliminary README file, with the following pieces of information:

- Is there a paper related to this dataset?
- What acquisition systems were used? Is there any specific software to read it?
- How do you synchronize data from different streams?
- Is there a task? If so, what is the task structure?
- What behavioral data was collected, if any?
- Data processing pipeline documentation (graphical workflow / list of steps)
- How do the experiments described in the paper correspond to data in the shared folder? (Schematic description of how data are organized)
- Are there any niche file types, and what acquisition systems did they come from?
- Where in the shared folder does the critical metadata live?
  - subject sexes and ages?
  - session start times?
  - session notes (session id, subject id)?
