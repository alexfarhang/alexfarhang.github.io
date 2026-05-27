---
layout: distill
title: "AgentBayes: Open-Ended Scientific Model Discovery"
description: An agentic system for Bayesian model discovery.
img: assets/img/agentbayes/AGB-logo.png
importance: 1
permalink: agentbayes
category: research
date: 2026-05-25

authors:
  - name: Alexander R. Farhang
    url: "https://alexfarhang.github.io"
    affiliations:
      name: Caltech
  - name: Anne L. Erickson
    url: "https://annieerickson.github.io"
    # affiliations:
    #   name: Caltech
  - name: Atharva Sehgal
    url: "https://atharvas.net"
    # affiliations:
    #   name: Caltech
  - name: Yisong Yue
    url: "https://www.yisongyue.com"
    # affiliations:
    #   name: Caltech

bibliography:

toc:
  - name: The structure of scientific data
  - name: The approach
  - name: Highlights
  - name: Code & citation
---

AgentBayes is an agentic system that performs the full Bayesian modeling workflow on real scientific datasets: exploring the data, proposing probabilistic models, fitting them, critiquing them against what the data actually looks like, and revising.

It pairs two agents. An **Interactor** explores raw data and fitted posteriors through code execution (writing its own analysis and plotting code) for data exploration, model critique, and open-ended posterior predictive checks. A **Modeler** converts the Interactor's findings into structurally diverse probabilistic programs and fits them to the data.

Work that can take days to weeks of expert researcher time runs in hours of agent time. In our case studies, the agent surfaces overlooked structural patterns in the data and adjusts its models accordingly, and the system scales to larger scientific datasets than existing LLM-driven Bayesian methods.

<p>
  <a href="{{ '/assets/pdf/AgentBayes-preprint.pdf' | relative_url }}" class="btn btn-sm z-depth-0" role="button" target="_blank" rel="noopener">📄 Preprint (PDF)</a>
</p>

### The structure of scientific data

Scientific data often isn't flat. Measurements can nest within individuals, individuals within groups, and noise enters at every level. 
Hierarchical Bayesian models explicitly model this structure and jointly handle measurement uncertainty, group structure, and how variation arises at each level. But writing these models can be time-intensive, expert-driven work that is inherently iterative and requires a full understanding of the process, from the scientific phenomena to the exact statistical modeling choices.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/agentbayes/hierarchy_vs_flat.png" title="Hierarchical Bayesian model vs. a single equation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
  A hierarchical Bayesian model (top right) captures how the data was generated: per-group structure, partial pooling across subjects, explicit noise. A single equation (bottom right) collapses all of that into one curve through the cloud of points: a point estimate, no priors, no hierarchy.
</div>

Existing LLM-driven systems for scientific modeling mostly look for a single equation that predicts the outcome. "An equation that predicts y" is not the same as "a model of how y was generated." The latter gives you more: interpretable group-level structure, calibrated uncertainty, and the ability for sparsely observed units to borrow strength from related ones.

### The approach

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/agentbayes/architecture.png" title="AgentBayes architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
  AgentBayes uses two alternating LLM agents to perform the full Bayesian workflow. The Interactor explores raw data and critiques fitted models in a multimodal python sandbox; the Modeler proposes and fits probabilistic programs in parallel; diagnostics return for the next iteration of critique.
</div>

The data and posterior samples are never serialized into the LLM's context window. They stay in the executable sandbox, accessed by the Interactor through code. The Interactor builds up an analytical function library, enabling function reuse and improvement across turns. Only short structured reports of findings pass between the two agents as natural language. This lets AgentBayes scale to large scientific datasets where prior agentic Bayesian systems run out of context.

### Highlights

- **Matches or beats expert-written Bayesian models** on standard `posteriordb` benchmarks, including sizeable improvements on large datasets with complex experimental structure.
- **Outperforms recent LLM-driven symbolic-regression systems** on real scientific data with nested experimental structure, including a neuroscience dataset of olfactory dose-response, a biomechanics dataset of fly wingbeat kinematics, and an environmental health dataset of radon contamination.
- **Scales to larger dataset sizes** where comparable agentic Bayesian baselines overflow the LLM context window.
- **Surfaces structure that benchmarks and original analyses missed**, and adapts its probabilistic programs accordingly.
- **Case Studies**
  - **Catching hidden data artifacts.** Through interactive data exploration, AgentBayes identified a data sentinel (and accomodates it in modeling) that was treated as a real continuous measurement in the expert reference model, biasing the inferred effect.
  - **Replacing a multi-stage expert pipeline with one model.** On an olfactory dataset, AgentBayes independently arrived at the modeling primitives domain experts used, allowing the replacement a staged hand-tuned pipeline with a single hierarchical model that handles response heterogeneity via partial pooling instead of upfront classification.


### Code & citation

*Code coming soon.*

```bibtex
@article{farhang2026agentbayes,
  title   = {AgentBayes: Open-Ended Scientific Model Discovery},
  author  = {Farhang, Alexander R. and Erickson, Anne L. and Sehgal, Atharva and Yue, Yisong},
  journal = {preprint},
  year    = {2026},
}
```
