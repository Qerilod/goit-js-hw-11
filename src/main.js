import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getPosts } from './js/pixabay-api.js';
import { renderImg } from './js/render-functions.js';

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const searchInput = document.getElementById('search-input');
const loader = document.querySelector(".loader");

form.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  const query = searchInput.value.trim();
   if (query === '') {
    iziToast.error({
      message: 'Please enter text',
      position: 'topCenter'
    });
    return;
  }
  loader.style.display = 'block';
  gallery.innerHTML = '';

  try {
    const data = await getPosts(query);
    if (data.hits.length > 0) {
      const html = renderImg(data.hits);
      gallery.innerHTML = html;
      const lightbox = new SimpleLightbox('.gallery a', {
        nav: true,
        captionsData: 'alt',
        captionDelay: 250,
        close: true,
        enableKeyboard: true,
        docClose: true
      });
      lightbox.refresh();
    } else {
      iziToast.info({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topCenter'
      });
    }
  } catch (error) {
    console.error('Error:', error);
    iziToast.error({
      message: 'An error occurred. Try again later.',
      position: 'topCenter'
    });
  } finally {

    loader.style.display = 'none';
  }
});


