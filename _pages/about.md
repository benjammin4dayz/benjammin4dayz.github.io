---
layout: default
title: About
---

<style>
  body {
    min-height: 100vh;
  }
  .container {
    background-color: var(--secondary-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    margin-top: 5vh;
    max-width: 33vw;
    padding: 3rem 6rem;
    box-shadow:
      2px 2px 25px rgba(46, 45, 45, 0.3),
      -2px -2px 25px rgba(134, 129, 129, 0.3);
    border-radius: 30px;
  }
  .heading {
    font-size: 3rem;
    text-decoration: bold;
    margin-bottom: 1rem;
  }
  .sub-heading {
    font-size: 1.5rem;
    margin-bottom: 5vh;
  }
  .sotto-voce {
    font-size: 0.5rem;
    font-style: italic;
  }
  #hidden-message {
    opacity: 0;
  }
</style>
<body>
  <div class="container">
    <span class="heading text-center">Doing my own webdev.</span>
    <span id="hidden-message-trigger" class="sub-heading text-center"
      >With Blackjack!</span
    >
    <span id="hidden-message" class="sotto-voce text-center"
      >... and hookers!</span
    >
    <span class="content text-center">
      This site was built using
      <a href="https://jekyllrb.com/">Jekyll</a>
    </span>
  </div>
  <script>
    function revealHiddenOnHover() {
      const trigger = document.getElementById('hidden-message-trigger');
      const hiddenMessage = document.getElementById('hidden-message');
      trigger.addEventListener('mouseover', () => {
        hiddenMessage.style.opacity = 1;
      });
      trigger.addEventListener('mouseout', () => {
        hiddenMessage.style.opacity = 0;
      });
    }
    revealHiddenOnHover();
  </script>
</body>
