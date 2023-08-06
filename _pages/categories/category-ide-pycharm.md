---
title: "PyCharm"
layout: archive
permalink: /categories/ide/pycharm
author_profile: true
sidebar_main: true
sidebar:
    nav: "docs"
---

{% assign posts = site.categories.pycharm %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}