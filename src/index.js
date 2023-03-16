import fetchGallery  from "./js/fetchGallery";
import axios from 'axios';
import Notiflix from 'notiflix';


const serchForm = document.querySelector('.search-form');
const galleryItems = document.querySelector('.gallery');

serchForm.addEventListener('submit', onFormSubmit);


function onFormSubmit(e) {
    e.preventDefault();
    const serchName = serchForm['searchQuery'].value;
    fetchGallery(serchName).then(data => {
        markupGallery(data)
    })
    
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


