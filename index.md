---
layout: default
title: Home
---

<div class="container">
  <link rel="stylesheet" href="{{ site.baseurl }}/assets/css/index.css" />
  <h1 class="title text-center">Web Development</h1>
  <span class="subtitle text-center">Select a project to view</span>
  <div class="nav-panel">
    {% for project in site.projects %}
    <button
      class="nav-panel-btn"
      onclick="window.location.href='{{ site.baseurl }}{{ project.url }}'"
    >
      {{ project.title }}
    </button>
    {% endfor %}
  </div>
</div>
<!-- <script>
  console.log({{ site.projects | jsonify }});
</script> -->