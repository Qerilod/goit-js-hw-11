import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector(".form");
const galleryBox = document.querySelector(".gallery-box");
const loader = document.querySelector(".loader");
const gallery = document.querySelector(".gallery");
const searchInput = document.getElementById('search-input')
form.addEventListener('submit',(e) => {
  e.preventDefault(); 

   const query = searchInput.value.trim();
if (query === '') {
    iziToast.error({
      message: 'Please enter text',
      position: 'topCenter'
    });
    return;
  }
   searchImg(query);
});
const searchOptions = {
  key: '41636185-b642aedee9ddf38a3f46d8b56',
  q: 'black',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true'
}
const lightbox = new SimpleLightbox('.gallery a', {
  nav: true,
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
  enableKeyboard: true,
  docClose: true
 });
function searchImg(query) {
  const API_KEY = '41636185-b642aedee9ddf38a3f46d8b56';
   const BASE_URL = 'https://pixabay.com/api/'
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&${searchOptions}`;

fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      if (data.hits.length > 0) {
        displayImages(data.hits);
      } else {
        iziToast.info({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topCenter'
        });
      }
    })
    .catch(error => {
      iziToast.error({
        message: 'An error occurred. Try again later.',
        position: 'topCenter'
      });
      console.error('Error fetching data:', error);
    });
}






