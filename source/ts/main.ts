/* global _:readonly */
import 'leaflet';
import 'leaflet/dist/leaflet.css';

import {OFFERS_COUNT, RERENDER_DELAY, OfferDataType, TokyoCenter} from './data-details';
import {Server} from './server';
import {Page} from './page';
import {Map, Marker} from './map';
import {UserForm} from './user-form';
import {FiltersForm} from './filters-form';
import {Popup} from './popup';

const server = new Server;
const userForm = new UserForm('ad-form');
const filtersForm = new FiltersForm('map__filters');
const page = new Page(filtersForm, userForm);
const successPopup = new Popup('success');
const errorPopup = new Popup('error');

page.disable();

const map = new Map(
  TokyoCenter.Lat,
  TokyoCenter.Lng,
  () => userForm.enable(),
);

const mainMarker = new Marker(
  TokyoCenter.Lat,
  TokyoCenter.Lng,
  '../img/main-pin.svg',
  52,
);

map.addMarker(mainMarker);
if (userForm.locationField) mainMarker.setInput(userForm.locationField);

userForm.setPriceConfigurations();
userForm.setGuestsNumberConfigurations();
userForm.setTimeConfigurations();
userForm.setTitleValidation();
userForm.setPriceValidation();

userForm.onSubmit(
  (evt) => server.sendData(
    // @ts-ignore
    _.debounce(() => {
      page.reset(map, mainMarker);
      successPopup.show();
    }, RERENDER_DELAY),
    () => errorPopup.show(),
    new FormData(evt.target),
  ),
);

// @ts-ignore
userForm.onReset(_.debounce(() => {
  page.reset(map, mainMarker);
}, RERENDER_DELAY));

server.getData(
  (offers: OfferDataType[]) => {
    filtersForm.enable();

    map.addOffers(
      offers,
      OFFERS_COUNT,
      '../img/pin.svg',
      40,
    );

    // @ts-ignore
    filtersForm.onChange(_.debounce(() => {
      map.addOffers(
        offers.filter((offer) => filtersForm.check(offer)),
        OFFERS_COUNT,
        '../img/pin.svg',
        40,
      )
    }, RERENDER_DELAY));
  },

  () => map.showAlert('Ошибка загрузки объявлений'),
);
