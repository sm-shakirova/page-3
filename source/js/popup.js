import {isEscapeKeydown} from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const successPopup = successTemplate.cloneNode(true);
const errorPopup = errorTemplate.cloneNode(true);

function onSuccessPopupEscape(evt) {
  if (isEscapeKeydown(evt.key)) {
    evt.preventDefault();
    successPopup.remove();
    document.removeEventListener('keydown', onSuccessPopupEscape);
  }
}

function onErrorPopupEscape(evt) {
  if (isEscapeKeydown(evt.key)) {
    evt.preventDefault();
    errorPopup.remove();
    document.removeEventListener('keydown', onErrorPopupEscape);
  }
}

function showSuccessPopup() {
  document.body.appendChild(successPopup);
  successPopup.onclick = () => {
    successPopup.remove();
    document.removeEventListener('keydown', onSuccessPopupEscape);
  }
  document.addEventListener('keydown', onSuccessPopupEscape);
}

function showErrorPopup() {
  document.body.appendChild(errorPopup);
  errorPopup.onclick = () => {
    errorPopup.remove();
    document.removeEventListener('keydown', onErrorPopupEscape);
  }
  document.addEventListener('keydown', onErrorPopupEscape);
}

export {showSuccessPopup, showErrorPopup};
