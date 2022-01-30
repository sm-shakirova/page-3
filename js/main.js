// утилитарные функции
function getRandomNumber(min, max, accuracy = 0) {
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

    const MIN_DIGITS = String(min).split('.')[1];
    const MAX_DIGITS = String(max).split('.')[1];
    const MIN_LENGTH = Math.min(MIN_DIGITS.length, MAX_DIGITS.length, accuracy);

    for (let i = 0; i < MIN_LENGTH; i++) {
      if (MAX_DIGITS[i] - MIN_DIGITS[i] < 0) {
        throw new Error('The range is too small');
      } else if (MAX_DIGITS[i] - MIN_DIGITS[i] >= 1) {
        break
      }

      if (i === MIN_LENGTH - 1 && MAX_DIGITS[i] - MIN_DIGITS[i] < 1) {
        throw new Error('The range is too small');
      }
    }
  }

  const COEFFICIENT = 10 ** accuracy;
  max = Math.floor(max * COEFFICIENT) / COEFFICIENT;
  min = Math.ceil(min * COEFFICIENT) / COEFFICIENT;
  return Number((Math.random() * (max - min) + min).toFixed(accuracy));
}

function makeArray(start, stop) {
  let array = [];
  for (let i = start; i <= stop; i++) array.push(i);
  return array;
}

function addInitialZeros(number, stringLength) {
  number = String(number)
  while (number.length < stringLength) number = '0' + number;
  return number;
}

function getRandomArrayElement(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

function shuffle(iterable) {
  for (let i = iterable.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [iterable[i], iterable[j]] = [iterable[j], iterable[i]];
  }
  return iterable;
}

function getRandomSubArray(array) {
  const RANDOM_LENGTH = getRandomNumber(0, array.length - 1)
  return shuffle(array).slice(RANDOM_LENGTH);
}


// константы
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


// enum objects
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

// конструктор
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


const OFFERS = makeArray(1, OFFERS_COUNT)
  .map((id) => addInitialZeros(id, String(OFFERS_COUNT).length))
  .map((id) => createOffer(id));
