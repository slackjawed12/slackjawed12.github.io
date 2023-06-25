---
title: "Implementation"
layout: archive
permalink: /categories/algorithm/implementation
author_profile: true
sidebar_main: true
sidebar:
    nav: "docs"
---

{% assign posts = site.categories.implementation %}
{% for post in posts %} 
{% include archive-single.html type=page.entries_layout %} 
{% endfor %}