import fetchGallery  from "./js/fetchGallery";
import axios from 'axios';
import Notiflix from 'notiflix';


const serchForm = document.querySelector('.search-form');
const galleryItems = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

serchForm.addEventListener('submit', onFormSubmit);
loadMoreButton.addEventListener('click', onLoadMoreButton);

let serchName = '';



async function onFormSubmit(e) {
    e.preventDefault();
    serchName = serchForm['searchQuery'].value;

    try {
        fetchGallery(serchName).then(data => {
            markupGallery(data)})
    } catch (error) {
          console.log(error);
    }  
}

async function onLoadMoreButton() {
    try {
        fetchGallery(serchName).then(data => {
            markupGallery(data)})
    } catch (error) {
          console.log(error);
    } 
  }

function markupGallery(data) {
  const createMarkup = data.map(({webformatURL, tags, likes, views, comments, downloads}) => {
    return `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>${likes}</b>
      </p>
      <p class="info-item">
        <b>${views}</b>
      </p>
      <p class="info-item">
        <b>${comments}</b>
      </p>
      <p class="info-item">
        <b>${downloads}</b>
      </p>
    </div>
  </div>`  
  }).join('');
  galleryItems.insertAdjacentHTML('afterbegin', createMarkup);

}


