import {OfferDataType, PriceRange} from './data-details';
import {Form} from './form';

class FiltersForm extends Form {
  public className: string;
  readonly htmlElement: HTMLFormElement;
  readonly typeSelect?: HTMLSelectElement | null;
  readonly priceSelect?: HTMLSelectElement | null;
  readonly roomsNumberSelect?: HTMLSelectElement | null;
  readonly guestsNumberSelect?: HTMLSelectElement | null;
  readonly featuresList?: NodeList | null;

  /**
   * создает экземпляр класса FiltersForm
   * @constructor
   * @param {string} className - форма с фильтрами, экземпляр класса Form
   */
  constructor(className: string) {
    super();
    this.htmlElement = document.querySelector(`.${className}`)! as HTMLFormElement;
    this.className = className;

    this.typeSelect = this.htmlElement.querySelector('#housing-type') as HTMLSelectElement;
    this.priceSelect = this.htmlElement.querySelector('#housing-price') as HTMLSelectElement;
    this.roomsNumberSelect = this.htmlElement.querySelector('#housing-rooms') as HTMLSelectElement;
    this.guestsNumberSelect = this.htmlElement.querySelector('#housing-guests') as HTMLSelectElement;
    this.featuresList = this.htmlElement.querySelectorAll('[name="features"]');
  }

  /**
   * устанавливает действие, которое будут происходить при изменении фильтров
   * @param {function} action - действие при изменении фильтров
   */
  onChange(action: (args?: any) => any): void {
    if (this.typeSelect) this.typeSelect.onchange = () => action();
    if (this.priceSelect) this.priceSelect.onchange = () => action();
    if (this.roomsNumberSelect) this.roomsNumberSelect.onchange = () => action();
    if (this.guestsNumberSelect) this.guestsNumberSelect.onchange = () => action();
    if (this.featuresList) {
      for (let feature of this.featuresList) {
        (feature as HTMLInputElement).onclick = () => action();
      }
    }
  }

  /**
   * проверяет объявление на соответствие фильтрам
   * @param {OfferDataType} offer - объявление из базы данных
   * @returns {boolean} - значение для фильтрации массива методом filter
   */
  check(offer: OfferDataType): boolean {
    const type = this.typeSelect ? this.typeSelect.value : null;
    const price = this.priceSelect ? this.priceSelect.value : null;
    const rooms = this.roomsNumberSelect ? this.roomsNumberSelect.value : null;
    const guests = this.guestsNumberSelect ? this.guestsNumberSelect.value : null;

    if (type !== 'any' && type !== offer.offer.type) return false;
    if (rooms !== 'any' && Number(rooms) !== offer.offer.rooms) return false;
    if (guests !== 'any' && Number(guests) !== offer.offer.guests) return false;

    const offerPrice = Number(offer.offer.price);
    if (price === 'low' && offerPrice > PriceRange.LOW.MAX) return false;
    if (price === 'middle' && offerPrice < PriceRange.MIDDLE.MIN || offerPrice > PriceRange.MIDDLE.MAX) return false;
    if (price === 'high' && offerPrice < PriceRange.HIGH.MIN) return false;

    if (this.featuresList) {
      for (let feature of this.featuresList) {
        if ((feature as HTMLInputElement).checked && !offer.offer.features) return false;
        if ((feature as HTMLInputElement).checked &&
          !offer.offer.features!.includes((feature as HTMLInputElement).value)) return false;
      }
    }

    return true;
  }
}

export {FiltersForm};
