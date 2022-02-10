const TYPE_TRANSLATION = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const template = document.querySelector('#card').content.querySelector('.popup');

class Card {
  /**
   * рисует карточку объявления
   * @constructor
   * @param data - объект с данными об объявлении
   */
  constructor(data) {
    this.htmlElement = template.cloneNode(true);

    const avatar = this.htmlElement.querySelector('.popup__avatar');
    const title = this.htmlElement.querySelector('.popup__title');
    const address = this.htmlElement.querySelector('.popup__text--address');
    const price = this.htmlElement.querySelector('.popup__text--price');
    const type = this.htmlElement.querySelector('.popup__type');
    const capacity = this.htmlElement.querySelector('.popup__text--capacity');
    const time = this.htmlElement.querySelector('.popup__text--time');
    const featuresContainer = this.htmlElement.querySelector('.popup__features');
    const description = this.htmlElement.querySelector('.popup__description');
    const photosContainer = this.htmlElement.querySelector('.popup__photos');
    const photoTemplate = this.htmlElement.querySelector('.popup__photo');

    data.author.avatar ? avatar.src = data.author.avatar : avatar.remove();
    avatar.onerror = () => avatar.src = 'img/avatars/default.png';

    data.offer.title ? title.textContent = data.offer.title : title.remove();
    data.offer.address ? address.textContent = data.offer.address : address.remove();
    data.offer.price ? price.textContent = `${data.offer.price} ₽/ночь` : price.remove();
    data.offer.type ? type.textContent = this._getTypeTranslation(data.offer.type) : type.remove();
    data.offer.description ? description.textContent = data.offer.description : description.remove();
    data.offer.rooms && data.offer.guests ?
      capacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей` :
      capacity.remove();
    data.offer.checkin && data.offer.checkout ?
      time.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}` :
      time.remove();

    if (data.offer.features && data.offer.features.length !== 0) {
      featuresContainer.innerHTML = '';
      const featuresListFragment = document.createDocumentFragment();
      data.offer.features.forEach((feature) =>
        featuresListFragment.appendChild(this._renderFeature(feature)),
      );
      featuresContainer.appendChild(featuresListFragment);
    } else featuresContainer.remove();

    if (data.offer.photos && data.offer.photos.length !== 0) {
      photosContainer.innerHTML = '';
      const photosListFragment = document.createDocumentFragment();
      data.offer.photos.forEach((photo) =>
        photosListFragment.appendChild(this._renderPhoto(photo, photoTemplate)),
      );
      photosContainer.appendChild(photosListFragment);
    } else photosContainer.remove();
  }

  /**
   * проверяет наличие перевода для названия типа жилья
   * @param {string} type - тип жилья
   * @private
   */
  _getTypeTranslation(type) {
    return TYPE_TRANSLATION[type] ? TYPE_TRANSLATION[type] : type;
  }

  /**
   * создает HTML элемент для списка дополнительных удобств
   * @param {string} name - название фичи
   * @private
   */
  _renderFeature(name) {
    let newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature');
    newFeature.classList.add(`popup__feature--${name}`);
    return newFeature;
  }

  /**
   * создает HTML элемент для списка фотографий жилья
   * @param {string} src - ссылка на фото
   * @param template - шаблон HTML элемента
   * @private
   */
  _renderPhoto(src, template) {
    let newPhoto = template.cloneNode(true);
    newPhoto.src = src;
    return newPhoto;
  }
}

export {Card};
