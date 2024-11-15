import axios from 'axios';

const searchKey = '47095841-45755c038ed861ac306bdd605';
const defaultImageType = 'photo';
const defaultOrientation = 'horizontal';
const enableSafeSearch = true;
export const pageLimit = 15;

const baseApiUrl = `https://pixabay.com/api/`;

export async function getPictures(query, pageNumber) {
  const search = getSearchParams(query, pageNumber).toString();
  const url = `${baseApiUrl}?${search}`;
  const response = await axios.get(url);
  return response.data?.hits ?? [];
}

function getSearchParams(query, pageNumber) {
  return new URLSearchParams({
    q: query,
    key: searchKey,
    page: pageNumber,
    image_type: defaultImageType,
    orientation: defaultOrientation,
    per_page: pageLimit,
    safesearch: enableSafeSearch,
  });
}
