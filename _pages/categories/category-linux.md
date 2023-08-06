---
title: "Linux"
layout: archive
permalink: /categories/linux
author_profile: true
sidebar_main: true
sidebar:
    nav: "docs"
---

{% assign posts = site.categories.linux %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}