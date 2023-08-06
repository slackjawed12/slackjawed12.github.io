---
title: "Coding Test"
layout: archive
permalink: /categories/codingtest
author_profile: true
sidebar_main: true
sidebar:
    nav: "docs"
---

{% assign posts = site.categories.codingtest %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}