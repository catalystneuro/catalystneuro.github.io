---
title: "The Falling Cost of LLM Intelligence"
date: "2026-08-19"
description: "Progress in LLMs is usually reported as what the best model can do. This post uses Artificial Analysis's measured cost per task to trace the other direction of progress, how cheaply a given level of capability can be bought, and argues that it matters just as much: the ceiling unlocks new kinds of tasks, while the falling floor unlocks tasks that need to be done thousands of times."
image: "/images/blog/pareto-frontier-banner.png"
imageFit: "contain"
readTime: "12 min read"
author: "Benjamin Dichter"
keywords: ["LLM", "Pareto frontier", "cost per task", "Artificial Analysis", "Intelligence Index", "model pricing", "AI economics"]
---

<style>
.pfc-figure { background: var(--color-surface); border: 1px solid var(--color-line); border-radius: 10px; padding: 1.1rem 1.1rem 0.9rem; margin: 2rem 0; }
.pfc-figure figcaption { font-size: 0.8rem; color: var(--color-ink-soft); line-height: 1.5; margin-top: 0.6rem; border-top: 1px solid var(--color-line-soft); padding-top: 0.6rem; }
.pfc-legend { display: flex; flex-wrap: wrap; gap: 0.35rem 1.1rem; font-size: 0.8rem; color: var(--color-ink-muted); margin-top: 0.55rem; align-items: center; }
.pfc-lk { display: inline-flex; align-items: center; gap: 0.4rem; }
.pfc-swatch { width: 18px; height: 0; border-top: 2.5px solid; border-radius: 2px; display: inline-block; }
.pfc-dot { width: 9px; height: 9px; border-radius: 50%; border: 2px solid; display: inline-block; }
.pfc-tooltip { position: absolute; pointer-events: none; z-index: 50; background: var(--color-surface); border: 1px solid var(--color-line); border-radius: 6px; box-shadow: 0 3px 14px rgba(16,22,66,0.13); padding: 0.5rem 0.65rem; font-size: 0.78rem; line-height: 1.45; color: var(--color-ink-muted); max-width: 250px; display: none; }
.pfc-tt-name { font-weight: 600; color: var(--color-navy); font-size: 0.82rem; }
.pfc-tt-val { font-weight: 600; color: var(--color-navy); }
.pfc-tt-row { display: flex; align-items: center; gap: 0.45rem; }
.pfc-tt-key { width: 12px; border-top: 2.5px solid; border-radius: 2px; flex: none; display: inline-block; }
.pfc-figure img { width: 100%; height: auto; }
</style>


Progress in large language models is usually reported as what the best model can now do that no model could do before. That is the direction that produces headlines, and it has indeed been truly incredible. Each step up at the top of the range lets a model handle a kind of task that was previously out of reach, whether that is fixing a bug that spans a whole codebase or, lately, making progress on outstanding mathematical problems that had not been solved by anyone.

There is a second direction of progress that gets less attention, which is how cheaply a given level of capability can be bought. A great deal of useful work does not require the smartest model available, but a model that is good enough, applied many thousands of times. Reading every scientific paper on a topic, checking every contract in an archive for a particular clause, or summarizing every thread in a large discussion forum are tasks of this kind. For these, the question is not whether a model exists that can do the job, but whether it can do the job ten thousand times within a budget. The ceiling unlocks new kinds of tasks; the floor unlocks volume.

When you pick a model for an application you are trading off how capable it is against how much each call costs. For agentic coding I have focused almost entirely on capability, with the general sense that the improved quality of the work is worth the money, even when far cheaper models exist that are reasonably capable. My attention was recently drawn to the cost of the floor. We are measuring how often datasets shared on the DANDI Archive are reused in later publications, which means reading on the order of ten thousand candidate papers with a model and asking of each one whether it actually reused the data. At today's prices a full pass over the corpus costs a little over a hundred dollars with a model whose capability was at the frontier in the spring. At the prices of this past March, the same pass with the same level of capability would have cost several thousand dollars, and a year ago that capability was not available at any price. That change in the floor is what turned the analysis from a thing we could do on a sample into a viable project. I have been surprised by the progress across the cost spectrum, particularly how intelligent cheap models have become.

[Artificial Analysis](https://artificialanalysis.ai/) has been benchmarking intelligence and price across hundreds of models for a couple of years, and enough of that data is accessible to reconstruct the tradeoff. In particular, [this plot](https://artificialanalysis.ai/#intelligence-comparison-tabs) shows the intelligence index vs. the cost per task, providing a realistic cost estimate for different levels of model capability. The top line is what they define as the "Pareto line," the most capable models at a given price point. This line describes the true frontier of LLMs. I pulled data from artificialanalysis.ai and looked at how the Pareto frontier has moved as new models have been released. I think it is worthwhile to take a beat to review this progress and make some predictions for the next few months.

The short version: for a fixed capability level, cost is collapsing. A task at Intelligence Index 50, a level first reached in this data by GPT-5.4 in March at $1.10 per task, could be had for $0.03 by July.

## The Artificial Analysis Intelligence Index

The capability axis throughout this post is the Artificial Analysis Intelligence Index, so it is worth being clear about what that number is. The current version, v4.1.1, is a weighted average over nine evaluations grouped into four categories: agentic tasks at 34%, coding at 24%, scientific reasoning at 24%, and general capability at 18%. The weighting reflects where the field's attention is: a third of the score comes from a model's ability to complete multi-step agentic work, not from answering exam questions. The component evaluations, their weights, and the scoring details are documented in Artificial Analysis's [intelligence benchmarking methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking).

What you end up with is a single number that represents model capability, sort of like an IQ for LLMs. It isn't perfect, and two models with the same score may have different strengths, but I have found that this score does a reasonably good job of indicating a model's capability.

As a reference point, Anthropic's "Claude 4.5 Sonnet (Reasoning)" was for me and many others the first time a model felt capable enough to use in an agentic harness for writing code. At the time I was using Cline, and this model provided substantial productivity gains over auto-complete and copy/paste workflows. That model had an intelligence score of 37.4 (based on today's intelligence scoring system). The top current model is Claude Opus 5 max effort, at 63.1.

## Measuring Cost per Task

Cost per token is easily available, but different models can use a very different number of tokens, so a better indication of the cost of a model needs to take this into account. Cost per task is Artificial Analysis's own measured number: the average cost in USD to run one task from their Intelligence Index evaluation suite, including the input, reasoning, and answer tokens actually billed during the run. The website displays it but the free API tier does not include it, so I scraped it from the data embedded in each model's page on the site, covering both the models they currently benchmark and retired models whose pages still carry the measurement (older Claude Opus and Sonnet versions, the GPT-5.x line, and others). That yields measured cost for 137 models reaching back to DeepSeek V3 in December 2024, each paired with a release date and an Intelligence Index score on the current scale.

## How the Frontier Has Moved

The chart below plots intelligence against measured cost per task and traces the Pareto frontier, the cheapest way to reach each intelligence level, as it stands today and as it stood at two month intervals over the past year, using each model's release date to reconstruct what was available. Hover any point for the model behind it.

<figure class="pfc-figure">
  <div id="pfc-frontier"></div>
  <div class="pfc-legend" id="pfc-frontier-legend"></div>
  <noscript><img src="/images/blog/pareto-frontier-bimonthly.svg" alt="Intelligence Index versus cost per task with Pareto frontier lines every two months from August 2025 to August 2026" /></noscript>
  <figcaption>Intelligence Index against measured cost per Intelligence Index task (log scale). Gray points are all 137 measured models at their last measured cost; hollow points, both gray and colored, are models Artificial Analysis has retired from live benchmarking. Each line traces the cheapest way to reach a given Intelligence Index among models released by the snapshot date; markers are the frontier models themselves. Where successive frontiers share a segment, the older line is drawn on top, so a newer line is visible only where the frontier actually moved. Models whose pages no longer carry a measured cost (o3 and GPT-5.3 Codex among them) are absent (see caveats).</figcaption>
</figure>

Each successive frontier sits above and to the left of the last: more intelligence at the same cost, or the same intelligence for less. The right edge tells the capability story. The ceiling of the frontier rose from index 35.3 in August 2025 (GPT-5 at $0.26 per task) to 37.4 that October (Claude 4.5 Sonnet), 48.4 in February (Claude Sonnet 4.6), 55.0 in April (Claude Opus 4.7 at $2.23), 62.1 in June (Claude Fable 5 at $3.14), and 63.1 today (Claude Opus 5 at $2.34): twenty eight Intelligence Index points in a year. The left half shows the rising intelligence of cheap models. As of August 19, 2026, the GPT-5.6 Luna effort ladder now owns almost everything below index 52, with the level that was the August 2025 ceiling available for $0.0088 per task.

Reasoning effort controls mean a single model is not a point on this chart but a segment: the GPT-5.6 Luna ladder runs from $0.0088 at low effort to $0.047 at max and covers the whole lower half of the frontier, while Claude Opus 5 spans $0.43 at low effort to $2.34 at max and buys about ten Intelligence Index points along the way. Effort is now a key dial in the cost/intelligence trade-off, and this dial requires that any analysis of capability must also consider cost.

The records view tracks the cheapest measured cost per task achieved by any released model at or above a given Intelligence Index tier. The series reaches back to mid 2025 for the lower tiers, and higher tiers appear when they become available.

<figure class="pfc-figure">
  <div id="pfc-records"></div>
  <div class="pfc-legend" id="pfc-records-legend"></div>
  <noscript><img src="/images/blog/pareto-tier-records.svg" alt="Running minimum measured cost per task at each Intelligence Index tier, by release date" /></noscript>
  <figcaption>Each step is a released model that set a new low for its tier; hollow markers are retired models. A tier's line begins when the first model with measured cost crosses that Intelligence Index threshold. GPT-5.6 Luna is placed at its launch price from July 9 and at its current price from the July 30 price cut; all other costs reflect current prices (see caveats).</figcaption>
</figure>

| Tier | First measured crossing | Cost collapse | Halving time |
|---|---|---|---|
| Index &ge; 30 | Aug 2025 (GPT-5 high) | 29x | ~73 days |
| Index &ge; 40 | Feb 2026 (Claude Sonnet 4.6) | 56x | ~28 days |
| Index &ge; 50 | Mar 2026 (GPT-5.4 xhigh) | 35x | ~29 days |
| Index &ge; 60 | Jun 2026 (Claude Fable 5 max) | 3.8x | ~34 days |

A capability level is first reached by a large frontier model at a premium price. After some time, cheaper models arrive at the same level, and the record steps down by an order of magnitude or more. The &ge; 40 tier opens with Claude Sonnet 4.6 in February at $1.22 per task, undercut within two days by Gemini 3.1 Pro Preview at $0.33; MiMo-V2.5-Pro, an open weights model, cut the record to $0.034 in April, and GPT-5.6 Luna on high effort holds it at $0.022 today. The &ge; 50 tier follows the same arc a month behind: GPT-5.4 crossed it in March at $1.10, GPT-5.5 and then GLM-5.2 and Grok 4.5 walked the record down through the spring, GPT-5.6 Luna's xhigh setting took the record at $0.16 when it launched on July 9, and OpenAI's 80% price cut on July 30 brought it to $0.032, a 35 fold drop in five months.

The mechanism is visible in the model names that set each record. The first crossing is a maximum effort frontier model priced at launch premium, most often from Anthropic or OpenAI. Following this, small distilled models from the big labs (the GPT-5.6 Luna line holds three of the four current records), and open weights releases (MiMo, DeepSeek V4, GLM, Hy3) drive rates down dramatically. Across the tiers with enough history to measure, the records halve roughly every four to ten weeks.

The top tier is where the premium survives. Only six models score 60 or above, and the cheapest of them, Grok 4.6, still costs $0.84 per task. But that record has fallen 3.8x since June, and if the pattern from lower tiers holds, a distilled model at this level should collapse the price within a couple of quarters.

To me, the most impressive result is the low price of OpenAI's "GPT-5.6 Luna" given its intelligence. Now, the intelligence of Anthropic's "Claude 4.5 Sonnet (Reasoning)" that set off the coding harness revolution 10 months ago is available using "GPT-5.6 Luna (medium)" for 1/40th the cost! That figure depends on the July 30 price cut; at Luna's launch price three weeks earlier, it would have been 1/8th.

## Caveats

The most important limitation is that costs are the latest measured values indexed by release date, not historical measurements taken at release. Prices get cut over a model's life, so early points reflect any cuts since launch, which biases the analysis toward understating the collapse and toward dating it too early. The one cut I have corrected for is the largest recent one: OpenAI cut GPT-5.6 Luna's prices by 80% on July 30, 2026, three weeks after its July 9 release (Terra was cut by 20% on the same day and Sol was unchanged). Since a price cut does not change the number of tokens a task uses, I reconstructed Luna's launch cost per task by scaling the measured value by the price ratio, and in the records chart and table Luna's records are dated to the cut rather than to the release. This lengthens the measured halving times for the three lower tiers by a few days each. Other models may have had cuts I did not find, and a retired model's last measured price may not be the one it launched at. Coverage is the second issue. Retired models are included only when their pages still carry the measurement, which recovered 44 of 228 retired models with prices and scores; the rest, o3, GPT-5.3 Codex, and everything from the GPT-4 era among them, are invisible, so the oldest frontiers rest on fewer models than actually existed and the true opening price of the lower tiers was likely set by models this analysis cannot see.

The retired models' Intelligence Index scores are on the current scale, but the Index itself is one aggregate of many evaluations. And cost per task on an evaluation suite is a reasoning heavy workload with long prompts; a chat workload with short prompts and short answers would scale differently across models, particularly between reasoning and non-reasoning variants.

## Predictions

Extrapolating measured rates is risky, since each collapse is a competition event rather than a law, but the arcs have been regular enough to be worth putting numbers on. At the ≥ 60 tier's current halving time of about 34 days, Grok 4.6's $0.84 record falls below ten cents around the start of December. Index 55, which Grok 4.5 holds at $0.36 today, should cost under a dime by mid October. The ceiling is harder to call: it climbed twenty eight points over the year but only one point since June, which reads as saturation of the current index rather than a slowdown in the models, so I expect the next milestone there to be an index revision rather than a big number. And if the pattern of the last four tiers holds, whatever the revised index calls the frontier will debut at a few dollars per task and be commoditized within a quarter.

## What I Take from This

The motion of the frontier is more predictable than any individual release. Every capability tier so far has followed the same arc: premium debut, rapid commoditization, a settled record held by a distilled or open weights model at a few percent of the debut price. If a capability exists at any price today, the sensible planning assumption is that it will exist at commodity price within months. For system design, that argues for architectures where the model is a swappable component and the routing between capability tiers is explicit, because the tier boundaries themselves have not settled and show no sign of settling soon.

The two directions of progress serve different kinds of work. A higher ceiling changes what is possible at all: the tasks that no model could do last year and one model can do now. A lower floor changes what is affordable at scale: the tasks that one model could already do, but not ten thousand times. The literature scan that motivated this post is a floor problem. The model only needs to read a paper and answer a well defined question, which models well below the current frontier handle reliably, but it needs to do that for every candidate paper, and the difference between $1 and $0.02 per paper is the difference between a pilot study and a complete census. Legal discovery, systematic reviews, large scale data curation, content moderation, and customer support triage have the same shape, and all of them get cheaper by an order of magnitude roughly every few months without any change in the work itself.

The practical consequence is that the set of problems worth attempting with a model is expanding from both ends at once, and the expansion at the cheap end is the one that is easy to miss. Cost-sensitive developers, particularly in economically disadvantaged regions, can now run capable coding agents at a tiny fraction of last year's cost. And any workload that was priced out a year ago is worth re-estimating now: at GPT-5.6 Luna prices, a thousand tasks cost about ten dollars.

*Model metadata pulled from the Artificial Analysis free API, and measured cost per task scraped from the model pages on artificialanalysis.ai, on August 19, 2026. Corrections welcome.*

<script src="/js/pareto-frontier-charts.js" defer></script>
