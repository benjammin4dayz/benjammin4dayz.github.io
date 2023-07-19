const element = { isClicked: 0, handle: document.getElementById('devHeart') };
element.handle.addEventListener('click', () => {
  !element.isClicked
    ? (applyDynamicStyles(element.handle), revealDevButton())
    : location.reload();
  element.isClicked = !element.isClicked;
});

const applyDynamicStyles = (element, transitionDuration = 1000) => {
  ctx = element.style;
  ctx.color = 'red';
  ctx.transitionProperty = 'transform';
  ctx.transitionDuration = transitionDuration + 'ms';
  ctx.transformOrigin = 'center bottom';
  ctx.transform = 'translate(0, -3vh) scale(10)';
};
const revealDevButton = () => {
  try {
    document.getElementById('devPanel').style.visibility = 'visible';
  } catch {}
  try {
    document.getElementById('devButton').style.display = 'inline-block';
  } catch {}
};
