---
title: "Math"
layout: archive
permalink: /categories/algorithm/math
author_profile: true
sidebar_main: true
sidebar:
    nav: "docs"
---

{% assign posts = site.categories.math %}
{% for post in posts %} 
{% include archive-single.html type=page.entries_layout %} 
{% endfor %}