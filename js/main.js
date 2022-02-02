import {createOffers} from './data.js';
import {renderCard} from './card.js';
import './form.js';

const offers = createOffers();
renderCard(offers[8]);
