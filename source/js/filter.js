const PriceRange = {
  LOW: {
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50000,
  },
};

class Filter {
  /**
   * создает экземпляр класса Filter
   * @constructor
   * @param filtersForm - форма с фильтрами, экземпляр класса Form
   */
  constructor(filtersForm) {
    this.form = filtersForm.htmlElement;

    this.typeSelect = this.form.querySelector('#housing-type');
    this.priceSelect = this.form.querySelector('#housing-price');
    this.roomsNumberSelect = this.form.querySelector('#housing-rooms');
    this.guestsNumberSelect = this.form.querySelector('#housing-guests');
    this.featuresList = this.form.querySelectorAll('[name="features"]');
  }

  onChange(cb) {
    this.typeSelect.onchange = () => cb();
    this.priceSelect.onchange = () => cb();
    this.roomsNumberSelect.onchange = () => cb();
    this.guestsNumberSelect.onchange = () => cb();
    for (let feature of this.featuresList) {
      feature.onclick = () => cb();
    }
  }

  /**
   * проверяет объявление на соответствие фильтрам
   * @param offer - объявление из базы данных
   * @returns {boolean} - значение для фильтрации массива методом filter
   */
  check(offer) {
    const type = this.typeSelect.value;
    const price = this.priceSelect.value;
    const rooms = this.roomsNumberSelect.value;
    const guests = this.guestsNumberSelect.value;

    if (type !== 'any' && type !== offer.offer.type) return false;
    if (price === 'low' && offer.offer.price > PriceRange.LOW.MAX) return false;
    if (price === 'middle' &&
      (offer.offer.price < PriceRange.MIDDLE.MIN || offer.offer.price > PriceRange.MIDDLE.MAX)) return false;
    if (price === 'high' && offer.offer.price < PriceRange.LOW.MIN) return false;
    if (rooms !== 'any' && Number(rooms) !== offer.offer.rooms) return false;
    if (guests !== 'any' && Number(guests) !== offer.offer.guests) return false;

    for (let feature of this.featuresList) {
      if (feature.checked && !offer.offer.features) return false;
      if (feature.checked && !offer.offer.features.includes(feature.value)) return false;
    }

    return true;
  }
}

export {Filter};
