import {OfferDataType, getTypeTranslation} from "./data-details";

class Card {
  readonly template: HTMLElement;
  readonly htmlElement: HTMLElement;

  /**
   * рисует карточку объявления
   * @constructor
   * @param {OfferDataType} data - объект с данными об объявлении
   */
  constructor(data: OfferDataType) {
    this.template = (document.querySelector('#card') as HTMLTemplateElement).content.querySelector('.popup')!;
    this.htmlElement = this.template.cloneNode(true) as HTMLElement;

    const avatar = this.htmlElement.querySelector('.popup__avatar') as HTMLImageElement;
    const title = this.htmlElement.querySelector('.popup__title') as HTMLParagraphElement;
    const address = this.htmlElement.querySelector('.popup__text--address') as HTMLParagraphElement;
    const price = this.htmlElement.querySelector('.popup__text--price') as HTMLParagraphElement;
    const type = this.htmlElement.querySelector('.popup__type') as HTMLParagraphElement;
    const capacity = this.htmlElement.querySelector('.popup__text--capacity') as HTMLParagraphElement;
    const time = this.htmlElement.querySelector('.popup__text--time') as HTMLParagraphElement;
    const description = this.htmlElement.querySelector('.popup__description') as HTMLParagraphElement;
    const featuresContainer = this.htmlElement.querySelector('.popup__features') as HTMLElement;
    const photosContainer = this.htmlElement.querySelector('.popup__photos') as HTMLElement;
    const photoTemplate = this.htmlElement.querySelector('.popup__photo') as HTMLImageElement;

    if (avatar) {
      data.author.avatar ? avatar.src = data.author.avatar : avatar.remove();
      avatar.onerror = () => avatar.src = 'img/avatars/default.png';
    }

    if (title) data.offer.title ? title.textContent = data.offer.title : title.remove();
    if (address) data.offer.address ? address.textContent = data.offer.address : address.remove();
    if (price) data.offer.price ? price.textContent = `${data.offer.price} ₽/ночь` : price.remove();
    if (type) data.offer.type ? type.textContent = getTypeTranslation(data.offer.type) : type.remove();
    if (description) data.offer.description ? description.textContent = data.offer.description : description.remove();

    if (capacity) {
      data.offer.rooms && data.offer.guests ?
        capacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей` :
        capacity.remove();
    }

    if (time) {
      data.offer.checkin && data.offer.checkout ?
        time.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}` :
        time.remove();
    }

    if (featuresContainer) {
      if (data.offer.features && data.offer.features.length !== 0) {
        featuresContainer.innerHTML = '';
        const featuresListFragment = document.createDocumentFragment();
        data.offer.features.forEach((feature) =>
          featuresListFragment.appendChild(Card.renderFeature(feature)),
        );
        featuresContainer.appendChild(featuresListFragment);
      } else featuresContainer.remove();
    }

    if (photosContainer) {
      if (data.offer.photos && data.offer.photos.length !== 0) {
        photosContainer.innerHTML = '';
        const photosListFragment = document.createDocumentFragment();
        data.offer.photos.forEach((photo) =>
          photosListFragment.appendChild(Card.renderPhoto(photo, photoTemplate)),
        );
        photosContainer.appendChild(photosListFragment);
      } else photosContainer.remove();
    }
  }

  /**
   * создает HTML элемент для списка дополнительных удобств
   * @param {string} name - название фичи
   * @return {HTMLElement}
   * @private
   */
  private static renderFeature(name: string): HTMLElement {
    let newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature');
    newFeature.classList.add(`popup__feature--${name}`);
    return newFeature;
  }

  /**
   * создает HTML элемент для списка фотографий жилья
   * @param {string} src - ссылка на фото
   * @param {HTMLImageElement} template - шаблон HTML элемента
   * @return {HTMLImageElement}
   * @private
   */
  private static renderPhoto(src: string, template: HTMLImageElement): HTMLImageElement {
    let newPhoto = template.cloneNode(true) as HTMLImageElement;
    newPhoto.src = src;
    return newPhoto;
  }
}

export {Card};
