const ALERT_SHOW_TIME = 5000;

const map = document.querySelector('#map-canvas');

function showAlert(message) {
  const alert = document.createElement('div');
  alert.style.zIndex = 1000;
  alert.style.position = 'absolute';
  alert.style.left = 0;
  alert.style.top = 0;
  alert.style.right = 0;
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '20px';
  alert.style.color = 'white';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = '#ef1616';
  alert.textContent = message;

  map.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
}

function getData(onSuccess) {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error('Ошибка загрузки');
    })
    .then((data) => onSuccess(data))
    .catch(() => showAlert('Ошибка загрузки объявлений'));
}

export {getData};
