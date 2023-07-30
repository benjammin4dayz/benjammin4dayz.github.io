export default class DolorDemo {
  constructor() {
    this.api = 'https://loripsum.net/api/';
    this.defaultProxy = 'https://corsproxy.io/?';
    this._defaultContainerId = 'loremIpsum';

    this.injectSelfHTML()
      .then(() => this._init())
      .catch((e) => console.error(e));
  }

  _init() {
    const _el = (id) => document.getElementById(id);

    this.defaultContainer = () => _el(this._defaultContainerId);

    this.drawer = _el('loremDrawer');

    this.buttons = {
      a: {
        el: _el('clearCheckboxes'),
        substr: 'include'
      },
      b: _el('generatePassage'),
      c: _el('pulloutHandle')
    };

    this.addListeners();

    // Auto-fill the default CORS proxy
    this.drawer.querySelector('#includeCorsProxy').value = this.defaultProxy;
  }

  setDrawerState(state) {
    const [style, open, closed] = [this.drawer.style, '-3px', '-242px'];
    style.top = state ? open : closed;
  }

  resetCheckboxes(idSubstring) {
    let checkboxes;
    if (idSubstring) {
      checkboxes = this.getHandleTo('#loremDrawer', 'checkbox', idSubstring);
      for (const checkbox of checkboxes) {
        checkbox.checked = false;
      }
    } else {
      checkboxes = this.getHandleTo('#loremDrawer', 'checkbox');
      for (const checkbox of checkboxes) {
        checkbox.checked = false;
      }
    }
  }

  interceptForm(event) {
    // Prevent onSubmit events which would typically reload the page
    event.preventDefault();

    // Push checkbox input IDs into options and everything else to main
    const [inputs, config] = [
      this.getHandleTo('#loremDrawer input'),
      { main: [], options: [] }
    ];

    for (const input of inputs) {
      if (input.type === 'checkbox') {
        if (input.checked) {
          config.options.push(input.id);
        }
      } else {
        config.main.push(input.value);
      }
    }

    // Return a configuration object with two keys: [main] and [options]
    return config;
  }

  parseForm(config) {
    let [numParagraphs, paragraphLenInt, containerToInject, corsProxy] =
      config.main;

    // Set the CORS proxy accordingly
    corsProxy ? (this.proxy = corsProxy) : (this.proxy = this.defaultProxy);

    // Get a handle to the injection target
    //? document.querySelector(containerToInject)
    containerToInject = containerToInject
      ? this.getRequestedDiv(containerToInject)
      : this.makeNewDiv();

    // Map paragraphLenInt to corresponding endpoint value
    const paragraphLen =
      {
        1: 'short',
        2: 'medium',
        3: 'long',
        4: 'verylong'
      }[paragraphLenInt] || 'medium';

    // Consolidate all configuration options
    const opts = [numParagraphs, paragraphLen, ...config.options];

    // Generate the endpoint string
    const endpoint = opts
      .join('/')
      .replace(/include/g, '')
      .toLowerCase();

    // Return the endpoint
    console.log(endpoint);
    console.log(containerToInject);
    return {
      container: containerToInject,
      endpoint: endpoint
    };
  }

  makeNewDiv() {
    let container;

    container = document.querySelector('#loremIpsum');

    while (!container) {
      container = document.querySelector('#loremIpsum');
      container = document.querySelector('#loripsumContainer');
      break;
    }
    if (container) return container;

    console.warn(
      [
        'No container specified:',
        'injecting a <div> element into the document body'
      ].join(' ')
    );

    // Create a div element with a default name to inject the content
    container = document.createElement('div');
    container.id = this._defaultContainerId;
    container.setAttribute('sandbox', '');

    // Update the text-input box with the id of the newly created div element
    document.getElementById(
      'includeInjectContainer'
    ).value = `#${container.id}`;

    // Append the div element to the body
    const body = document.querySelector('body');

    return body.appendChild(container);
  }

  getRequestedDiv(containerToInject) {
    let div = document.querySelector(containerToInject);
    if (!div) {
      const msg = `Null return from queryselector: ${containerToInject}`;
      alert(msg);
      throw new ReferenceError(msg);
    }
    return div;
  }

  fetchLoripsum(args) {
    const api = this.proxy + this.api;

    return fetch(api + args)
      .then((response) => response.text())
      .then((responseText) => responseText)
      .catch((e) => {
        console.error(e);
        alert('Bad API response! Check the console for more details');
      });
  }

  getHandleTo(selector, type, idSubstring) {
    let selection;
    if (idSubstring) {
      selection = document.querySelectorAll(
        `input[type="${type}"][id*="${idSubstring}"]`
      );
    } else if (type) {
      selection = document.querySelectorAll(
        `${selector} input[type="${type}"]`
      );
    } else if (selector) {
      selection = document.querySelectorAll(selector);
    } else {
      throw `No selector provided`;
    }
    return selection;
  }

  addListeners() {
    // "Clear" button events
    this.buttons.a.el.addEventListener('click', (event) => {
      event.preventDefault();
      this.resetCheckboxes(this.buttons.a.substr);
    });

    // "Generate Passage" button events
    this.buttons.b.addEventListener('click', (event) => {
      // Intercept the form results
      const formData = this.interceptForm(event);
      // Parse the form results and return a config object
      const conf = this.parseForm(formData);
      // TODO: Query the API endpoint and return the response
      this.fetchLoripsum(conf.endpoint).then((data) => {
        conf.container.innerHTML = data;
      });
    });

    // "Handle" mouse enter event => open drawer
    this.buttons.c.addEventListener('mouseenter', () => {
      this.setDrawerState(1);
    });

    // Mouse leave event => close drawer
    this.drawer.addEventListener('mouseleave', () => {
      setTimeout(() => this.setDrawerState(0), 200);
    });
  }

  injectSelfHTML(html) {
    // Chain this into a promise and pass the string literal after fetching from GitHub

    const literal = `
    <style>
    .popout {
      position: absolute;
      z-index: 999;
      top: -242px;
      left: 50%;
      transform: translateX(-50%);
      width: 300px;
      background: linear-gradient(to bottom right, #d3d3d3a9, #f8f8f8a9);
      color: #333333;
      backdrop-filter: blur(2px);
      border-radius: 3px;
      transition: top 0.5s;
    }
    .popout .handle {
      position: fixed;
      bottom: -8.32%;
      left: 50%;
      transform: translateX(-50%);
      width: 96.5%;
      height: 12px;
      margin-top: 4px;
      background-image: linear-gradient(to bottom, #d3d3d3a9, #f8f8f8a9);
      border-radius: 0px 0px 12px 12px;
      cursor: pointer;
      padding: 4px;
      border-width: 0 2px 2px 2px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
    }
    .popout .handle:hover {
      background-color: #ffc107;
      border-top: 1px solid #e6f1f6;
    }
    .popout .container {
      display: flex;
      flex-wrap: wrap;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      letter-spacing: 0;
      line-height: 0.5em;
      font-weight: 450;
    }
    .popout .form {
      margin: 16px;
      display: flex;
    }
    .popout .form legend {
      margin-bottom: 0.3em;
      text-decoration: underline;
      font-weight: 600;
    }
    .popout .label-row {
      display: flex;
      align-items: center;
    }
    .popout .form .checkboxes {
      flex: 1 0 45%;
    }
    .popout .form .divider {
      flex: 0 0 1%;
      margin-right: 12px;
      background-color: #e6f1f6;
      box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.5);
      filter: blur(1px);
    }
    .popout .form .required {
      flex: 1 0 49.5%;
    }
    .popout .form .plaintext-toggle {
      position: fixed;
      bottom: 10%;
      right: 0;
      margin: 16px;
    }
    .popout .form input[type="text"],
    .popout .form input[type="range"] {
      width: 100%;
      margin: 5px auto;
    }
    .popout .form .additional-options {
      margin-top: 8px;
    }
    .popout .submit-button {
      position: fixed;
      bottom: 0;
      right: 0;
      margin: 16px;
    }
    .popout button {
      color: #333333;
      background-color: #e6f1f6;
      border: 3px solid #ffc10734;
      border-radius: 6px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    .popout button:hover {
      background-color: #d3dee4;
      border-color: #ffc1076c;
    }    
    </style>
    <div id="loremDrawer" class="popout">
      <div class="container">
        <span id="pulloutHandle" class="handle"></span>
        <form class="form">
          <div class="checkboxes">
            <legend>Optional:</legend>
            <span class="label-row">
              <input type="checkbox" id="includeBq" />
              <label for="includeBq">Blockquote</label>
            </span>
            <span class="label-row">
              <input type="checkbox" id="includeAllCaps" />
              <label for="includeAllCaps">Capitalize</label>
            </span>
            <span class="label-row">
              <input type="checkbox" id="includeCode" />
              <label for="includeCode">Code (pre)</label>
            </span>
            <span class="label-row">
              <input type="checkbox" id="includeDeco" />
              <label for="includeDeco">Decorate</label>
            </span>
            <span class="label-row">
              <input type="checkbox" id="includeHeaders" />
              <label for="includeHeaders">Headers</label>
            </span>
            <span class="label-row">
              <input type="checkbox" id="includeLink" />
              <label for="includeLink">Links</label>
            </span>
            <span class="label-row">
              <input type="checkbox" id="includeDl" />
              <label for="includeDl">List (dl)</label>
            </span>
            <span class="label-row">
              <input type="checkbox" id="includeNl" />
              <label for="includeNl">List (ol)</label>
            </span>
            <span class="label-row">
              <input type="checkbox" id="includeUl" />
              <label for="includeUl">List (ul)</label>
            </span>
            <span class="label-row">
              <button id="clearCheckboxes">Clear</button>
            </span>
          </div>
          <div class="divider"></div>
          <div class="required">
            <span class="sliders">
              <label>Paragraphs</label
              ><input
                type="range"
                id="includeNumParagraphs"
                min="1"
                max="20"
                value="3"
                list="paragraph-integer"
              />
              <label>Length</label
              ><input
                type="range"
                id="includeNumParagraphsLen"
                min="1"
                max="4"
                value="2"
                list="passage-length"
              />
              <datalist id="paragraph-integer">
                <option value="1">1</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </datalist>
              <datalist id="passage-length">
                <option value="1">Short</option>
                <option value="2">Medium</option>
                <option value="3">Long</option>
                <option value="4">Verylong</option>
              </datalist>
            </span>
            <div class="additional-options">
              <span class="text-input">
                <label for="includeInjectContainer">Target Container</label>
                <input
                  type="text"
                  id="includeInjectContainer"
                  placeholder="Selector Query"
                />
              </span>
              <span class="text-input">
                <label for="includeCorsProxy">CORS Proxy</label>
                <input
                  type="text"
                  id="includeCorsProxy"
                  placeholder="https://my.cors.now/?"
                  value=""
                />
              </span>
            </div>
            <span class="plaintext-toggle">
              <label>Plaintext</label>
              <input type="checkbox" id="includePlaintext" />
            </span>
            <button id="generatePassage" class="submit-button">
              Generate Passage
            </button>
          </div>
        </form>
      </div>
    </div>
    `;
    return new Promise((resolve, reject) => {
      try {
        // document.querySelector('body :first-of-type').innerHTML = literal;
        ////const div = document.createElement('div');
        const div = document.getElementById('dolorDemoContainer');
        div.innerHTML = literal;
        div.id = 'LoremInjector';
        ////document.body.appendChild(div);
        resolve('PASS: HTML Injection');
      } catch (e) {
        reject('FAIL: HTML Injection');
      }
    });
  }
}
