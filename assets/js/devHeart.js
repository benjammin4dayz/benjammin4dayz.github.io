const element = { isClicked: 0, handle: document.getElementById('devHeart') };
element.handle.addEventListener('click', () => {
  !element.isClicked
    ? (purgeCache(), applyDynamicStyles(element.handle))
    : location.reload();
  element.isClicked = !element.isClicked;
});

const purgeCache = async () => {
  caches
    .keys()
    .then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log(cacheName);
          return caches.delete(cacheName);
        })
      );
    })
    .then(() => {
      console.warn('Dev Heart: purged local caches...');
    })
    .catch((error) => {
      console.error(
        'An error occurred while attempting to purge local caches: ' + error
      );
    });
};
const applyDynamicStyles = (element, transitionDuration = 1000) => {
  ctx = element.style;
  ctx.color = 'red';
  ctx.transitionProperty = 'transform';
  ctx.transitionDuration = transitionDuration + 'ms';
  ctx.transformOrigin = 'center bottom';
  ctx.transform = 'translate(0, -3vh) scale(10)';
};
