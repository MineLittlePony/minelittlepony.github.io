---
layout: page
permalink: "/faq/"
path: "faq"
css: "article"
title: "FAQ"
---

## Contents
{:.no_toc}

- Table of contents
{:toc}

---

{% for item in site.data.faq %}
## {{ item.question }} {#faq{{ forloop.index }}}
{{ item.answer }}{% if item.relative_link != nil %}[{{ item.relative_link.name }}]({{ item.relative_link.url | relative_url }}){% endif %}
{% endfor %}
