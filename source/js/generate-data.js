import {Random, Util} from './util.js';

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
  MIN: {
    BUNGALOW: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  },
  MAX: 1000000,
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
    MIN: 35.65,
    MAX: 35.7,
  },
  Y: {
    MIN: 139.7,
    MAX: 139.8,
  },
  ACCURACY: 5,
}

function getMinPrice(type) {
  switch (type) {
    case 'bungalow': return Price.MIN.BUNGALOW;
    case 'flat': return Price.MIN.FLAT;
    case 'house': return Price.MIN.HOUSE;
    case 'palace': return Price.MIN.PALACE;
    default: return 0;
  }
}

function createOffer(id) {
  const locationX = Random.getNumber(Location.X.MIN, Location.X.MAX, Location.ACCURACY);
  const locationY = Random.getNumber(Location.Y.MIN, Location.Y.MAX, Location.ACCURACY);
  const time = Random.getArrayElement(TIME_OPTIONS);
  const type = Random.getArrayElement(TYPES);
  const minPrice = getMinPrice(type);
  const maxPrice = Price.MAX;

  return {
    author: {
      avatar: AVATAR_LINK_TEMPLATE.replace('{{xx}}', id),
    },
    offer: {
      type: type,
      checkin: time,
      checkout: time,
      title: Random.getArrayElement(TITLES),
      address: `${locationX}, ${locationY}`,
      price: Random.getNumber(minPrice, maxPrice),
      rooms: Random.getNumber(Rooms.MIN, Rooms.MAX),
      guests: Random.getNumber(Guests.MIN, Guests.MAX),
      features: Random.getSubArray(FEATURES),
      photos: Random.getSubArray(PHOTOS),
      description: Random.getArrayElement(DESCRIPTIONS),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
}

function createOffers(count) {
  return Util.makeArrayFromRange(1, count)
    .map((id) => Util.addInitialZeros(id, String(count).length))
    .map((id) => createOffer(id));
}

export {getMinPrice};
