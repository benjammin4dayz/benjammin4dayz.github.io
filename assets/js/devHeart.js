const element = { isClicked: 0, handle: document.getElementById('devHeart') };
const errList = [];
try {
  // Add a click listener to the initial element
  element.handle.addEventListener('click', () => {
    !element.isClicked
      ? (applyDynamicStyles(element.handle), armDevButton())
      : location.reload(true);
    element.isClicked = !element.isClicked;
  });
} catch (e) {
  console.error(
    `The requested element id 'devHeart' does not exist within the page.`
  );
}

const applyDynamicStyles = (element, transitionDuration = 5000) => {
  // Set parent element initial styles
  element.style.color = 'red';
  element.style.transitionProperty = 'transform';
  element.style.transitionDuration = transitionDuration + 'ms';
  // Clone the element and then append it to the body
  const clonedElement = element.cloneNode(true);
  document.documentElement.appendChild(clonedElement);
  // Style the cloned element without affecting our page layout
  const el = clonedElement.style;
  el.position = 'absolute';
  el.top = '96.3%';
  el.left = '49.53%';
  el.zIndex = '999';
  el.cursor = 'cell';
  // Wait a small amount of time before applying transforms to prevent pop-in
  wait(10).then(() => {
    clonedElement.onclick = () => location.reload(true);
    el.maxHeight = 'min-content';
    el.maxWidth = 'min-content';
    el.transformOrigin = 'bottom';
    el.transform = 'translate(0, -15vh) scale(15)';
  });
};
const armDevButton = () => {
  try {
    const node = document.getElementById('devButton');
    node.onclick = () => (window.location.href = '/private/dev-panel');
    node.style.backgroundColor = 'orange';
  } catch {
    errList.push("element 'devButton' not found");
  }
};
if (errList.length) console.warn('Error(s) occurred:\n -' + e.join('\n -'));

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
