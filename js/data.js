import {
  getRandomNumber,
  makeArray,
  addInitialZeros,
  getRandomArrayElement,
  getRandomSubArray
} from './util.js';


const OFFERS_COUNT = 10;
const AVATAR_LINK_TEMPLATE = 'img/avatars/user{{xx}}.png';
const TITLES = [
  'Уютная квартирка в центре города',
  'Сдам дворец',
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const TIME_OPTIONS = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTIONS = [
  'Сдается уютная квартира в центре города, можно с котом, собак не люблю',
  'Сдам дворец на выходные, порядочным славянам, уборка за ваш счет',
];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];


const Price = {
  MIN: 100,
  MAX: 10000000,
};
const Rooms = {
  MIN: 1,
  MAX: 50,
};
const Guests = {
  MIN: 1,
  MAX: 20,
};
const Location = {
  X: {
    MIN: 35.65000,
    MAX: 35.70000,
  },
  Y: {
    MIN: 139.70000,
    MAX: 139.80000,
  },
  ACCURACY: 5,
}


function createOffer(id) {
  const LOCATION_X = getRandomNumber(Location.X.MIN, Location.X.MAX, Location.ACCURACY);
  const LOCATION_Y = getRandomNumber(Location.Y.MIN, Location.Y.MAX, Location.ACCURACY);

  return {
    author: {
      avatar: AVATAR_LINK_TEMPLATE.replace('{{xx}}', id),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${LOCATION_X}, ${LOCATION_Y}`,
      price: getRandomNumber(Price.MIN, Price.MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(Rooms.MIN, Rooms.MAX),
      guests: getRandomNumber(Guests.MIN, Guests.MAX),
      checkin: getRandomArrayElement(TIME_OPTIONS),
      checkout: getRandomArrayElement(TIME_OPTIONS),
      features: getRandomSubArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomSubArray(PHOTOS),
    },
    location: {
      x: LOCATION_X,
      y: LOCATION_Y,
    },
  };
}


function createAllOffers() {
  return makeArray(1, OFFERS_COUNT)
    .map((id) => addInitialZeros(id, String(OFFERS_COUNT).length))
    .map((id) => createOffer(id));
}


export {createAllOffers};
