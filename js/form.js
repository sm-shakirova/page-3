import {getMinPrice} from './generate-data.js';
import {resetPage} from './util.js';
import {showSuccessPopup, showErrorPopup} from './popup.js';

const TitleLength = {
  MIN: 30,
  MAX: 100,
};
const RoomsGuestCorrelation = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const form = document.querySelector('.ad-form');
const typeSelect = form.querySelector('#type');
const priceField = form.querySelector('#price');
const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');
const titleField = form.querySelector('#title');
const roomsNumberSelect = form.querySelector('#room_number');
const guestsNumberSelect = form.querySelector('#capacity');

// функция для неактивного состояния формы
function disableForm(form, className) {
  form.classList.add(`${className}--disabled`);
  for (let child of form.children) child.disabled = true;
}

// функция для активного состояния формы
function enableForm(form, className) {
  form.classList.remove(`${className}--disabled`);
  for (let child of form.children) child.disabled = false;
}

// зависимость стоимости от типа жилья
typeSelect.onchange = () => {
  priceField.placeholder = getMinPrice(typeSelect.value);
  priceField.min = getMinPrice(typeSelect.value);
};

// синхронизация времени заезда и выезда
timeInSelect.onchange = () => timeOutSelect.value = timeInSelect.value;
timeOutSelect.onchange = () => timeInSelect.value = timeOutSelect.value;

// синхронизация количества комнат и количества гостей
function checkGuestsNumber(options) {
  while (guestsNumberSelect.firstChild) guestsNumberSelect.removeChild(guestsNumberSelect.firstChild);
  for (let option of options) {
    const optionValue = Number(option.value);
    const roomsNumber = Number(roomsNumberSelect.value);
    if (RoomsGuestCorrelation[roomsNumber].includes(optionValue)) {
      guestsNumberSelect.appendChild(option);
    }
  }
}

const options = guestsNumberSelect.querySelectorAll('option');
checkGuestsNumber(options);
roomsNumberSelect.onchange = () => checkGuestsNumber(options);

// валидация
titleField.oninput = () => {
  const valueLength = titleField.value.length;
  if (valueLength < TitleLength.MIN) {
    titleField.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  } else if (valueLength > TitleLength.MAX) {
    titleField.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else {
    titleField.setCustomValidity('');
  }

  titleField.reportValidity();
};

priceField.oninput = () => {
  const value = Number(priceField.value);
  if (value < priceField.min) {
    priceField.setCustomValidity(`Цена не должна быть ниже ${priceField.min} ₽/ночь`);
  } else if (value > priceField.max) {
    priceField.setCustomValidity(`Цена не должна превышать ${priceField.max} ₽/ночь`);
  } else {
    priceField.setCustomValidity('');
  }

  priceField.reportValidity();
};

// отправка формы
form.onsubmit = (evt) => {
  evt.preventDefault();

  fetch(
    'https://23.javascript.pages.academy/keksobookinggg',
    {
      method: 'POST',
      body: new FormData(evt.target),
    },
  ).then((response) => {
    if (!response.ok) throw new Error('Не удалось отправить форму');
  }).then(() => resetPage())
    .then(() => showSuccessPopup())
    .catch(() => showErrorPopup());
};

form.onreset = (evt) => {
  evt.preventDefault();
  resetPage();
};

export {disableForm, enableForm};
