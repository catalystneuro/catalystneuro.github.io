---
lab: "Robert Froemke"
institution: "New York University"
description: "Developed NWB conversion tools for the Froemke lab's studies of maternal behavior in mice, covering two-photon imaging and whole-cell recordings from auditory cortex (Schiavo et al., 2020) and electrophysiology and fiber photometry from the paraventricular nucleus of co-housed virgin females (Carcea et al., 2021)."
tags: ["behavioral tracking", "electrophysiology", "social behavior", "calcium imaging", "two-photon microscopy", "fiber photometry", "patch clamp"]
github: "https://github.com/catalystneuro/froemke-lab-to-nwb"
dandi:
  - url: "https://dandiarchive.org/dandiset/000249"
    name: "000249: Innate and plastic mechanisms for maternal behaviour in auditory cortex"
  - url: "https://dandiarchive.org/dandiset/000114"
    name: "000114: Oxytocin neurons enable social transmission of maternal behaviour"
date: "2022-04"
funded_project: ""
species: Mouse
---

The Froemke lab at New York University studies how the auditory cortex and the oxytocin system support maternal behavior in mice. We converted the data from two of the lab's papers, Schiavo et al. (Nature, 2020) and Carcea et al. (Nature, 2021), to NWB and published them on the DANDI Archive.

## Conversion of Imaging and Intracellular Recordings

The data for Schiavo et al. had been shared as a figshare collection, which we downloaded with nwb-conversion-tools. Two-photon imaging of auditory cortex, saved as ScanImage TIFF stacks, was converted with the ScanImage interface, and we added imaging metadata such as the GCaMP6f indicator and the 900 nm excitation wavelength. We also wrote conversions for the whole-cell recordings in the collection, stored as ABF files. These included in vivo recordings from naive and experienced females, where a second channel carries the pup call stimulus that we stored with the ndx-sound extension, and in vitro recordings from auditory cortex slices and oxytocin experiments. Lever-press times from the behavior files were stored with ndx-events.

## Conversion of Electrophysiology and Photometry

Carcea et al. recorded from the paraventricular nucleus of virgin female mice co-housed with a mother and her litter. We used NeuroConv's Blackrock interfaces for the raw recordings and sorted units, and wrote a custom interface for fiber photometry that stores the signal with the ndx-photometry extension. Behavioral annotations from the lab's spreadsheets were added to each session as a table of timed events.

## Publication on DANDI

The two-photon imaging from Schiavo et al. is published as Dandiset 000249, with 777 files from 54 mice totaling about 98 GB. The Carcea et al. data are in Dandiset 000114, which holds 14 electrophysiology sessions and 16 photometry sessions from 11 mice, about 387 GB in total.
