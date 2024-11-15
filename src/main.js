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
const loadMoreButton = document.getElementById('load-more');
const loader = document.querySelector('.loader');

const galleryViewer = new SimpleLightbox('.gallery-item', {
  captionsData: 'alt',
  captionDelay: 250,
  fadeSpeed: 1000,
});

const DEFAULT_PAGE = 1;
let currentPage = DEFAULT_PAGE;
let currentQuery = '';

async function triggerSearch(query, page, shouldClear) {
  switchVisibility(loader, true);

  if (shouldClear) {
    clearGallery();
  }

  try {
    const pictures = await getPictures(query, page);
    switchVisibility(loader, false);
    addGalleryItems(pictures);
    currentPage = page;
    currentQuery = query;
    galleryViewer.refresh();

    if (pictures.length === 0) {
      if (currentPage === 1) {
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
      } else {
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
      switchVisibility(loadMoreButton, false);
    } else {
      scrollToPageStart(currentPage);
      switchVisibility(loadMoreButton, true);
    }
  } catch (e) {
    switchVisibility(loader, false);
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
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const formData = new FormData(searchForm);
  const formValues = Object.fromEntries(formData);
  switchVisibility(loadMoreButton, false);
  triggerSearch(formValues.query, DEFAULT_PAGE, true);
}

function loadMore() {
  switchVisibility(loadMoreButton, false);
  triggerSearch(currentQuery, currentPage + 1, false);
}

function init() {
  searchForm.addEventListener('submit', handleSearchSubmit);
  loadMoreButton.addEventListener('click', loadMore);
}

init();
