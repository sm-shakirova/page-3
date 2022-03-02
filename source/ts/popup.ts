import {Page} from './page';

type PopupType = 'success' | 'error';

class Popup {
  readonly template: HTMLElement;
  readonly htmlElement: HTMLElement;

  /**
   * создает экземпляр класса Popup
   * @constructor
   * @param {PopupType} status
   */
  constructor(status: PopupType) {
    this.template = (document.querySelector(`#${status}`) as HTMLTemplateElement).content.querySelector(`.${status}`)!;
    this.htmlElement = this.template.cloneNode(true) as HTMLElement;
  }

  /**
   * показывает попап
   */
  show(): void {
    document.body.appendChild(this.htmlElement);
    document.addEventListener('keydown', (evt) => this.onEscapeKeydown(evt));
    this.htmlElement.onclick = () => {
      this.htmlElement.remove();
      document.removeEventListener('keydown', (evt) => this.onEscapeKeydown(evt));
    }
  }

  /**
   * закрывает попап при нажатии на клавише ESC
   * @param {any} evt
   * @private
   */
  private onEscapeKeydown(evt: any): void {
    if (Page.isEscapeKeydown(evt.key)) {
      evt.preventDefault();
      this.htmlElement.remove();
      document.removeEventListener('keydown', (evt) => this.onEscapeKeydown(evt));
    }
  }
}

export {Popup};
