---
name: "Sharing Neurophysiology Data: NWB and DANDI"
description: "A practical guide for newly funded NIH labs: what the data sharing policy expects, converting your data to NWB, checking the result, and publishing on the DANDI Archive"
type: "guide"
docs: "https://docs.dandiarchive.org/"
---

You have a new NIH award, and in the application you committed to
sharing the data it produces. This page explains our recommendations
for sharing neurophysiology data: extracellular electrophysiology,
intracellular recording, patch clamp recordings, calcium imaging, fiber
photometry, and the behavioral data that accompanies them. It covers
what NIH expects, what the Neurodata Without Borders (NWB) format is,
how to convert your data with NeuroConv, how to check the result, and
how to publish it on the DANDI Archive.

It is written for the PI who has to make a plan and for the person in
the lab who will actually do the work.

## What the NIH Data Sharing Policy Expects

NIH's Data Management and Sharing (DMS) Policy (NOT-OD-21-013) applies
to applications submitted on or after January 25, 2023. It requires
that labs share their data at publication, or by the end of the award
period, whichever comes first. If your research generates scientific
data, you submitted a two-page Data Management and Sharing Plan with
the application. NIH's guidance on selecting a repository
(NOT-OD-21-016) sets out desirable characteristics: persistent unique
identifiers, long-term sustainability, rich metadata, curation and
quality assurance, documented access and reuse terms, provenance, and a
retention policy. A lab website, a shared Google Drive, and "available
upon reasonable request" satisfy none of these. A domain repository
does.

For neurophysiology, the domain repository is the **DANDI Archive**.

## What NWB Is

**Neurodata Without Borders (NWB)** is a data standard for
cellular-level neurophysiology. It is the standard NIH BRAIN Initiative
projects use and the one DANDI is built around.

The core idea is that a single NWB file holds one session of data in
one self-describing file with a documented schema: the recordings, the
processed results, the stimulus, the behavior, and the metadata
describing the subject and the hardware. Someone who has never met you
should be able to open the file and know what the columns mean, when
things happened on a common clock, and what electrode recorded what.

NWB files are HDF5 by default (a Zarr backend also exists). The parts
you will care about:

- **Acquisition**: raw acquired signals, such as `ElectricalSeries` for
  extracellular voltage traces, `PatchClampSeries` and its subclasses
  for intracellular recording, and `ImageSeries` / `TwoPhotonSeries`
  for imaging.
- **Stimulus**: what you presented and when.
- **Processing modules**: derived results in conventional locations. An
  `ecephys` module holds spike sorting output, an `ophys` module holds
  segmentation and fluorescence traces, and a `behavior` module holds
  position, licks, pupil, and pose estimates.
- **Units table**: sorted units with spike times, plus whatever quality
  metrics and waveform information you have.
- **Electrodes table / imaging planes**: the spatial and device
  description of where the signal came from.
- **Trials and epochs**: an interval table for task structure, with
  arbitrary custom columns.
- **Subject and session metadata**: species, sex, age, strain,
  identifier, session start time with timezone, experimenter,
  description, and related publications.

**Time alignment is explicit.** Data streams do not need to be
resampled to a common sampling rate, but they do need to be expressed
in relation to a common timebase, either as a start time plus a
sampling rate or as an explicit timestamps array. Much of the real work
in a conversion is establishing that alignment between the acquisition
system, the imaging clock, and the behavioral rig. You will need to
perform alignment before writing to NWB.

**The standard is extensible.** If you have a data type the core schema
does not cover, you write a Neurodata Extension (NDX) rather than
stuffing it into a free-text field. There is a
[catalog of existing extensions](https://nwb-extensions.github.io/);
check it before writing one.

### Acquisition

[AqNWB](https://github.com/NeurodataWithoutBorders/aqnwb) is a C++ API
for writing NWB directly from acquisition systems, so recording
software that adopts it can produce NWB files during the experiment
with no conversion step at all. For most labs, conversion is a step
that happens after acquisition, ideally soon after each session, as a
routine part of the pipeline rather than as a project at the end.

## Converting Your Data: NeuroConv

[**NeuroConv**](https://neuroconv.readthedocs.io/) is an open-source
Python library that simplifies conversion from common neurophysiology
formats. It supports automatic conversion from a long list of
proprietary and open acquisition formats into NWB (currently 62 as of
this writing). See the
[Conversion Gallery](https://neuroconv.readthedocs.io/en/stable/conversion_examples_gallery/index.html)
for a full list of supported formats and example code for how to
install and use them.

The workflow is the same regardless of the sources:

1. **Pick an interface per data stream.** Each format has a
   `DataInterface` class that knows how to read it and where its
   contents belong in NWB.
2. **Combine interfaces into a converter.** An `NWBConverter` bundles
   the interfaces for one session (say, SpikeGLX raw plus Kilosort
   output plus DeepLabCut pose plus your task events) and handles
   writing them into one file.
3. **Supply metadata.** Interfaces auto-extract what they can from the
   recording files: sampling rate, channel map, device settings. The
   rest (subject, species, session description, experimenter, protocol)
   comes from a metadata dictionary, usually kept as a YAML file so it
   is reviewable and reusable.
4. **Align the clocks.** NeuroConv has explicit temporal-alignment
   helpers for this. Decide which stream is the reference and align the
   others to it; do not assume two systems that started "at the same
   time" agree.
5. **Run it once per session.** The conversion script becomes part of
   your pipeline, and each new session costs you nothing.

The [NWB Assistant](https://nwb-assistant.neurosift.app/chat) is a
chatbot that has access to all the NeuroConv docs and can help with
your conversion. Just ask it a question like "How do I convert SpikeGLX
data to NWB" and it will guide you through the process. Or you can work
through the
[User Guide](https://neuroconv.readthedocs.io/en/stable/user_guide/index.html)
yourself.

### Custom Data

Most labs have at least one thing NeuroConv does not already handle: a
homemade behavioral rig, an idiosyncratic trial-structure file, a lab
format that predates the current acquisition system. You can add these
to the file using [PyNWB](https://pynwb.readthedocs.io/) or
[MatNWB](https://matnwb.readthedocs.io/).

### Practical Advice

- **Convert one session end to end before you scale.** A complete
  single session surfaces every metadata and alignment problem you
  have.
- **Do it early in the award.** The information needed to interpret a
  recording (what that channel was, why that session is odd) decays
  fast, and the person who knows it graduates.
- **Keep the conversion in version control** alongside the metadata
  YAML. It is part of the "related tools, software, and code" you
  committed to sharing.
- **Do not throw away the raw files** when you convert. NWB is the
  shareable representation, not a replacement for your archive.

## Checking Your Files: Validation, NWB Inspector, and Your Own Eyes

There are three distinct checks, and you want all of them: schema
validation, best-practice review, and actually looking at the data.

**Schema validation** answers "is this a structurally valid NWB file?"
It is built into PyNWB and it is a hard pass/fail.

**NWB Inspector** is a library of checks that scans NWB files for
common issues. The goal is to automatically inspect NWB files for
inconsistent or missing metadata.

Inspector findings are graded by importance, from critical problems
down to suggestions. Run it on your first converted session, fix what
it finds, and then run it as part of the conversion script so problems
never accumulate.

DANDI runs validation on upload, so anything you skip here you will
meet later. Running Inspector locally with the DANDI configuration
before you upload is the shortest path.

```bash
pip install nwbinspector
nwbinspector path/to/nwbfile_or_directory --config dandi
```

The [NWB Inspector documentation](https://nwbinspector.readthedocs.io/)
covers report formatting, selecting or skipping specific checks, and
running with multiple jobs on large directories.

### Look at the File: Neurosift

Validation tells you the file is well formed; it cannot tell you the
data is right. [Neurosift](https://neurosift.app) is a browser-based
viewer for NWB files, and it runs on local files before you have
uploaded anything:

```bash
pip install --upgrade neurosift
neurosift view-nwb path/to/session.nwb
```

This opens the file in your browser. Browse every stream you expect to
be there: the raw traces, the units table, the trials, the behavior. A
conversion that silently dropped a stream, mislabeled a channel, or
shifted a timebase is much easier to catch by eye than by validator.

### A Sanity-Check Notebook

We recommend going one step further: write a short notebook that reads
the converted file and produces one figure your lab would recognize as
correct, such as a PSTH aligned to a trial event. A PSTH is a good
choice because it exercises several streams at once: the units table,
the trials table, and the time alignment between them. If the PSTH
looks the way it did in your original analysis, the streams made it
into the file correctly; if the alignment is off by a constant, this is
where you will see it.

Neurosift helps you write that notebook: each object it displays has a
Python tab showing the code to load that stream from the file, so you
can assemble the notebook by copying the snippets for the objects you
care about. Keep the notebook next to the conversion script and rerun
it on a sample session from each conversion batch.

## Publishing on DANDI

The **DANDI Archive** ([dandiarchive.org](https://dandiarchive.org)) is
a public repository for cellular neurophysiology data, funded by the
NIH BRAIN Initiative. It is free to deposit and free to download, and
it is designed around NWB and BIDS.

A dataset on DANDI is a **Dandiset**: a collection of NWB files with
dataset-level metadata (description, contributors, funding including
your award number, species, techniques, license). It has a persistent
identifier from the moment you create it.

The [DANDI documentation](https://docs.dandiarchive.org/) is good, and
we will not duplicate it. What follows is the map: what the steps are,
which ones deserve strategy, and where the manual for each one lives.

### The Deposit Workflow

1. **Create an account**
   ([docs](https://docs.dandiarchive.org/getting-started/creating-account/)).
   DANDI accounts are created through GitHub; you get an API key from
   your DANDI profile page.
2. **Create a Dandiset**
   ([docs](https://docs.dandiarchive.org/user-guide-sharing/creating-dandiset/))
   through the web interface. Do this early: you can cite the
   identifier in a progress report before the data are finalized.
3. **Organize and validate locally**
   ([docs](https://docs.dandiarchive.org/user-guide-sharing/validating-files/)).
   The DANDI CLI's `organize` command arranges your NWB files into the
   required layout using metadata already inside the files, and
   `dandi validate` catches problems before you spend bandwidth.
4. **Upload**
   ([docs](https://docs.dandiarchive.org/user-guide-sharing/uploading-data/))
   with `dandi upload`. Large uploads resume; you are not going to lose
   a week to a dropped connection.
5. **Complete the dandiset metadata**
   ([docs](https://docs.dandiarchive.org/user-guide-sharing/dandiset-metadata/)).
   After upload, go back to the web interface and fill in the
   dandiset-level metadata: description, contributors with their roles,
   funding information, license, keywords, and related publications.
   This is what makes the dataset findable and citable, and publishing
   is blocked until the required fields are complete.
6. **Publish a version**
   ([docs](https://docs.dandiarchive.org/user-guide-sharing/publishing-dandisets/))
   when you are ready to make a citable snapshot.

### Draft Versus Published Versions, and DOIs

A Dandiset has a mutable **draft** version that you keep editing, and
immutable **published versions** that you create when you want a fixed,
citable snapshot. Publishing a version mints a **DOI** for that
version. That DOI is what goes in your paper, your RPPR, and your data
availability statement. Because versions are immutable, a reader who
follows the DOI in your 2027 paper sees exactly the data you analyzed,
even after you have added two more years of sessions to the draft.

This is the concrete answer to "persistent unique identifiers" in your
DMS Plan, and it is the evidence of compliance you will be asked for.

### Embargo

You do not have to make data public the day you upload it. DANDI
supports **embargoed Dandisets** (chosen when you
[create the dandiset](https://docs.dandiarchive.org/user-guide-sharing/creating-dandiset/)):
you supply the NIH award number, the data are uploaded and stored
privately, and only you and collaborators you grant access can see
them. The Dandiset becomes public when you un-embargo it, which you do
at publication, or by the end of the award period, per NIH's
expectation.

Embargo is the mechanism that lets you comply and still control the
timing of your first paper. Use it. The failure mode we see is not labs
that share too early; it is labs that plan to share "when the paper is
out," never set anything up, and then face a conversion of four years
of heterogeneous data under deadline.

### What to Write in Your DMS Plan

If you are still drafting or revising a plan, the paragraph that
satisfies the standards and repository elements for a neurophysiology
lab looks roughly like this:

> Electrophysiology, imaging, and behavioral data will be converted to
> the Neurodata Without Borders (NWB) standard and deposited in the
> DANDI Archive, the NIH BRAIN Initiative archive for cellular
> neurophysiology data. Data will be uploaded under embargo as they are
> collected and released no later than the time of publication of the
> associated findings or the end of the award period, whichever comes
> first. Each released version receives a DOI, which will be cited in
> the resulting publications. Conversion and analysis code will be
> released in a public repository under an open license.

Adapt it to what you will actually do. A plan you do not follow is
worse than a modest plan you do.

## Where to Get Help

All of this is open source with an active community, and asking is
usually faster than reading.

- [**NWB Overview documentation**](https://nwb-overview.readthedocs.io/):
  the entry point for the format, the Python and MATLAB APIs, and
  tutorials.
- [**NeuroConv documentation**](https://neuroconv.readthedocs.io/): the
  user guide and the conversion gallery with worked examples per
  format.
- [**NWB Inspector documentation**](https://nwbinspector.readthedocs.io/):
  the best-practice check list and the CLI.
- [**DANDI documentation**](https://docs.dandiarchive.org/): the
  deposit workflow end to end, and its
  [support page](https://docs.dandiarchive.org/support/) lists the
  current ways to reach the DANDI team.
- [**NWB Help Desk**](https://github.com/NeurodataWithoutBorders/helpdesk/discussions):
  a public question-and-answer forum where the developers answer
  conversion questions. This is the right place for "how do I represent
  X in NWB".
- [**Training events**](https://www.nwb.org/events/): NWB user days,
  developer days, and hackathons run regularly, and several are virtual
  and free.

When you ask, include the acquisition system, the analysis outputs you
need to store, and one example of the awkward part.

## FAQ

**Do I have to use NWB? The policy says "standard," not "NWB."**
The policy asks you to use community standards where they exist. For
cellular neurophysiology, NWB is that standard, and it is what the
domain repository accepts. You could deposit raw proprietary files
somewhere generic and technically share data, but reviewers, program
staff, and anyone reusing your data will notice the difference.
Ultimately, the requirements and expectations for your grant will be
determined by your NIH program officer.

**When do I actually have to share?**
No later than the time of the associated publication or the end of the
award period, whichever comes first, unless your funding opportunity or
Notice of Award says something stricter, which BRAIN awards often do.

**Can I share data before I publish without being scooped?**
Yes: upload under embargo. The data are stored and versioned privately
and become public when you release them.

**How long does a conversion take?**
The first session of a given data type is the expensive one: days to
weeks depending on how unusual your setup is and how good your metadata
records are. Every session after that is a script run. Labs that
underestimate this are usually underestimating the metadata and clock
alignment, not the file writing.

**Can I convert at the end of the project instead?**
You can, and it will cost you several times more. Sessions from four
years ago come with missing notes, departed personnel, and formats from
two acquisition-software versions ago.

**What about human subjects data?**
DANDI does not support HIPAA-compliant data sharing. All human data
must be de-identified before upload. In practice that means removing
all HIPAA identifiers before conversion: no names or medical record
numbers anywhere in the file (including free-text descriptions and file
names), ages instead of birth dates, and session dates shifted or
coarsened per your protocol. Watch the streams that carry identity
indirectly: audio tracks with voices, video showing faces, and any
photographs. Your consent language and IRB protocol govern what you may
share at all, so involve your IRB early; an embargoed dandiset is still
an upload and does not relax any of this.

**Does DANDI charge, and is there a size limit?**
Deposit and download are free. Large datasets, including raw
electrophysiology at full sampling rate, are normal there: any size of
standardized dataset is accepted, with a limit of 5 TB per file, and
the archive asks that you
[contact them](https://docs.dandiarchive.org/support/) before a deposit
larger than 10 TB.

**Does the data have to be published to get a DOI?**
Publishing a version on DANDI mints a DOI for that version; that is
what "published" means in the archive's sense. It does not require a
journal article.

**What if my data type is not in NWB?**
Check the extension catalog first; someone has often had the same
problem. If not, an extension is the supported route, and the help desk
will point you at examples.

**Who in my lab should do this?**
Whoever runs the pipeline, not the newest rotation student. It is a
software task with a data-provenance component, and it needs someone
who knows the rig.

## Talk It Through

If you would rather work through this with us, we offer a free
30-minute call for newly funded labs. It is educational: what the
sharing requirements mean for the data types you are actually
collecting, what a conversion would involve for your rig, and what the
shortest path to a deposit looks like. No obligation and no preparation
needed.

**[Book a 30-minute intro call](/book-intro)**

CatalystNeuro builds data conversion pipelines for neurophysiology labs
and maintains NeuroConv and much of the NWB conversion tooling
described above. If you want hands-on help, that is what we do. But
everything on this page is something your lab can do without us.
