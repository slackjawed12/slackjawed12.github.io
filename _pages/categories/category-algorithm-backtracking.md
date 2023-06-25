---
title: "Backtracking"
layout: archive
permalink: /categories/algorithm/backtracking
author_profile: true
sidebar_main: true
sidebar:
    nav: "docs"
---

{% assign posts = site.categories.backtracking %}
{% for post in posts %} 
{% include archive-single.html type=page.entries_layout %} 
{% endfor %}