---
layout: splash
permalink: /portfolio/
title: "Portfolio"
author_profile: false
---

<style>
  .post-date {
    font-size: 0.8em;
    color: #999;
  }

  .post-title {
    font-size: 1.2em;
    margin-top: 0.1em;
    margin-bottom: 0.1em;
  }
  
  .post-subtitle {
    font-size: 1em;
    margin-top: 0.1em;
    margin-bottom: 0.5em;
  }

  post-description {
    margin-top: 0;
    margin-bottom: 5px;
  }

  .post-type {
    display: inline-block;
    font-size: 0.8em;
    font-weight: bold;
    padding: 2px 5px;
    border-radius: 4px;
    margin-right: 5px;
    margin-bottom: 0.1em;
  }

  .blog-type {
    background-color: #ffa500;
    color: #fff;
  }

  .project-type {
    background-color: #008000;
    color: #fff;
  }

  .other-type {
    background-color: #808080;
    color: #fff;
  }
</style>

<h1>{{ page.title }}</h1>

{% assign sorted = site.posts %}

{% for post in sorted %}
  <div class="post">
    {% if post.type == 'blog' %}
      <span class="post-type blog-type">Blog</span>
    {% elsif post.type == 'project' %}
      <span class="post-type project-type">Project</span>
    {% else %}
      <span class="post-type other-type">Other</span>
    {% endif %}
    {% if post.show_date %}
    <span class="post-date">{{ post.date | date_to_string }}</span>
    {% endif %}
    <h2 class="post-title"><a href="{{ post.url }}">{{ post.title }}</a></h2>
    {% if post.subtitle %}
    <h4 class="post-subtitle">{{ post.subtitle }}</h4>
    {% endif %}
    <p class="post-description">{% if post.excerpt %}{{ post.excerpt | markdownify | strip_html | truncate: 120 }}{% endif %}</p>
  </div>
{% endfor %}