---
layout: page
permalink: "/faq/"
path: "faq"
css: "article"
title: "FAQ"
---
## Questions
{% for item in site.data.faq -%}
- [{{ item.question }}](#faq{{ forloop.index }})
{% endfor %}
---
{% for item in site.data.faq %}
## {{ item.question }} {#faq{{ forloop.index }}}
{{ item.answer }}{% if item.relative_link != nil %}[{{ item.relative_link.name }}]({{ item.relative_link.url | relative_url }}){% endif %}
{% if forloop.last == false %}{:.margin}{% endif %}
{% endfor %}