import SearchApiPixabay  from "./js/fetchGallery";
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const searchForm = document.querySelector('.search-form');
const galleryItems = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

const apiService = new SearchApiPixabay();

searchForm.addEventListener('submit', onFormSubmit);
loadMoreButton.addEventListener('click', onLoadMoreButton);

let simpleLightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

buttonHidden();

async function onFormSubmit(e) {
    e.preventDefault();
    const searchName = e.target.elements.searchQuery.value.trim();
    if (!searchName) {
      return Notiflix.Notify.failure(
        'Request is not possible without entering data'
      );
    }

    apiService.query = searchName;

    apiService.resetPage();

    try {
      const response = await apiService.fetchGallery();
      const totalHits = response.data.totalHits;
      const hits = response.data.hits;

      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        e.target.reset();
        clearContainer();
        return;
      }
      else {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      clearContainer();

      galleryItems.innerHTML = markupGallery(hits);
      buttonShow();
      simpleLightbox.refresh();
      if (Math.ceil(totalHits / 40) === apiService.page) {
        console.log(totalHits);
        setTimeout(() => {
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }, 2000);
        return;
      } 
      }
      } catch (error) {
        console.error(error);
      }
    }

async function onLoadMoreButton() {
  apiService.page += 1;

  try {
    const response = await apiService.fetchGallery();
    const hits = response.data.hits;
    const totalHits = response.data.totalHits;

    galleryItems.insertAdjacentHTML('beforeend', markupGallery(hits));
    simpleLightbox.refresh();
    slowScroll();
    if (Math.ceil(totalHits / 40) === apiService.page) {
      setTimeout(() => {
        buttonHidden();
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }, 2000);
    }
    
  } catch (error) {
    console.error(error);
  }
}


function markupGallery(data) {
  const createMarkup = data.map(
    ({
      largeImageURL,
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `<div class="photo-card">
              <a href="${largeImageURL}"><img class="photo" src="${webformatURL}" alt="${tags}" title="${tags}" loading="lazy"/></a>
              <div class="info">
                  <p class="info-item">
                      <b>Likes</b> <span class="info-item-api"> ${likes} </span>
                  </p>
                  <p class="info-item">
                      <b>Views</b> <span class="info-item-api">${views}</span>  
                  </p>
                  <p class="info-item">
                      <b>Comments</b> <span class="info-item-api">${comments}</span>  
                  </p>
                  <p class="info-item">
                      <b>Downloads</b> <span class="info-item-api">${downloads}</span> 
                  </p>
              </div>
              </div>`;
    }
  )
  .join('');
return createMarkup;
}

function clearContainer() {
  galleryItems.innerHTML = '';
}

function buttonHidden() {
  loadMoreButton.classList.add('visually-hidden');
}

function buttonShow() {
  setTimeout(() => {
    loadMoreButton.classList.remove('visually-hidden');
  }, 3000);
}

function slowScroll() {
  const { height: cardHeight } = document
    .querySelector('.photo-card')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
