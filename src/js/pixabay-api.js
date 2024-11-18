import axios from 'axios';

const searchKey = '47095841-45755c038ed861ac306bdd605';
const defaultImageType = 'photo';
const defaultOrientation = 'horizontal';
const enableSafeSearch = true;
export const defaultPerPage = 15;
const API_PICTURES_LIMIT = 500;

const baseApiUrl = `https://pixabay.com/api/`;

export async function getPictures(query, pageNumber) {
  const isMoreThenLimit = API_PICTURES_LIMIT < pageNumber * defaultPerPage;

  let perPage = defaultPerPage;

  if (isMoreThenLimit) {
    const fullPageCount = Math.floor(API_PICTURES_LIMIT / defaultPerPage);

    const outOfFullPageElementsCount =
      API_PICTURES_LIMIT - fullPageCount * defaultPerPage;
    if (outOfFullPageElementsCount > 0 && pageNumber === fullPageCount + 1) {
      // request last possible page
      perPage = outOfFullPageElementsCount;
      pageNumber = API_PICTURES_LIMIT / perPage;
    }
  }

  const search = getSearchParams(query, pageNumber, perPage).toString();
  const url = `${baseApiUrl}?${search}`;
  const response = await axios.get(url);
  return response.data;
}

function getSearchParams(query, pageNumber, perPage) {
  return new URLSearchParams({
    q: query,
    key: searchKey,
    page: pageNumber,
    image_type: defaultImageType,
    orientation: defaultOrientation,
    per_page: perPage,
    safesearch: enableSafeSearch,
  });
}
