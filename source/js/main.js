import 'leaflet';
import 'leaflet/dist/leaflet.css';
import './form.js';
import {getData} from './api.js';
import {addOffersOnMap} from './map.js';
import {setFiltersChange} from './filter.js';
import './popup.js';
import './photo-preview.js';

const RERENDER_DELAY = 500;

getData((offers) => {
  addOffersOnMap(offers);
  setFiltersChange(_.debounce(
    () => addOffersOnMap(offers),
    RERENDER_DELAY,
  ));
});
