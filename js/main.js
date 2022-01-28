// Функция, возвращающая случайное целое число из переданного диапазона включительно.

function getRandomInt(min, max) {
  if (isNaN(min) || isNaN(max) || isNaN(accuracy)) {
    throw new Error('All parameters must be numbers');
  }

  if (min < 0 || max < 0) {
    throw new Error('All  parameters must be positive');
  }

  if (min > max) {
    throw new Error('First parameter must be smaller than the second');
  }

  return Math.floor( Math.random() * (max + min + 1) + min);
}


// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

function getRandomFloat(min, max, accuracy) {
  if (isNaN(min) || isNaN(max) || isNaN(accuracy)) {
    throw new Error('All parameters must be numbers');
  }

  if (min < 0 || max < 0 || accuracy < 0) {
    throw new Error('All parameters must be positive');
  }

  if (min > max) {
    throw new Error('First parameter must be smaller than the second');
  } else if (min === max) {
    return min;
  }

  if (max - min < 1) {
    if (accuracy === 0) {
      throw new Error('The range is too small');
    }

    let minDigits = String(min).split('.')[1];
    let maxDigits = String(max).split('.')[1];

    let minLength = minDigits.length < maxDigits.length ? minDigits : maxDigits;
    minLength = minLength < accuracy ? minLength : accuracy;

    for (let i = 0; i < minLength; i++) {
      if (maxDigits[i] - minDigits[i] < 0) {
        throw new Error('The range is too small');
      } else if (maxDigits[i] - minDigits[i] >= 1) {
        break
      }

      if (i === minLength - 1 && maxDigits[i] - minDigits[i] < 1) {
        throw new Error('The range is too small');
      }
    }
  }

  let coefficient = 10 ** accuracy;
  max = Math.floor(max * coefficient) / coefficient;
  min = Math.ceil(min * coefficient) / coefficient;
  return Number((Math.random() * (max - min) + min).toFixed(accuracy));
}
