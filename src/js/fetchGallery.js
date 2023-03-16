export default fetchGallery;
import Notiflix from 'notiflix';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/'
const KEY_API = '34474183-c32a902a8a30cad0815e71cb5';
let page = 1;

async function fetchGallery(name) {
try { 
    const response = await axios.get(`${BASE_URL}?key=${KEY_API}&q=${name}`,  {
    params: {
      per_page: 4,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    }
  })
    return response.data.hits;
} catch (error) {
    console.log(error);
}

}