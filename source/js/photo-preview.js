const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

class Photo {
  constructor(inputClassName, previewClassName, createNewElement) {
    this.input = document.querySelector(`.${inputClassName} input[type=file]`);
    this.previewContainer = document.querySelector(`.${previewClassName}`);

    if (createNewElement) {
      this.preview = document.createElement('img');
      this.preview.style.width = '100%';
      this.previewContainer.appendChild(this.preview);
    } else {
      this.preview = this.previewContainer.querySelector('img');
    }

    this.input.onchange = () => this._onChange();
  }

  _onChange() {
    const file = this.input.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
    if (matches) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.preview.src = reader.result;
      };
    }
  }
}

export {Photo};
