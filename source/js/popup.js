import {Util} from './util.js';

class Popup {
  /**
   * создает экземпляр класса Popup
   * @constructor
   * @param {string} status - success/error
   */
  constructor(status) {
    this.template = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
    this.htmlElement = this.template.cloneNode(true);
  }

  /**
   * показывает попап
   */
  show() {
    document.body.appendChild(this.htmlElement);
    document.addEventListener('keydown', (evt) => this._onEscapeKeydown(evt));
    this.htmlElement.onclick = () => {
      this.htmlElement.remove();
      document.removeEventListener('keydown', (evt) => this._onEscapeKeydown(evt));
    }
  }

  _onEscapeKeydown(evt) {
    if (Util.isEscapeKeydown(evt.key)) {
      evt.preventDefault();
      this.htmlElement.remove();
      document.removeEventListener('keydown', (evt) => this._onEscapeKeydown(evt));
    }
  }
}

export {Popup};
