const element = { isClicked: 0, handle: document.getElementById('devHeart') };
element.handle.addEventListener('click', () => {
  !element.isClicked
    ? (applyDynamicStyles(element.handle), revealDevButton())
    : location.reload();
  element.isClicked = !element.isClicked;
});

const applyDynamicStyles = (element, transitionDuration = 1000) => {
  const el = element.style;
  el.color = 'red';
  el.cursor = 'cell';
  el.transitionProperty = 'transform';
  el.transitionDuration = transitionDuration + 'ms';
  el.transformOrigin = 'center bottom';
  el.transform = 'translate(0, -3vh) scale(10)';
};
const revealDevButton = () => {
  try {
    document.getElementById('devPanel').style.visibility = 'visible';
  } catch {}
  try {
    document.getElementById('devButton').style.display = 'inline-block';
  } catch {}
};
