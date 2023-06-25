---
title: "Greedy"
layout: archive
permalink: /categories/algorithm/greedy
author_profile: true
sidebar_main: true
sidebar:
    nav: "docs"
---

{% assign posts = site.categories.greedy %}
{% for post in posts %} 
{% include archive-single.html type=page.entries_layout %} 
{% endfor %}