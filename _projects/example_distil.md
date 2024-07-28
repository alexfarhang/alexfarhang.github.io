---
layout: distill
title: Humanlike Behavior in a Third-Person Shooter with Imitation Learning
description: 
img: assets/img/DC_logo.png
importance: 1
permalink: humanlikebehavior
category: research

authors:
  - name: Alexander R. Farhang
    url: "https://alexfarhang.github.io"
    affiliations:
      name: Caltech, Epic Games
  - name: Brendan Mulcahy
    url: "https://www.linkedin.com/in/brmulcahy/"
    affiliations:
      name: Epic Games
  - name: Daniel Holden
    url: "https://theorangeduck.com"
    affiliations:
      name: Epic Games
  - name: Iain Matthews
    url: "http://www.iainm.com"
    affiliations:
      name: Epic Games
  - name: Yisong Yue
    url: "http://www.yisongyue.com"
    affiliations:
      name: Caltech

bibliography: HumanlikeBehavior.bib

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).
toc:
#   - name: Equations
#     # if a section has subsections, you can add them as follows:
#     # subsections:
#     #   - name: Example Child Subsection 1
#     #   - name: Example Child Subsection 2
#   - name: Citations
#   - name: Footnotes
#   - name: Code Blocks
#   - name: Layouts
#   - name: Other Typography?
  - name: Abstract
  - name: Model
  - name: Example Video

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.
# _styles: >
#   .fake-img {
#     background: #bbb;
#     border: 1px solid rgba(0, 0, 0, 0.1);
#     box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
#     margin-bottom: 12px;
#   }
#   .fake-img p {
#     font-family: monospace;
#     color: white;
#     text-align: left;
#     margin: 12px 0;
#     text-align: center;
#     font-size: 16px;
#   }

---

Companion page for [*Humanlike Behavior in a Third-Person Shooter with Imitation Learning*](assets/pdf/Humanlike_Behavior.pdf)<d-cite key="farhang2024Humanlike"></d-cite>, presented in August 2024 at the [IEEE Conference on Games (CoG) in Milan](https://2024.ieee-cog.org).

***
### Abstract

We tackle the problem of generating humanlike bot behavior by learning from human demonstrations. We developed a controlled gym environment to collect data on a subset of human behavior—namely aiming and target acquisition in single opponent settings. We introduce an identity-conditioned causal transformer to produce humanlike behavior of a controllable quality on a per-frame basis that captures the differences in skill and style between conditioned players.

***
### Model
Our agent model is based on a causal transformer neural network trained on human gameplay.  The transformer network is autoregressive, and learns to reconstruct future actions based on previous state-action sequences.  

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/NN_architecture_ID.png" title="NN architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The Identity-conditioned causal transformer predict actions by processing a state-action history sequence (with an optional, prepended identity token).
</div>

We add a novel type of identity-conditioning by prompting the transformer with a prepended learned token signifying a player's identity, modifying the quality of gameplay.  We can segment the training dataset into different identity groups, for example by skill level (win rate) or unique player identity.  This approach allows us to incorporate multiple skills or styles of gameplay in a single model, which enables batch processing of neural network controlled bots with differing characteristics.  Our approach can replicate qualitative and quantitative aspects of humanlike gameplay and capture elements of individual player style.

***
### Example Video

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/HumanlikeBehaviorVidCustom.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true %}
    </div>
</div>
<div class="caption">
  Behavior examples from different models: Unconditioned, High skill group conditioned, Low skill group conditioned, and Player conditioned model.
</div>

