export interface OfferDataType {
  author: {
    avatar: string | null,
  },
  offer: {
    title: string | null,
    address: string | null,
    price: number | string | null,
    type: string | null,
    description: string | null,
    rooms: number | string | null,
    guests: number | string | null,
    checkin: number | string | null,
    checkout: number | string | null,
    features: string[] | null,
    photos: string[] | null,
  }
  location: {
    lat: number,
    lng: number,
  }
}

export const OFFERS_COUNT = 10;
export const RERENDER_DELAY = 500;
export const VALIDATION_DELAY = 700;
export const ALERT_SHOW_TIME = 5000;
export const COORDINATES_ACCURACY = 5;
export const PHOTO_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

export enum Link {
  ToGetData = 'https://23.javascript.pages.academy/keksobooking/data',
  ToSendData = 'https://23.javascript.pages.academy/keksobooking',
}

export enum TokyoCenter {
  Lat = 35.6895,
  Lng = 139.69171,
}

export enum TitleLength {
  Min = 30,
  Max = 100,
}

export enum TypeTranslation {
  Bungalow = 'Бунгало',
  Flat = 'Квартира',
  House = 'Дом',
  Palace = 'Дворец',
  Hotel = 'Отель',
}

export enum MinPrice {
  Bungalow = 0,
  Flat = 1000,
  House = 5000,
  Palace = 10000,
}

export const PriceRange = {
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

export function getTypeTranslation(type: string): string {
  switch (type) {
    case 'bungalow': return TypeTranslation.Bungalow;
    case 'flat': return TypeTranslation.Flat;
    case 'house': return TypeTranslation.House;
    case 'palace': return TypeTranslation.Palace;
    case 'hotel': return TypeTranslation.Hotel;
    default: return type;
  }
}

export function getMinPrice(type: string): number {
  switch (type) {
    case 'bungalow': return MinPrice.Bungalow;
    case 'flat': return MinPrice.Flat;
    case 'house': return MinPrice.House;
    case 'palace': return MinPrice.Palace;
    default: return 0;
  }
}

export function getGuestsNumber(roomsNumber: number): number[] {
  switch (roomsNumber) {
    case 1: return [1];
    case 2: return [1, 2];
    case 3: return [1, 2, 3];
    case 100: return [0];
    default: return [0, 1, 2, 3];
  }
}
