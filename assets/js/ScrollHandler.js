class ScrollHandler {
  // ScrollHandler.goto.top.now()
  // ScrollHandler.goto.top.then.hide();
  constructor(body) {
    this.body = body;
    this.goto = {
      top: {
        now: (scrollTime) => this._scrollToTop(scrollTime),
        then: {
          hide: (node) => this._scrollToTopThenHide(node)
        }
      }
    };
  }

  // Invoke this for an immediate and basic scroll to top
  scrollToTop() {
    const body = this.body;
    !body ? console.error('Requested element not found') : null;
    body.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Wrapper for asynchronous scroll to top
  _scrollToTop(scrollTime = 300) {
    this._asyncScrollToTop(scrollTime).catch((e) => console.error(e));
  }

  // Scroll to top within a specified time
  _asyncScrollToTop(timeLimit) {
    const body = this.body;
    if (!body) return Promise.reject('Requested element not found');

    // Calculate the starting position and distance to scroll
    const startPosition = body.scrollTop;
    const distance = -startPosition;

    return new Promise((resolve, reject) => {
      const startTime = performance.now();

      // Recursive step function for smooth scrolling animation
      const scrollStep = (timestamp) => {
        // Calculate the current elapsed time
        const currentTime = timestamp - startTime;

        // Calculate the scroll fraction based on elapsed time
        const scrollFraction = currentTime / timeLimit;

        // Calculate the scroll position based on scroll fraction
        const scrollPosition = Math.floor(
          startPosition + distance * scrollFraction
        );

        // Set the scroll position
        body.scrollTop = scrollPosition;

        // Continue scrolling if time limit is not exceeded and scroll position is not at the top
        if (currentTime < timeLimit && body.scrollTop !== 0) {
          window.requestAnimationFrame(scrollStep);
        } else {
          // Check if scroll position is at the top
          if (body.scrollTop === 0) {
            // Resolve the promise after a slight delay for completion
            setTimeout(() => resolve(), 0.33 * timeLimit);
          } else {
            // Reject the promise if time limit is exceeded without reaching the top
            reject('Time limit exceeded');
          }
        }
      };

      // Start the smooth scrolling animation
      window.requestAnimationFrame(scrollStep);

      // Set a timeout to reject the promise if time limit is exceeded
      setTimeout(() => {
        reject('Time limit exceeded');
      }, timeLimit + 1000); // Add a buffer time to account for any slight delays
    });
  }

  // Scroll to top with the default time and then set Node.style.display to 'none'
  _scrollToTopThenHide(node) {
    this._scrollToTop()
      .then(() => (node.parentNode.style.display = 'none'))
      .catch((e) => console.error(`Missing parent node:\n${e}`));
  }
}
