---
title: "Queue"
layout: archive
permalink: /categories/algorithm/stack
author_profile: true
sidebar_main: true
sidebar:
    nav: "docs"
---

{% assign posts = site.categories.stack %}
{% for post in posts %} 
{% include archive-single.html type=page.entries_layout %} 
{% endfor %}