/* global _:readonly */
import {addOffersOnMap, mainMarker, TokyoCenter} from './map.js';
import {getData} from './api.js';

const RERENDER_DELAY = 500;

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

function makeArrayFromRange(start, stop) {
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
  const randomLength = getRandomNumber(0, array.length - 1)
  return shuffle(array).slice(randomLength);
}

function resetPage() {
  document.querySelector('.ad-form').reset();
  document.querySelector('.map__filters').reset();

  const defaultLocationX = TokyoCenter.LAT.toFixed(TokyoCenter.COORDINATES_ACCURACY);
  const defaultLocationY = TokyoCenter.LNG.toFixed(TokyoCenter.COORDINATES_ACCURACY);
  document.querySelector('#address').value = `${defaultLocationX}, ${defaultLocationY}`;
  mainMarker.setLatLng({lat: TokyoCenter.LAT, lng: TokyoCenter.LNG});

  getData((offers) => _.debounce(
    () => addOffersOnMap(offers),
    RERENDER_DELAY,
  ));
}

function isEscapeKeydown(key) {
  return key === ('Escape' || 'Esc');
}

export {
  getRandomNumber,
  makeArrayFromRange,
  addInitialZeros,
  getRandomArrayElement,
  getRandomSubArray,
  resetPage,
  isEscapeKeydown
};
