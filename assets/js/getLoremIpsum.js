/**
 * Halfway through writing this, I had the realization that a HTML form can offload
 * most if not all of the processing logic that I've implemented here. However,
 * in the spirit of over-engineering solutions and reinventing wheels, I decided to continue.
 *
 * Thanks to https://corsproxy.io/ for the quick and painless solution to CORS restrictions
 *
 */
let activeIpsumContainer;
const elById = (id) => document.getElementById(id);

// Call this on load to fill an ipsum passage and create an element which can regenerate passages
const loremIpsify = (containerId) => {
  const container = elById(containerId);
  activeIpsumContainer = container;
  if (container) {
    getPlaceholderText(3, 'short', 'ul', 'ol', 'dl', 'bq', 'code')
      .then((passage) => {
        createLoremGenerator();
        container.innerHTML = passage;
        console.log('Lorem Ipsum passage generated!');
      })
      .catch((e) => console.error(e));
  } else {
    console.error(`No container: <${containerId}>\n${e}`);
  }
};
// Parse text input and regenerate ipsum passages when the button is clicked
const moremIpsify = (inputId) => {
  // Get the textarea input value
  const input = elById(inputId).value;

  // Capture text between colons and semicolons
  const regex = /:\s*(.*?)\s*;/g;
  const matches = input.match(regex);
  const capturedValues = matches.map((match) =>
    match.replace(/:\s*|\s*;/g, '').trim()
  );

  // Destructure params that match endpoints and spread the remainder
  let [paragraphs, length, ...flags] = capturedValues;
  // Convert string('true') into bool(true) and any other value into bool(false)
  flags = flags.map((flag) => flag === 'true');
  const [headers, markdown, allcaps, plaintext] = flags;

  // Push appropriate endpoints to the array
  const query = [
    paragraphs,
    length,
    ...(plaintext ? ['plaintext'] : []),
    ...(allcaps ? ['allcaps'] : []),
    ...(headers ? ['headers'] : []),
    ...(markdown ? ['links', 'code', 'ul', 'ol', 'dl', 'bq'] : [])
  ];
  console.log(query.join('/'));

  // Generate and insert lorem ipsum passage
  getPlaceholderText(...query)
    .then((passage) => (activeIpsumContainer.innerHTML = passage))
    .catch((e) => console.error(e));
};
// Insert a div and append the generator elements to the div
const createLoremGenerator = () => {
  const create = (el) => document.createElement(el);
  const append = (el) => div.appendChild(el);
  const [div, button, textinput, exit] = [
    create('div'),
    create('button'),
    create('textarea'),
    create('a')
  ];
  configureLoremGenerator(div, button, textinput, exit);
  append(button);
  append(textinput);
  append(exit);
  activeIpsumContainer.insertAdjacentElement('beforebegin', div);
};
// Set styles and events for the generator elements
const configureLoremGenerator = (div, button, textinput, exit) => {
  div.id = 'loremDiv';
  const ds = div.style;
  ds.display = 'flex';
  ds.width = '100%';

  button.id = 'loremButton';
  const bs = button.style;
  button.textContent = 'Loripsum API\n>Generate<';
  bs.color = 'var(--text-color)';
  bs.backgroundColor = 'transparent';
  bs.border = '1px solid var(--accent-color)';

  textinput.id = 'loremInput';
  textinput.rows = 6;
  textinput.value = [
    '- - Paragraphs: 3      ;',
    '- - Length    : medium ;',
    '- - Headers   : false  ;',
    '- - Markdown  : true   ;',
    '- - Allcaps   : false  ;',
    '- - Plaintext : false  ;'
  ].join('\n');
  const ts = textinput.style;
  ts.color = 'var(--text-color)';
  ts.backgroundColor = 'var(--secondary-color)';
  ts.width = '90%';
  ts.borderWidth = '1px 3px 1px 0px';
  ts.borderColor = 'var(--tertiary-color)';

  exit.id = 'loremDipsum';
  exit.textContent = 'X';
  const es = exit.style;
  es.cursor = 'pointer';
  es.border = '1px solid var(--accent-color)';
  es.margin = '0 5px';
  es.height = '1.1rem';
  es.width = '1.1rem';
  es.fontWeight = 'bold';
  es.textAlign = 'center';

  // Highlight the button and input fields on mouseover
  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = 'var(--accent-color)';
    textinput.style.borderColor = 'var(--accent-color)';
  });
  button.addEventListener('mouseout', () => {
    button.style.backgroundColor = 'transparent';
    textinput.style.borderColor = 'var(--tertiary-color)';
  });

  // Generate new content when the button is clicked
  button.addEventListener(
    'click',
    debounceClick(
      () => {
        moremIpsify(textinput.id);
      },
      5000,
      button
    )
  );

  // Grow the exit button when hovered
  exit.addEventListener('mouseover', () => (es.transform = 'scale(1.1)'));
  exit.addEventListener('mouseout', () => (es.transform = 'scale(1)'));

  // Remove the injected div when the exit button is clicked
  exit.addEventListener('click', () => {
    // TODO: Adjust transition
    div.style.transition = 'transform 1s ease';
    div.style.transformOrigin = 'right';
    div.style.transform = 'scaleX(0.5) translateX(100vw)';
    setTimeout(() => div.remove(), 1000);
  });
};
/**
 * Generate 'Lorem Ipsum' placeholder text with various options
 *
 * @param {undefined | number} p - The number of paragraphs to generate
 * @param {undefined | ('short' | 'medium' | 'long' | 'verylong')} pLen - The average length of a generated paragraph
 * @param {undefined | ('decorate' | 'link' | 'ul' | 'ol' | 'dl' | 'bq' | 'code' | 'headers' | 'allcaps' | 'prude' | 'plaintext')[]} flags - Additional parameters
 * @returns {Promise<string>} - A promise that resolves to the generated paragraphs as a string
 *
 * @example
 * // Generate 3 long paragraphs with links and headers
 * getPlaceholderText(3, 'long', ['link', 'headers'])
 *   .then((result) => {
 *     console.log(result);
 *   });
 */
const getPlaceholderText = (p, pLen, ...flags) => {
  if (flags.length) {
    const queryString = [p, pLen, ...flags].join('/');
    return apiQuery(queryString);
  } else if (pLen) return apiQuery(p, pLen);
  else return apiQuery();
};
// Send a GET request to the API
const apiQuery = (args) => {
  const api = 'https://corsproxy.io/?https://loripsum.net/api';
  if (!args)
    return fetch(api)
      .then((response) => response.text())
      .then((filler) => filler)
      .catch((e) => console.error(e));
  else
    return fetch(api + '/' + args)
      .then((response) => response.text())
      .then((filler) => filler)
      .catch((e) => console.error(e));
};
// No spamerino in the chatterino
function debounceClick(func, delay, button) {
  let isButtonClicked = false;

  return function (...args) {
    if (!isButtonClicked) {
      isButtonClicked = true;
      button.style.borderColor = 'var(--tertiary-color)';
      button.style.filter = 'blur(1px)';
      func.apply(this, args);

      setTimeout(() => {
        isButtonClicked = false;
        button.style.borderColor = 'var(--accent-color)';
        button.style.filter = 'none';
      }, delay);
    }
  };
}
