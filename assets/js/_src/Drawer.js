/**
 * TODO:
 *
 *  ? Pass an object as a parameter { controllerId: drawerId ...}
 *
 *  ? Init a new button for each object
 *
 * Saves the legwork of instantiating a new class for every single element
 */

/**
 * Represents a drawer component that can be opened and closed.
 *
 * @class
 * @constructor
 */
export default class Drawer {
  /**
   * Creates an instance of the Drawer class.
   *
   * @param {String} mainContainer - The main container element.
   * @param {String} expanderId - The ID of the expander button element.
   * @param {String} shelfId - The ID of the shelf element.
   */
  constructor(mainContainer, expanderId, drawerId) {
    this.elements = this._initVars(mainContainer, expanderId, drawerId);
    this.initButtons(this.elements.expander);
  }

  _initVars(...vars) {
    const find = (alias) => this.findElement(alias);
    const [id, expanderId, drawerId] = vars;
    return {
      main: find(id),
      drawer: find(drawerId),
      expander: find(expanderId)
    };
  }

  initButtons(nodeList) {
    try {
      // Iterate over every button
      nodeList.forEach((button) => {
        button.addEventListener('click', () =>
          alert('DEBUG: dummy click event attached by nodeList iteration')
        );
      });
    } catch {
      // Handle non-iterable exceptions
      const singleNode = nodeList;
      if (singleNode.id == this.elements.expander.id) {
        console.log(`ADD Click Event: Main Expander => ${singleNode.id}`);
        singleNode.addEventListener('click', () =>
          this.toggleState(this.elements.drawer)
        );
      } else {
        singleNode.addEventListener('click', () =>
          alert('DEBUG: dummy click event attached by singleNode')
        );
      }
    }
  }

  toggleState(element) {
    const ctx = element.style.display;
    switch (ctx) {
      case 'none':
        this._open(element);
        break;
      default:
        this._close(element);
        break;
    }
  }

  findElement(alias) {
    const noExists = new ReferenceError(
      `No element found with alias or selector: ${alias}`
    );
    const element =
      document.getElementById(alias) ||
      document.querySelector(alias) ||
      document.querySelectorAll(alias);

    //! console.log({ search: alias, rescue: element });
    if (element !== null) return element;
    else throw noExists;
  }

  _close(element) {
    console.log(`Closing drawer ${element.id}...`);
    element.style.display = 'none';
    return element;
  }

  _open(element) {
    console.log(`Opening drawer ${element.id}...`);
    element.style.display = 'block';
    return element;
  }
}
