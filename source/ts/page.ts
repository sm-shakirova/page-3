import {COORDINATES_ACCURACY, OFFERS_COUNT} from './data-details';
import {Server} from './server';
import {FiltersForm} from './filters-form';
import {UserForm} from './user-form';
import {Map, Marker} from './map';

const server = new Server;

class Page {
  filtersForm: FiltersForm;
  userForm: UserForm;
  defaultLocation: HTMLInputElement | null;

  /**
   * создает экземпляр класса Page
   * @param {FiltersForm} filtersForm - форма с фильтрами
   * @param {UserForm} userForm - форма для размещения объявления
   */
  constructor(filtersForm: FiltersForm, userForm: UserForm) {
    this.filtersForm = filtersForm;
    this.userForm = userForm;
    this.defaultLocation = this.userForm.locationField as HTMLInputElement;
  }

  /**
   * возвращает все поля страницы в начальное положение без перезагрузки
   * @param {Map} map - карта
   * @param {Marker} mainMarker - главная метка на карте
   */
  reset(map: Map, mainMarker: Marker): void {
    this.filtersForm.reset();
    this.userForm.reset();

    const defaultLocationX = mainMarker.lat.toFixed(COORDINATES_ACCURACY);
    const defaultLocationY = mainMarker.lng.toFixed(COORDINATES_ACCURACY);
    if (this.defaultLocation) this.defaultLocation.value = `${defaultLocationX}, ${defaultLocationY}`;
    mainMarker.layer.setLatLng({lat: mainMarker.lat, lng: mainMarker.lng});

    server.getData(
      (offers) => {
        map.addOffers(
          offers,
          OFFERS_COUNT,
          '../img/pin.svg',
          40,
        );
      },
      () => map.showAlert('Ошибка загрузки объявлений'),
    );
  }

  /**
   * приводит страницу в неактивное состояние
   */
  disable(): void {
    this.filtersForm.disable();
    this.userForm.disable();
  }

  /**
   * переводит страницу в активное состояние
   */
  enable(): void {
    this.filtersForm.enable();
    this.userForm.enable();
  }

  /**
   * проверяет, нажата ли клавиша ESC
   * @param {string} key - клавиша
   */
  static isEscapeKeydown(key: string): boolean {
    return key === ('Escape' || 'Esc');
  }
}

export {Page};
