import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/'
const KEY_API = '34474183-c32a902a8a30cad0815e71cb5';

export default class SearchApiPixabay {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchGallery() {
    try {
      return await axios.get(BASE_URL, {
        params: {
          key: KEY_API,
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          page: this.page,
          per_page: 40,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}


