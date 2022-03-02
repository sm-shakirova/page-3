/* global _:readonly */
import {VALIDATION_DELAY, getMinPrice, getGuestsNumber, TitleLength} from './data-details';
import {Photo} from './photo-preview';
import {Form} from "./form";

class UserForm extends Form {
  public className: string;
  readonly htmlElement: HTMLFormElement;
  readonly locationField?: HTMLInputElement | null;
  readonly typeSelect?: HTMLSelectElement | null;
  readonly priceField?: HTMLInputElement | null;
  readonly checkInSelect?: HTMLSelectElement | null;
  readonly checkOutSelect?: HTMLSelectElement | null;
  readonly titleField?: HTMLInputElement | null;
  readonly roomsNumberSelect?: HTMLSelectElement | null;
  readonly guestsNumberSelect?: HTMLSelectElement | null;
  readonly guestsNumberOptions?: NodeList | null;
  readonly resetButton?: HTMLButtonElement | null;
  readonly avatar?: Photo;
  readonly photo?: Photo;

  /**
   * создает экземпляр класса UserForm
   * @constructor
   * @param {string} className - класс формы
   */
  constructor(className: string) {
    super();
    this.htmlElement = document.querySelector(`.${className}`)! as HTMLFormElement;
    this.className = className;

    this.locationField = this.htmlElement.querySelector('#address') as HTMLInputElement;
    this.typeSelect = this.htmlElement.querySelector('#type') as HTMLSelectElement;
    this.priceField = this.htmlElement.querySelector('#price') as HTMLInputElement;
    this.checkInSelect = this.htmlElement.querySelector('#timein') as HTMLSelectElement;
    this.checkOutSelect = this.htmlElement.querySelector('#timeout') as HTMLSelectElement;
    this.titleField = this.htmlElement.querySelector('#title') as HTMLInputElement;
    this.roomsNumberSelect = this.htmlElement.querySelector('#room_number') as HTMLSelectElement;
    this.guestsNumberSelect = this.htmlElement.querySelector('#capacity') as HTMLSelectElement;
    if (this.guestsNumberSelect) this.guestsNumberOptions = this.guestsNumberSelect.querySelectorAll('option');
    this.resetButton = this.htmlElement.querySelector('.ad-form__reset') as HTMLButtonElement;

    this.avatar = new Photo(
      'ad-form__field',
      'ad-form-header__preview',
      false);

    this.photo = new Photo(
      'ad-form__upload',
      'ad-form__photo',
      true);
  }

  /**
   * устанавливает зависимость стоимости от типа жилья
   */
  setPriceConfigurations(): void {
    if (this.typeSelect && this.priceField) {
      const priceField = this.priceField;

      this.typeSelect.onchange = () => {
        priceField.placeholder = getMinPrice(priceField.value).toString();
        priceField.min = getMinPrice(priceField.value).toString();
      };
    }
  }

  /**
   * устанавливает зависимость количества гостей от количества комнат
   */
  setGuestsNumberConfigurations(): void {
    if (this.guestsNumberSelect && this.guestsNumberOptions && this.roomsNumberSelect) {
      this.guestsNumberSelect.innerHTML = '';
      for (let option of this.guestsNumberOptions) {
        const optionValue = Number((option as HTMLOptionElement).value);
        const roomsNumber = Number(this.roomsNumberSelect.value);

        if (getGuestsNumber(roomsNumber).includes(optionValue)) this.guestsNumberSelect.appendChild(option);
      }
      this.roomsNumberSelect.onchange = () => this.setGuestsNumberConfigurations();
    }
  }

  /**
   * синхронизирует время заезда и время выезда
   */
  setTimeConfigurations(): void {
    if (this.checkInSelect && this.checkOutSelect) {
      const checkIn = this.checkInSelect;
      const checkOut = this.checkOutSelect;

      checkIn.onchange = () => checkOut.value = checkIn.value;
      checkOut.onchange = () => checkIn.value = checkOut.value;
    }
  }

  /**
   * переопределяет действия при отправке формы
   * @param {function} action - действие при отправке
   */
  onSubmit(action: (args?: any) => any): void {
    this.htmlElement.onsubmit = (evt) => {
      evt.preventDefault();
      action(evt);
    };
  }

  /**
   * переопределяет действия при очистке формы
   * @param {function} action - действие при нажатии на кнопку "очистить"
   */
  onReset(action: (args?: any) => any): void {
    if (this.resetButton) {
      this.resetButton.onclick = (evt) => {
        evt.preventDefault();
        action()
      };
    }
  }

  /**
   * проводит проверку длины заголовка при вводе и отправке
   */
  setTitleValidation(): void {
    if (this.titleField) {
      const titleField = this.titleField;

      // @ts-ignore
      titleField.oninput = _.debounce(() => {
        const valueLength = titleField.value.length;
        if (valueLength < TitleLength.Min) {
          titleField.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
        } else if (valueLength > TitleLength.Max) {
          titleField.setCustomValidity('Заголовок не должен превышать 100 символов');
        } else {
          titleField.setCustomValidity('');
        }
        titleField.reportValidity();
      }, VALIDATION_DELAY);

      titleField.oninvalid = () => {
        if (titleField.validity.valueMissing) {
          titleField.setCustomValidity('Обязательное поле');
        }
      };
    }
  }

  /**
   * проводит проверку стоимости жилья при вводе и отправке
   */
  setPriceValidation(): void {
    if (this.priceField) {
      const priceField = this.priceField;

      // @ts-ignore
      priceField.oninput = _.debounce(() => {
        const value = Number(priceField.value);
        if (value < Number(priceField.min)) {
          priceField.setCustomValidity(`Цена не должна быть ниже ${priceField.min} ₽/ночь`);
        } else if (value > Number(priceField.max)) {
          priceField.setCustomValidity(`Цена не должна превышать ${priceField.max} ₽/ночь`);
        } else {
          priceField.setCustomValidity('');
        }
        priceField.reportValidity();
      }, VALIDATION_DELAY);

      priceField.oninvalid = () => {
        if (priceField.validity.valueMissing) {
          priceField.setCustomValidity('Обязательное поле');
        }
      };
    }
  }
}

export {UserForm};
