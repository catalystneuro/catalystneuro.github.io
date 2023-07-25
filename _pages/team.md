---
layout: splash
title: "<span class='normal-text'>Our</span><span class='bold-text'>Team</span>"
permalink: /team/
collection: team
header:
  overlay_color: "#5e616c"
  overlay_image: /assets/images/ourteam-header2034x444-1.jpg
---

<html>
{% assign sorted_members = site.team | sort: 'order' %}

{% for member in sorted_members %}
    {% include team_member.html member=member %}
{% endfor %}
</html>
