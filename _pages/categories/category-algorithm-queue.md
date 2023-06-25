---
title: "Queue"
layout: archive
permalink: /categories/algorithm/queue
author_profile: true
sidebar_main: true
sidebar:
    nav: "docs"
---

{% assign posts = site.categories.queue %}
{% for post in posts %} 
{% include archive-single.html type=page.entries_layout %} 
{% endfor %}