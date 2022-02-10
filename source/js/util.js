import {Server} from './api.js';
import {COORDINATES_ACCURACY} from './map.js';

const OFFERS_COUNT = 10;

const server = new Server;

class Random {
  /**
   * возвращает случайное число из диапазона
   * @param {number} min - нижняя граница (включительно)
   * @param {number} max - верхняя граница (включительно)
   * @param {number} accuracy - количество знаков после запятой
   */
  static getNumber(min, max, accuracy = 0) {
    if (isNaN(min) || isNaN(max) || isNaN(accuracy)) {
      throw new Error('All parameters must be numbers');
    }

    if (min < 0 || max < 0 || accuracy < 0) {
      throw new Error('All parameters must be positive');
    }

    if (min > max) {
      [min, max] = [max, min];
    } else if (min === max) {
      return min;
    }

    if (max - min < 1) {
      if (accuracy === 0) {
        throw new Error('The range is too small');
      }

      const minDigits = String(min).split('.')[1];
      const maxDigits = String(max).split('.')[1];
      const minLength = Math.min(minDigits.length, maxDigits.length, accuracy);

      for (let i = 0; i < minLength; i++) {
        if (maxDigits[i] - minDigits[i] < 0) {
          throw new Error('The range is too small');
        } else if (maxDigits[i] - minDigits[i] >= 1) {
          break
        }

        if (i === minDigits - 1 && maxDigits[i] - minDigits[i] < 1) {
          throw new Error('The range is too small');
        }
      }
    }

    const coefficient = 10 ** accuracy;
    max = Math.floor(max * coefficient) / coefficient;
    min = Math.ceil(min * coefficient) / coefficient;
    return Number((Math.random() * (max - min) + min).toFixed(accuracy));
  }

  /**
   * случайным образом перемешивает список
   * @param array - массив элементов
   */
  static shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * возвращает случайный элемент списка
   * @param array - массив элементов
   */
  static getArrayElement(array) {
    return array[this.getNumber(0, array.length - 1)];
  }

  /**
   * возвращает набор случайных элементов из списка
   * @param array - массив элементов
   */
  static getSubArray(array) {
    const randomLength = this.getNumber(0, array.length - 1)
    return this.shuffle(array).slice(randomLength);
  }
}

class Page {
  /**
   * создает экземпляр класса Page
   * @param filtersForm - форма с фильтрами
   * @param userForm - форма для размещения объявления
   */
  constructor(filtersForm, userForm) {
    this.filtersForm = filtersForm;
    this.userForm = userForm;
  }

  /**
   * возвращает все поля страницы в начальное положение без перезагрузки
   * @param map
   * @param mainMarker
   */
  reset(map, mainMarker) {
    this.filtersForm.htmlElement.reset();
    this.userForm.htmlElement.reset();

    const defaultLocationX = mainMarker.lat.toFixed(COORDINATES_ACCURACY);
    const defaultLocationY = mainMarker.lng.toFixed(COORDINATES_ACCURACY);

    document.querySelector('#address').value = `${defaultLocationX}, ${defaultLocationY}`;
    mainMarker.layer.setLatLng({lat: mainMarker.lat, lng: mainMarker.lng});

    server.getData(
      (offers) => {
        map.addOffers(
          offers,
          OFFERS_COUNT,
          '../img/pin.svg',
          40,
        );
      },
      () => map.showAlert('Ошибка загрузки объявлений'),
    );
  }

  /**
   * приводит страницу в неактивное состояние
   */
  disable() {
    this.filtersForm.disable();
    this.userForm.disable();
  }

  /**
   * переводит страницу в активное состояние
   */
  enable() {
    this.filtersForm.enable();
    this.userForm.enable();
  }
}

class Util {
  static makeArrayFromRange(start, stop) {
    let array = [];
    for (let i = start; i <= stop; i++) array.push(i);
    return array;
  }

  static addInitialZeros(number, stringLength) {
    number = String(number)
    while (number.length < stringLength) number = '0' + number;
    return number;
  }

  static isEscapeKeydown(key) {
    return key === ('Escape' || 'Esc');
  }
}

export {Random, Util, Page};
