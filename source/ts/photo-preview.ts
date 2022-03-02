import {PHOTO_TYPES} from './data-details';

class Photo {
  input: HTMLInputElement | null;
  previewContainer: HTMLElement | null;
  readonly preview: HTMLImageElement;

  /**
   * создает экземпляр класса Photo
   * @param {string} inputClassName - класс поля для загрузки изображения
   * @param {string} previewClassName - класс поля для превью изображения
   * @param {boolean} createNewElement
   */
  constructor(inputClassName: string, previewClassName: string, createNewElement: boolean) {
    this.input = document.querySelector(`.${inputClassName} input[type=file]`) as HTMLInputElement;
    this.previewContainer = document.querySelector(`.${previewClassName}`) as HTMLElement;

    if (createNewElement) {
      this.preview = document.createElement('img');
      this.preview.style.width = '100%';
      this.previewContainer.appendChild(this.preview);
    } else {
      this.preview = this.previewContainer.querySelector('img') as HTMLImageElement;
    }

    this.input.onchange = () => this.onChange();
  }

  /**
   * устанавливает действие при загрузке
   * @private
   */
  private onChange(): void {
    if (this.input && this.input.files) {
      const file = this.input.files[0];
      const fileName = file.name.toLowerCase();
      if (PHOTO_TYPES.some((type) => fileName.endsWith(type))) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader.result) this.preview.src = reader.result.toString();
        };
      }
    }
  }
}

export {Photo};
