---
title: "IDE"
layout: archive
permalink: /categories/ide/
author_profile: true
sidebar_main: true
sidebar:
    nav: "docs"
---

{% assign posts = site.categories.ide %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}