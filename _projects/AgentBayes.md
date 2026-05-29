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
  - name: Case studies
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

### Case studies

**Replacing a multi-stage expert pipeline with a single model.** On a *Drosophila* larval olfactory dataset ([Si et al., 2019](https://doi.org/10.1016/j.neuron.2018.12.030)), receptor × odorant pairs span saturating responders, partial responders, and non-responders. The original analysis handles this heterogeneity through a sequence of expert-curated fitting tiers. AgentBayes independently arrived at the same response primitive the experts use (the Hill function) and built a single joint model: a hurdle component for whether a pair responds, paired with a hierarchical Hill function over crossed receptor, odorant, and pair random effects. Saturators, partial responders, and non-responders all fall out of one fit via partial pooling, with no upfront classification step of response type.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/agentbayes/odorant.png" title="AgentBayes vs SR baselines on three receptor-odorant pairs" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
  Three example receptor-odorant pairs from the dataset: a saturator, a responder, and a non-responder. AgentBayes models all three response types from one joint model.
</div>

**Catching hidden data artifacts.** In a hierarchical benchmark, the expert reference model treats a variable encoded 0–3 as a continuous slope. About 2% of rows carry the value 9, a likely placeholder sentinel for "unknown," which gets folded into the slope as an artifact and biases the inferred effect toward zero. During data exploration, AgentBayes flagged the 9 as *"a special code-like level (9), indicating it may be categorical with nonstandard coding rather than a continuous measurement,"* and re-encoded the variable as per-level indicators. This demonstrates the value of AgentBayes's interactive data exploration and analysis when constructing models.

**Identifying unexpected variations.** In the same hierarchical benchmark, the agent investigated a county-level covariate (uranium concentration) that should, geologically, be constant within each county. During data exploration it found that 73 of 386 counties had within-county variation that shouldn't exist, and split the covariate into between- and within-county components. The expert single-slope model averages the two contributions (the genuine between-county effect and the spurious within-county artifact), dragging the inferred effect toward zero; the decomposition recovers the true effect. The artifact later traced to a preprocessing collision in the benchmark itself, where county indices built from name strings had collapsed cross-state homonyms. 

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
