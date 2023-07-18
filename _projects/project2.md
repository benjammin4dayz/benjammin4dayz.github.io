---
title: Romano
layout: default
permalink: /roman
---

<style>
  body {
    overflow: hidden auto;
  }
  .container {
    display: block;
    margin: auto;
    padding-bottom: 10vh;
  }
  .twitch-embed {
    height: fit-content;
    width: fit-content;
    margin: auto;
  }
</style>
<div class="container text-center">
<h1>Roman12663</h1>
<h3>Follow the stream NOW!</h3>
<div id="twitch-embed" class="twitch-embed"></div>
<script src="https://embed.twitch.tv/embed/v1.js"></script>
<script type="text/javascript">
  new Twitch.Embed('twitch-embed', {
    width: 854,
    height: 480,
    channel: 'roman12663'
  });
</script>
