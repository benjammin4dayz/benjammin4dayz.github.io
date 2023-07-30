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
      result = callback();
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
  static flair(text) {
    if (!text) text = 'COME TO BRAZIL!';
    console.log(`Site.flair: ${text}`);
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
