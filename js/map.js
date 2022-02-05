/* global L:readonly */
import {disableForm, enableForm} from './form.js';
import {renderCard} from './render-card.js';

const TokyoCenter = {
  LAT: 35.6895,
  LNG: 139.69171,
  COORDINATES_ACCURACY: 5,
}

// неактивное состояние страницы
const userForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
disableForm(userForm, 'ad-form');
disableForm(mapFiltersForm, 'map__filters');

document.querySelector('#map-canvas').style.zIndex = 0;

const map = L.map('map-canvas')
  .on('load', () => {
    // активное состояние страницы
    enableForm(userForm, 'ad-form');
    enableForm(mapFiltersForm, 'map__filters');
  })
  .setView({
    lat: TokyoCenter.LAT,
    lng: TokyoCenter.LNG,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// главный маркер
const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: TokyoCenter.LAT,
    lng: TokyoCenter.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
    zIndexOffset: 1000,
  },
);

mainMarker.addTo(map);

// ввод адреса с помощью перемещения главного маркера
const locationField = userForm.querySelector('#address');
const defaultLocationX = TokyoCenter.LAT.toFixed(TokyoCenter.COORDINATES_ACCURACY);
const defaultLocationY = TokyoCenter.LNG.toFixed(TokyoCenter.COORDINATES_ACCURACY);
locationField.value = `${defaultLocationX}, ${defaultLocationY}`;

mainMarker.on('moveend', (evt) => {
  const locationX = evt.target.getLatLng().lat.toFixed(TokyoCenter.COORDINATES_ACCURACY);
  const locationY = evt.target.getLatLng().lng.toFixed(TokyoCenter.COORDINATES_ACCURACY);
  locationField.value = `${locationX}, ${locationY}`;
});

// похожие объявления
function addOffersOnMap(offers) {
  offers.forEach((offer) => {
    const icon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng,
      },
      {
        icon: icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(
        renderCard(offer),
        {
          keepInView: true,
        },
      );
  });
}

export {addOffersOnMap, mainMarker, TokyoCenter};
