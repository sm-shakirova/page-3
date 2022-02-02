import {Price, getMinPrice} from './generate-data.js';

const form = document.querySelector('.ad-form');
const typeSelect = form.querySelector('#type');
const priceField = form.querySelector('#price');
const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');

// функция для неактивного состояния формы
function disableForm(form, className) {
  form.classList.add(`${className}--disabled`);
  for (let child of form.children) child.disabled = true;
}

// функция для активного состояния формы
function activateForm(form, className) {
  form.classList.remove(`${className}--disabled`);
  for (let child of form.children) child.disabled = false;
}

// изначальные настройки поля со стоимостью
priceField.placeholder = getMinPrice(typeSelect.value);
priceField.min = getMinPrice(typeSelect.value);
priceField.max = Price.MAX;

// зависимость стоимости от типа жилья
typeSelect.onchange = () => {
  priceField.placeholder = getMinPrice(typeSelect.value);
  priceField.min = getMinPrice(typeSelect.value);
};

// синхронизация времени заезда и выезда
timeInSelect.onchange = () => timeOutSelect.value = timeInSelect.value;
timeOutSelect.onchange = () => timeInSelect.value = timeOutSelect.value;

export {disableForm, activateForm, form};
