/* global _:readonly */
import {getMinPrice} from './generate-data.js';
import {Photo} from './photo-preview.js';

const VALIDATION_DELAY = 700;

const TitleLength = {
  MIN: 30,
  MAX: 100,
};

const RoomsGuestCorrelation = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

class Form {
  /**
   * создает экземпляр класса Form
   * @constructor
   * @param {string} className - класс формы
   */
  constructor(className) {
    this.htmlElement = document.querySelector(`.${className}`);
    this.className = className;

    if (className === 'ad-form') {
      this.typeSelect = this.htmlElement.querySelector('#type');
      this.priceField = this.htmlElement.querySelector('#price');
      this.checkInSelect = this.htmlElement.querySelector('#timein');
      this.checkOutSelect = this.htmlElement.querySelector('#timeout');
      this.titleField = this.htmlElement.querySelector('#title');
      this.roomsNumberSelect = this.htmlElement.querySelector('#room_number');
      this.guestsNumberSelect = this.htmlElement.querySelector('#capacity');
      this.guestsNumberOptions = this.guestsNumberSelect.querySelectorAll('option');
      this.resetButton = this.htmlElement.querySelector('.ad-form__reset');

      this.avatar = new Photo(
        'ad-form__field',
        'ad-form-header__preview',
        false);

      this.photo = new Photo(
        'ad-form__upload',
        'ad-form__photo',
        true);
    }
  }

  /**
   * приводит форму в неактивное состояние
   */
  disable() {
    this.htmlElement.classList.add(`${this.className}--disabled`);
    for (let child of this.htmlElement.children) child.disabled = true;
  }

  /**
   * приводит форму в активное состояние
   */
  enable() {
    this.htmlElement.classList.remove(`${this.className}--disabled`);
    for (let child of this.htmlElement.children) child.disabled = false;
  }

  /**
   * устанавливает зависимость стоимости от типа жилья
   */
  setPriceConfigurations() {
    this.typeSelect.onchange = () => {
      this.priceField.placeholder = getMinPrice(this.typeSelect.value);
      this.priceField.min = getMinPrice(this.typeSelect.value);
    };
  }

  /**
   * устанавливает зависимость количества гостей от количества комнат
   */
  setGuestsNumberConfigurations() {
    this.guestsNumberSelect.innerHTML = '';
    for (let option of this.guestsNumberOptions) {
      const optionValue = Number(option.value);
      const roomsNumber = Number(this.roomsNumberSelect.value);
      if (RoomsGuestCorrelation[roomsNumber].includes(optionValue)) {
        this.guestsNumberSelect.appendChild(option);
      }
    }
    this.roomsNumberSelect.onchange = () => this.setGuestsNumberConfigurations();
  }

  /**
   * синхронизирует время заезда и время выезда
   */
  setTimeConfigurations() {
    this.checkInSelect.onchange = () => this.checkOutSelect.value = this.checkInSelect.value;
    this.checkOutSelect.onchange = () => this.checkInSelect.value = this.checkOutSelect.value;
  }

  /**
   * переопределяет действия при отправке формы
   * @param {function} action - действие при отправке
   */
  onSubmit(action) {
    this.htmlElement.onsubmit = (evt) => {
      evt.preventDefault();
      action(evt);
    };
  }

  /**
   * переопределяет действия при очистке формы
   * @param {function} action - действие при нажатии на кнопку "очистить"
   */
  onReset(action) {
    this.resetButton.onclick = (evt) => {
      evt.preventDefault();
      action()
    };
  }

  /**
   * проводит проверку длины заголовка при вводе и отправке
   */
  setTitleValidation() {
    this.titleField.oninput = _.debounce(() => {
      const valueLength = this.titleField.value.length;
      if (valueLength < TitleLength.MIN) {
        this.titleField.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
      } else if (valueLength > TitleLength.MAX) {
        this.titleField.setCustomValidity('Заголовок не должен превышать 100 символов');
      } else {
        this.titleField.setCustomValidity('');
      }
      this.titleField.reportValidity();
    }, VALIDATION_DELAY);

    this.titleField.oninvalid = () => {
      if (this.titleField.validity.valueMissing) {
        this.titleField.setCustomValidity('Обязательное поле');
      }
    };
  }

  /**
   * проводит проверку стоимости жилья при вводе и отправке
   */
  setPriceValidation() {
    this.priceField.oninput = _.debounce(() => {
      const value = Number(this.priceField.value);
      if (value < this.priceField.min) {
        this.priceField.setCustomValidity(`Цена не должна быть ниже ${this.priceField.min} ₽/ночь`);
      } else if (value > this.priceField.max) {
        this.priceField.setCustomValidity(`Цена не должна превышать ${this.priceField.max} ₽/ночь`);
      } else {
        this.priceField.setCustomValidity('');
      }
      this.priceField.reportValidity();
    }, VALIDATION_DELAY);

    this.priceField.oninvalid = () => {
      if (this.priceField.validity.valueMissing) {
        this.priceField.setCustomValidity('Обязательное поле');
      }
    };
  }
}

export {Form};
