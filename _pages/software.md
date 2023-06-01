---
layout: splash
title: "Software"
permalink: /software/
collection: software
sidebar:
  nav: "docs"
header:
  overlay_color: "#5e616c"
  overlay_image: /assets/images/neuro-software.jpg
feature_row:
- excerpt: |
    CatalystNeuro aims to accelerate the rate of scientific discovery by building open source solutions that bring data and software engineering solutions to neuroscience labs, and address the practical problems of researchers in the field. We integrate deeply with codebases across the open source community, so many of our contributions are in repositories that are part of other organizations.
feature_row1:
- title: "NeuroConv"
  excerpt: |
    NeuroConv is a library that automates the conversion from proprietary neurophysiology data formats to NWB.
    ### Collaborators
      - DANDI
      - MIT
      - NWB
      - LBNL
feature_row2:
- title: "NWB Inspector"
  excerpt: |
    NWB Inspector is a tool that scans NWB files for potential errors and areas of improvement, generating a comprehensive report.
    ### Collaborators
      - DANDI
      - MIT
      - NWB
      - LBNL
feature_row3:
- title: "NWB Guide"
  excerpt: NWB GUIDE is a graphical user interface (GUI) that offers a code-free solution for conversion to NWB (currently in progress).
feature_row4:
- title: "SpikeInterface"
  excerpt: We can help design and implement spike sorting pipelines using state-of-the-art algorithms using
    SpikeInterface.
---

{% include feature_row type="wide"%}
{% include feature_row id="feature_row1" type="wide" %}
{% include feature_row id="feature_row2" type="wide" %}
{% include feature_row id="feature_row3" type="wide" %}
{% include feature_row id="feature_row4" type="wide" %}