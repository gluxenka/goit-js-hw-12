import { pageLimit } from './pixabay-api.js';

const galleryContainer = document.querySelector('.gallery');

const imageDetails = [
  { label: 'Likes', field: 'likes' },
  { label: 'Views', field: 'views' },
  { label: 'Comments', field: 'comments' },
  { label: 'Downloads', field: 'downloads' },
];

export function switchVisibility(element, show) {
  if (show) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
  switchVisibility(galleryContainer, false);
}

export function scrollToPageStart(page) {
  const firstPageItem = galleryContainer.children.item(pageLimit * (page - 1));

  firstPageItem?.scrollIntoView({
    inline: 'start',
    behavior: 'smooth',
  });
}

export function addGalleryItems(pictureItems) {
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = pictureItems.map(renderPictureItem).join('');
  const elements = Array.from(tempContainer.children);

  if (elements.length > 0) {
    switchVisibility(galleryContainer, true);
    galleryContainer.append(...Array.from(tempContainer.children));
  }
}

function renderPictureItem(pictureItem) {
  const previewUrl = pictureItem.previewURL;
  const largeImageURL = pictureItem.largeImageURL;
  const alt = pictureItem.tags;
  return `
    <a class="gallery-item" href="${largeImageURL}">


    <img class="gallery-item-image" alt="${alt}" src="${previewUrl}"/>
    <div class="gallery-item-details-container">
      ${imageDetails.map(imgDetail => renderDetailsElement(imgDetail.label, pictureItem[imgDetail.field])).join('')}
    </div>

    </a>`;
}

function renderDetailsElement(label, value) {
  return `
    <div class="gallery-item-details-element">
      <span class="label">${label}</span>
      <span class="value">${value}</span>
    </div>`;
}
