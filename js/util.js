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

export {
  getRandomNumber,
  makeArray,
  addInitialZeros,
  getRandomArrayElement,
  getRandomSubArray
};
