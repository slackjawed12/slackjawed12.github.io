---
title: "SPIM"
layout: archive
permalink: /categories/spim/
author_profile: true
sidebar_main: true
sidebar:
    nav: "docs"
---

{% assign posts = site.categories.spim %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}