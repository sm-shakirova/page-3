const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarInput = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const housingPhotoInput = document.querySelector('.ad-form__upload input[type=file]');
const housingPhotoContainer = document.querySelector('.ad-form__photo');

function onPhotoLoad(input, preview) {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      preview.src = reader.result;
    };
  }
}

avatarInput.onchange = () => {
  onPhotoLoad(avatarInput, avatarPreview);
};

housingPhotoInput.onchange = () => {
  const housingPhotoPreview = document.createElement('img');
  housingPhotoPreview.style.width = '100%';

  onPhotoLoad(housingPhotoInput, housingPhotoPreview);

  housingPhotoContainer.appendChild(housingPhotoPreview);
}
