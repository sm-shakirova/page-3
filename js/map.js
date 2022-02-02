import {disableForm, activateForm, form} from './form.js';
import {createOffers, Location} from './generate-data.js';
import {renderCard} from './render-card.js';

const TokyoCenter = {
  X: 35.6895,
  Y: 139.69171,
}

// неактивное состояние страницы
const mapFiltersForm = document.querySelector('.map__filters');
disableForm(form, 'ad-form');
disableForm(mapFiltersForm, 'map__filters');

/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    // активное состояние страницы
    activateForm(form, 'ad-form');
    activateForm(mapFiltersForm, 'map__filters');
  })
  .setView({
    lat: TokyoCenter.X,
    lng: TokyoCenter.Y,
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
    lat: TokyoCenter.X,
    lng: TokyoCenter.Y,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

// ввод адреса с помощью перемещения главного маркера
const locationField = form.querySelector('#address');
const defaultLocationX = TokyoCenter.X.toFixed(Location.ACCURACY);
const defaultLocationY = TokyoCenter.Y.toFixed(Location.ACCURACY);
locationField.value = `${defaultLocationX}, ${defaultLocationY}`;

mainMarker.on('moveend', (evt) => {
  const locationX = evt.target.getLatLng().lat.toFixed(Location.ACCURACY);
  const locationY = evt.target.getLatLng().lng.toFixed(Location.ACCURACY);
  locationField.value = `${locationX}, ${locationY}`;
});

// похожие объявления
const offers = createOffers();
offers.forEach((offer) => {
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const locationX = offer.location.x;
  const locationY = offer.location.y;

  const marker = L.marker(
    {
      lat: locationX,
      lng: locationY,
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
