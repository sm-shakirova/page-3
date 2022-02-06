/* global _:readonly */
import './form.js';
import {getData} from './api.js';
import {addOffersOnMap} from './map.js';
import {setFiltersChange} from './filter.js';
import './popup.js';

const RERENDER_DELAY = 500;

getData((offers) => {
  addOffersOnMap(offers);
  setFiltersChange(_.debounce(
    () => addOffersOnMap(offers),
    RERENDER_DELAY,
  ));
});
