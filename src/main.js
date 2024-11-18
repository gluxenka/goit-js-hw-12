import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { getPictures } from './js/pixabay-api.js';
import {
  addGalleryItems,
  clearGallery,
  scrollToPageStart,
  switchVisibility,
} from './js/render-functions.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loadMoreButton = document.getElementById('load-more');
const loader = document.querySelector('.loader');

const galleryViewer = new SimpleLightbox('.gallery-item', {
  captionsData: 'alt',
  captionDelay: 250,
  fadeSpeed: 1000,
});

const DEFAULT_PAGE = 1;
const DEFAULT_LOADED_PICTURES_COUNT = 0;
let currentLoadedPicturesCount = DEFAULT_LOADED_PICTURES_COUNT;
let currentPage = DEFAULT_PAGE;
let currentQuery = '';

async function triggerSearch(query, page, shouldClear) {
  switchVisibility(loader, true);

  if (shouldClear) {
    clearGallery();
  }

  try {
    const result = await getPictures(query, page);
    const { hits: pictures, totalHits } = result;
    switchVisibility(loader, false);
    addGalleryItems(pictures);
    currentPage = page;
    currentQuery = query;
    if (currentPage === 1) {
      currentLoadedPicturesCount = DEFAULT_LOADED_PICTURES_COUNT;
    }
    currentLoadedPicturesCount += pictures.length;

    galleryViewer.refresh();
    const isEndOfList = currentLoadedPicturesCount >= totalHits;
    const isEmptyList = pictures.length === 0;

    if (!isEmptyList && isEndOfList) {
      showEndOfListToast();
      switchVisibility(loadMoreButton, false);
    }

    if (isEmptyList) {
      showNotFoundToast();
    }

    if (!isEmptyList && !isEndOfList) {
      switchVisibility(loadMoreButton, true);
    }

    if (!isEmptyList) {
      scrollToPageStart(currentPage);
    }
  } catch (e) {
    switchVisibility(loader, false);
    showRequestFailedToast();
  }
}

function showNotFoundToast() {
  iziToast.error({
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
    iconColor: '#FFF',
    titleColor: '#FFF',
    messageColor: '#FFF',
    backgroundColor: '#EF4040',
    progressBarColor: '#B51B1B',
  });
}

function showEndOfListToast() {
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
    iconColor: '#FFF',
    titleColor: '#FFF',
    messageColor: '#FFF',
    backgroundColor: '#0099FF',
    progressBarColor: '#0071BD',
  });
}

function showRequestFailedToast() {
  iziToast.error({
    message: `Request failed, please try again later`,
    position: 'topRight',
    iconColor: '#FFF',
    titleColor: '#FFF',
    messageColor: '#FFF',
    backgroundColor: '#EF4040',
    progressBarColor: '#B51B1B',
  });
}

function syncInput(value) {
  searchInput.value = value;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const formData = new FormData(searchForm);
  const formValues = Object.fromEntries(formData);
  let query = formValues.query?.trim?.() ?? '';

  syncInput(query);

  if (!query) {
    return;
  }

  switchVisibility(loadMoreButton, false);
  triggerSearch(query, DEFAULT_PAGE, true);
}

function loadMore() {
  syncInput(currentQuery);
  switchVisibility(loadMoreButton, false);
  triggerSearch(currentQuery, currentPage + 1, false);
}

function init() {
  searchForm.addEventListener('submit', handleSearchSubmit);
  loadMoreButton.addEventListener('click', loadMore);
}

init();
