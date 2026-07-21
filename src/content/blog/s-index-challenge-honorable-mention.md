---
title: "Honorable Mention in the NIH S-Index Challenge"
date: "2026-05-30"
description: "Our team earned an honorable mention in the NIH Data Sharing Index (S-index) Challenge for the FAIR-Enhanced Data Sharing Index, a metric that rewards both the rigor and the reuse impact of shared datasets."
image: "/images/blog/s-index-banner.svg"
readTime: "4 min read"
keywords: ["S-index", "NIH", "data sharing", "FAIR", "open science", "NWB", "data reuse", "metrics"]
author: "Ben Dichter"
---

# Honorable Mention in the NIH S-Index Challenge

We are proud to share that a team led by CatalystNeuro earned an **honorable mention** in the [NIH Data Sharing Index (S-index) Challenge](https://www.freelancer.com/contest/NIH-Data-Sharing-Index-Sindex-Challenge-2470942/details). The challenge, led by the National Eye Institute with support from institutes and offices across the NIH, called on the community to design a quantitative metric for measuring how effectively researchers share data in ways that benefit future studies.

You can read our full submission here:

**[📄 Read our S-index submission (PDF)](/s-index-submission.pdf)**

## The problem: data sharing has no scoreboard

Sharing data advances discovery, improves reproducibility, and accelerates biomedical research. But scientists currently have little incentive to invest the substantial time and effort that effective data sharing requires. The [NIH Data Management and Sharing Policy](https://sharing.nih.gov/data-management-and-sharing-policy) is an important step forward, yet there is still no robust way to recognize the people, institutions, and journals that do this work well. High-quality data sharing remains largely invisible in the metrics that drive hiring, promotion, and funding decisions.

## Our proposal: the FAIR-Enhanced Data Sharing Index

We proposed the **FAIR-Enhanced Data Sharing Index (S-index)**, a metric that combines two things existing measures treat separately:

- **Data sharing rigor**, captured by an automated FAIR assessment that scores each dataset from 0 to 10 across Findability, Accessibility, Interoperability, and Reusability.
- **Data reuse impact**, captured by a citation count score that sums direct citations of a dataset, citations of the papers describing it, and citations of papers that reuse it.

A dataset's **Impact Score** is the sum of its FAIR-Score and its Citation Count Score. A researcher's **S-index** is then the largest number *n* for which they have at least *n* datasets with an Impact Score of at least *n*, the same elegant idea behind the h-index, applied to data. Crucially, the same calculation rolls up to **journals and institutions**, creating incentives across the whole research ecosystem rather than for individuals alone.

## Why it's different

The S-index builds on the previously proposed [data-index](https://doi.org/10.1002/ece3.8126), which rewards data reuse but not data quality. Our approach adds three key innovations:

1. **Dual-component evaluation**: it credits rigorous, well-documented data sharing *immediately*, before any citations have had time to accumulate, alongside long-term reuse impact.
2. **Tiered implementation**: a fully automated *Basic* tier built on existing infrastructure (DataCite, CrossRef, repository APIs, and ML-based FAIR assessment), an *Enhanced* tier adding scheduled checks and version tracking, and a *Comprehensive* tier with human review and dispute resolution.
3. **Multi-level application**: the metric works for researchers, journals, and institutions, with interactive dashboards and public leaderboards that make impactful, reusable datasets visible.

The result is a metric that rewards exemplary data stewardship both right away and over the long term, can be adopted progressively using tools that largely already exist, and nudges the entire scientific enterprise toward sharing and reusing data more effectively.

## The team

This work drew on deep experience building the standards and archives that make neurophysiology data reusable:

- **Benjamin K. Dichter** (Team Captain), Founder & CEO, CatalystNeuro
- **Ryan Ly**, Scientific Data Engineer, Lawrence Berkeley National Laboratory
- **Stephanie Prince**, Scientific Data Engineer, Lawrence Berkeley National Laboratory

Every member of the team has contributed to the [Neurodata Without Borders (NWB)](https://www.nwb.org/) data standard, giving us a firsthand view of what makes data truly reusable, and of the incentives that would motivate researchers to share it well.

We're grateful to the NIH for organizing the challenge and for spotlighting the importance of effective data sharing. This honorable mention marks the end of our involvement with this project, but we hope our submission might inspire others to implement strategies for tracking and rewarding open data achievements across the scientific community.
