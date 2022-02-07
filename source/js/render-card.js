const TYPE_TRANSLATION = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

function getTypeTranslation(type) {
  return TYPE_TRANSLATION[type] ? TYPE_TRANSLATION[type] : type;
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
  const newCard = cardTemplate.cloneNode(true);

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

  data.author.avatar ? avatar.src = data.author.avatar : avatar.remove();
  avatar.onerror = () => avatar.src = 'img/avatars/default.png';

  data.offer.title ? title.textContent = data.offer.title : title.remove();
  data.offer.address ? address.textContent = data.offer.address : address.remove();
  data.offer.price ? price.textContent = `${data.offer.price} ₽/ночь` : price.remove();
  data.offer.type ? type.textContent = getTypeTranslation(data.offer.type) : type.remove();
  data.offer.description ? description.textContent = data.offer.description : description.remove();
  data.offer.rooms && data.offer.guests ?
    capacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей` :
    capacity.remove();
  data.offer.checkin && data.offer.checkout ?
    time.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}` :
    time.remove();

  if (data.offer.features && data.offer.features.length !== 0) {
    const features = data.offer.features;

    featuresContainer.innerHTML = '';
    const featuresListFragment = document.createDocumentFragment();
    features.forEach((feature) => featuresListFragment.appendChild(renderFeature(feature)));
    featuresContainer.appendChild(featuresListFragment);
  } else featuresContainer.remove();

  if (data.offer.photos && data.offer.photos !== 0) {
    const photos = data.offer.photos;

    photosContainer.innerHTML = '';
    const photosListFragment = document.createDocumentFragment();
    photos.forEach((photo) => photosListFragment.appendChild(renderPhoto(photo, photoTemplate)));
    photosContainer.appendChild(photosListFragment);
  } else photosContainer.remove();

  return newCard;
}

export {renderCard};
