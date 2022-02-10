/* global L:readonly */
import {Card} from './render-card.js';

const ALERT_SHOW_TIME = 5000;
const COORDINATES_ACCURACY = 5;

class Map {
  /**
   * создает карту
   * @constructor
   * @param {number} lat - координата центра карты по оси x
   * @param {number} lng - координата центра карты по оси y
   * @param onLoad - действие, выполняемое после загрузки
   */
  constructor(lat, lng, onLoad) {
    this.htmlElement = document.querySelector('#map-canvas');
    this.canvas = L.map('map-canvas')
      .on('load', onLoad)
      .setView({
        lat: lat,
        lng: lng,
      }, 12);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(this.canvas);

    this.markersGroup = L.layerGroup();
  }

  /**
   * добавляет метку на карту
   * @param marker
   */
  addMarker(marker) {
    marker.layer.addTo(this.canvas);
  }

  /**
   * добавляет на карту группу меток с объявлениями
   * @param offers - заранее отфильтрованный массив объявлений из базы данных
   * @param {number} count - максимальное количество объявлений
   * @param {string} iconUrl - ссылка на картинку для метки
   * @param {number} iconSize - размер картинки
   */
  addOffers(offers, count, iconUrl, iconSize) {
    this.markersGroup.clearLayers();
    offers.slice(0, count)
      .forEach((offer) => {
        const marker = new Marker(
          offer.location.lat,
          offer.location.lng,
          iconUrl,
          iconSize,
        );

        marker.bindPopup(
          new Card(offer),
        );
        this.markersGroup.addLayer(marker.layer);
      });
    this.canvas.addLayer(this.markersGroup);
  }

  /**
   * показывает уведомление об ошибке
   * @param {string} message - текст сообщения
   */
  showAlert(message) {
    this.htmlElement.style.zIndex = 0;
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

    this.htmlElement.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, ALERT_SHOW_TIME);
  }
}

class Marker {
  /**
   * создает метку
   * @param {number} lat - координата центра по оси x
   * @param {number} lng - координата центра по оси y
   * @param {string} iconUrl - ссылка на картинку
   * @param {number} iconSize - размер картинки
   */
  constructor(lat, lng, iconUrl, iconSize) {
    this.lat = lat;
    this.lng = lng;

    this.icon = L.icon({
      iconUrl: iconUrl,
      iconSize: [iconSize, iconSize],
      iconAnchor: [iconSize/2, iconSize],
    });

    this.layer = L.marker(
      {
        lat: lat,
        lng: lng,
      },
      {
        icon: this.icon,
      },
    );
  }

  /**
   * добавляет возможность ввода адреса с помощью передвижения метки
   * @param input - поле для ввода координат
   */
  setInput(input) {
    this.layer.dragging.enable();
    const defaultLocationX = this.lat.toFixed(COORDINATES_ACCURACY);
    const defaultLocationY = this.lat.toFixed(COORDINATES_ACCURACY);
    input.value = `${defaultLocationX}, ${defaultLocationY}`;

    this.layer.on('moveend', (evt) => {
      const locationX = evt.target.getLatLng().lat.toFixed(COORDINATES_ACCURACY);
      const locationY = evt.target.getLatLng().lng.toFixed(COORDINATES_ACCURACY);
      input.value = `${locationX}, ${locationY}`;
    });
  }

  /**
   * привязывает карточку к метке на карте
   * @param popup - отрисованная карточка объявления
   */
  bindPopup(popup) {
    this.layer.bindPopup(
      popup.htmlElement,
      {
        keepInView: true,
      },
    );
  }
}

export {Map, Marker, COORDINATES_ACCURACY};
