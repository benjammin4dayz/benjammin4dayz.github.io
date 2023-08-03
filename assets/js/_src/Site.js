import ThemeSwitch from './ThemeSwitcher.js';

class Base {
  // Site Utility Functions shared between EVERY class
  constructor() {}

  static get navigate() {
    return {
      to: (location = '/') => {
        return {
          after: (timeout = 1000) => {
            console.log(`[${timeout / 1000}s => ${location}]`);
            return new Promise((resolve) => setTimeout(resolve, timeout))
              .then(() => (window.location.href = location))
              .catch((e) => console.error(`Navigate Failed:\n${e}`));
          }
        };
      }
    };
  }

  static get currentPage() {
    return window.location.href;
  }

  static get fetch() {
    // Site.fetch(endpoint).as(type).thenTry(callback);
    return {
      from: (endpoint) => {
        return {
          as: (parseMethod) => {
            return {
              thenTry: (callback) =>
                this._fetch(endpoint, callback, parseMethod)
            };
          }
        };
      }
    };
  }

  static get stinkyPage() {
    // Formerly known as 'depNotice'
    const deprecated = {
      notifSent: false,
      note: {
        user:
          [
            '[DEPRECATED CONTENT NOTICE]: ->',
            'Something is no longer supported and will be removed from the page soon.',
            'Be aware that your experience may be severely diminished.',
            'Please contact me at your earliest convenience regarding this matter.'
          ].join('\n• ') +
          '\n\nThank you for patience and understanding.\n- Jam',
        dev: [
          '[DEPRECATED CONTENT TRACE]: ->',
          JSON.stringify(
            {
              href: window.location.href,
              hash: window.location.hash,
              pathname: window.location.pathname
            },
            null,
            2
          )
        ].join('\n')
      }
    };
    deprecated.alert = () => alert(deprecated.note.user);
    deprecated.warn = () => console.warn(deprecated.note.dev);

    const doOnLoad = (flag) => {
      if (!flag) {
        deprecated.alert();
        deprecated.warn();
        window.location.href = '#deprecated?ack=1';
        return !flag;
      }
    };
    return doOnLoad(deprecated.notifSent);
  }

  // Private methods
  static _fetch(endpoint, callback, parseMethod) {
    const result = fetch(endpoint)
      .then((response) => response[parseMethod]())
      .then((data) => callback(data))
      .catch((err) => {
        console.error(`Base.fetch ${err}`);
      });
    return result;
  }
}

class Events extends Base {
  // Utilities to assist with site events
  constructor(element) {
    super();
    this.element = element;
  }

  static get attempt() {
    return {
      to: (callback) => {
        return {
          rescue: (rescue) => {
            return this._attempt(callback, rescue);
          }
        };
      }
    };
  }

  static get randomizeBorders() {
    // TODO: Improve or Remove
    // getELementById alias
    const getEl = (element) => document.getElementById(element);
    // List of element ids to modify
    //! Hardcoded values! Must improve modularity for ID (and colors at a lower priority)
    const id = ['layoutHeader', 'layoutFooter'];
    // List of colors to apply to the elements
    const colors = [
      '#FF0000',
      '#FFA500',
      '#FFFF00',
      '#00FF00',
      '#0000FF',
      '#8A2BE2'
    ];
    // Get a random color using Math.random()
    const rng = () => Math.floor(Math.random() * colors.length);
    const randomColor = colors[rng()];
    // Get a handle to relevant element
    const [header, footer] = [getEl(id[0]), getEl(id[1])];
    // Apply the random color to the elements
    header.style.borderBottom = `3px solid ${randomColor}`;
    footer.style.borderTop = `3px solid ${randomColor}`;
  }

  invoke(callback) {
    return {
      on: (type) => this.element.addEventListener(type, callback)
    };
  }

  revoke(callback) {
    return {
      on: (type) => this.element.removeEventListener(type, callback)
    };
  }

  //! Private
  static _attempt(callback, rescue) {
    let result;
    try {
      result = callback;
      return result;
    } catch (e) {
      // Call 'DNR' re-throw the error into the stack
      if (rescue === 'DNR') throw e;
      // No prototypes for pretty nesting purposes
      const errOutput = Object.create(null);
      errOutput[e.name] = Object.create(null);
      errOutput[e.name].message = e.message;
      errOutput[e.name].stack = e.stack.split('\n');
      // Log a pretty nested error that we can (probably) ignore
      console.log(errOutput);
      // Try to solve the problem
      result = rescue();
      return result;
    }
  }
}

class Site extends Base {
  // Main API for interacting with site functions
  constructor() {}

  static events(element) {
    return new Events(element);
  }
  static flair() {
    /**
     * ! WARNING ! Experimental Feature for TESTING only
     * * Wait for DOM otherwise footer doesn't exist
     * Bundle.Site.events(document)
     * .invoke(() => Bundle.Site.flair())
     * .on('DOMContentLoaded');
     */
    return Events.randomizeBorders;
  }
  static lightSwitch(trigger) {
    return new ThemeSwitch(trigger);
  }
}

class Secret extends Site {
  constructor(element) {
    super();
    this.element = Site.events(element);
  }

  init(callback) {
    return this.element.invoke(callback).on('click');
  }
}

export { Site, Secret };
