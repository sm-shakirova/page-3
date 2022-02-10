/* global _:readonly */
import 'leaflet';
import 'leaflet/dist/leaflet.css';

import {Server} from './api.js';
import {Page} from './util.js';
import {Map, Marker} from './map.js';
import {Form} from './form.js';
import {Filter} from './filter.js';
import {Popup} from './popup.js';

const OFFERS_COUNT = 10;
const RERENDER_DELAY = 500;

const TokyoCenter = {
  LAT: 35.6895,
  LNG: 139.69171,
};

const server = new Server;
const userForm = new Form('ad-form');
const filtersForm = new Form('map__filters');
const filter = new Filter(filtersForm);
const page = new Page(filtersForm, userForm);
const successPopup = new Popup('success');
const errorPopup = new Popup('error');

page.disable();

const map = new Map(
  TokyoCenter.LAT,
  TokyoCenter.LNG,
  () => userForm.enable(),
);

const mainMarker = new Marker(
  TokyoCenter.LAT,
  TokyoCenter.LNG,
  '../img/main-pin.svg',
  52,
);

map.addMarker(mainMarker);
mainMarker.setInput(
  userForm.htmlElement.querySelector('#address'),
);

userForm.setPriceConfigurations();
userForm.setGuestsNumberConfigurations();
userForm.setTimeConfigurations();
userForm.setTitleValidation();
userForm.setPriceValidation();

userForm.onSubmit(
  (evt) => server.sendData(
    _.debounce(() => {
      page.reset(map, mainMarker);
      successPopup.show();
    }, RERENDER_DELAY),
    () => errorPopup.show(),
    new FormData(evt.target),
  ),
);

userForm.onReset(_.debounce(() => {
  page.reset(map, mainMarker);
}, RERENDER_DELAY));

server.getData(
  (offers) => {
    filtersForm.enable();

    map.addOffers(
      offers,
      OFFERS_COUNT,
      '../img/pin.svg',
      40,
    );

    filter.onChange(_.debounce(() => {
      map.addOffers(
        offers.filter((offer) => filter.check(offer)),
        OFFERS_COUNT,
        '../img/pin.svg',
        40,
      )
    }, RERENDER_DELAY));
  },

  () => map.showAlert('Ошибка загрузки объявлений'),
);
