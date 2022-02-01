import {createOffers} from './data.js';

const cardTemplate = document.querySelector('#card').content;
const popup = cardTemplate.querySelector('.popup');
const container = document.querySelector('#map-canvas');

function convertType(type) {
  switch (type) {
    case 'palace': return 'Дворец';
    case 'flat': return 'Квартира';
    case 'house': return 'Дом';
    case 'bungalow': return 'Бунгало';
    default: return undefined;
  }
}

function renderFeature(name) {
  let newFeature = document.createElement('li');
  newFeature.classList.add('popup__feature');
  newFeature.classList.add(`popup__feature--${name}`);
  return newFeature;
}

function renderPhoto(src, template) {
  let newPhoto = template.cloneNode(true);
  newPhoto.src = src;
  return newPhoto;
}

function renderCard(data) {
  const newCard = popup.cloneNode(true);

  const avatar = newCard.querySelector('.popup__avatar');
  const title = newCard.querySelector('.popup__title');
  const address = newCard.querySelector('.popup__text--address');
  const price = newCard.querySelector('.popup__text--price');
  const type = newCard.querySelector('.popup__type');
  const capacity = newCard.querySelector('.popup__text--capacity');
  const time = newCard.querySelector('.popup__text--time');
  const featuresContainer = newCard.querySelector('.popup__features');
  const description = newCard.querySelector('.popup__description');
  const photosContainer = newCard.querySelector('.popup__photos');
  const photoTemplate = photosContainer.querySelector('.popup__photo');

  avatar.src = data.author.avatar;
  title.textContent = data.offer.title;
  address.textContent = data.offer.address;
  price.textContent = `${data.offer.price} ₽/ночь`;
  type.textContent = convertType(data.offer.type);
  capacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  time.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  description.textContent = data.offer.description;

  featuresContainer.innerHTML = '';
  const features = data.offer.features;
  const featuresListFragment = document.createDocumentFragment();
  features.forEach((feature) => featuresListFragment.appendChild(renderFeature(feature)));
  featuresContainer.appendChild(featuresListFragment);

  photosContainer.innerHTML = '';
  const photos = data.offer.photos;
  const photosListFragment = document.createDocumentFragment();
  photos.forEach((photo) => photosListFragment.appendChild(renderPhoto(photo, photoTemplate)));
  photosContainer.appendChild(photosListFragment);

  container.appendChild(newCard);
}

export {renderCard};
