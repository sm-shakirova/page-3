import './form.js';
import {addOffersOnMap} from './map.js';
import {getData} from './api.js';
import './popup.js';

const OFFERS_COUNT = 10;

getData((offers) => {
  addOffersOnMap(offers.slice(0, OFFERS_COUNT));
});
