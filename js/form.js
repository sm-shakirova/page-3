import {Price, getMinPrice} from './data.js';

const form = document.querySelector('.ad-form');
const typeSelect = form.querySelector('#type');
const priceField = form.querySelector('#price');
const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');

priceField.placeholder = getMinPrice(typeSelect.value);
priceField.min = getMinPrice(typeSelect.value);
priceField.max = Price.MAX;

typeSelect.onchange = () => {
  priceField.placeholder = getMinPrice(typeSelect.value);
  priceField.min = getMinPrice(typeSelect.value);
};

timeInSelect.onchange = () => timeOutSelect.value = timeInSelect.value;
timeOutSelect.onchange = () => timeInSelect.value = timeOutSelect.value;
