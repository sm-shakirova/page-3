const PriceRange = {
  LOW: {
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50000,
  },
};

const filtersForm = document.querySelector('.map__filters');
const typeSelect = filtersForm.querySelector('#housing-type');
const priceSelect = filtersForm.querySelector('#housing-price');
const roomsNumberSelect = filtersForm.querySelector('#housing-rooms');
const guestsNumberSelect = filtersForm.querySelector('#housing-guests');
const featuresList = filtersForm.querySelectorAll('[name="features"]');

function setFiltersChange(cb) {
  typeSelect.onchange = () => cb();
  priceSelect.onchange = () => cb();
  roomsNumberSelect.onchange = () => cb();
  guestsNumberSelect.onchange = () => cb();
  for (let feature of featuresList) {
    feature.onclick = () => cb();
  }
}

function checkOfferOnFilters(offer) {
  const type = typeSelect.value;
  const price = priceSelect.value;
  const rooms = roomsNumberSelect.value;
  const guests = guestsNumberSelect.value;

  if (type !== 'any' && type !== offer.offer.type) return false;
  if (price === 'low' && offer.offer.price > PriceRange.LOW.MAX) return false;
  if (price === 'middle' &&
    (offer.offer.price < PriceRange.MIDDLE.MIN || offer.offer.price > PriceRange.MIDDLE.MAX)) return false;
  if (price === 'high' && offer.offer.price < PriceRange.LOW.MIN) return false;
  if (rooms !== 'any' && Number(rooms) !== offer.offer.rooms) return false;
  if (guests !== 'any' && Number(guests) !== offer.offer.guests) return false;

  for (let feature of featuresList) {
    if (feature.checked && !offer.offer.features) return false;
    if (feature.checked && !offer.offer.features.includes(feature.value)) return false;
  }

  return true;
}

export {checkOfferOnFilters, setFiltersChange};
