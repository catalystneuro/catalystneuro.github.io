---
title: "SCPAB NWB Adoption"
funder: "Simons Foundation"
status: "completed"
startDate: "2023-07-01"
description: "Simons Foundation support for converting whole-brain imaging data from Simons Collaboration on Plasticity and the Aging Brain labs to NWB"
image: "/images/sponsors/simons_foundation_logo.avif"
---

The Simons Collaboration on Plasticity and the Aging Brain (SCPAB), which the Simons Foundation launched in 2020, studies mechanisms of resilience and functional maintenance in the aging brain across many model systems. Through SCPAB, the Simons Foundation funded CatalystNeuro to help labs in the collaboration convert their data to Neurodata Without Borders (NWB) and publish it on the DANDI Archive.

The work covered two whole-brain calcium imaging datasets from invertebrate model systems: volumetric two-photon imaging in Drosophila walking on an air-suspended ball, and a signal propagation atlas of C. elegans built by stimulating single neurons optogenetically while imaging the whole brain. For the fly data we wrote an imaging extractor for the lab's NIfTI volumes and Bruker metadata and added FicTrac ball tracking and atlas-registered processed volumes. The worm data used the ndx-microscopy, ndx-patterned-ogen, and ndx-subjects extensions to store volumetric imaging, targeted stimulation, and C. elegans subject information. Both datasets are published as Dandisets 000727 and 001075, together about 4.7 TB from 9 flies and 113 worms.
