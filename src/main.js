// 46457503-330abda4e6a20c9fb19d2e08a
// https://pixabay.com/api/
import { getPhotos } from "./js/pixabay-api";
import {createGalleryItems} from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbow from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loadMore = document.querySelector('.btn')
const loader = document.querySelector('.loader');

let userQuery = '';
let page = 1;
let totalHits = 0; 
let totalLoadedImages = 0;
let lightbox = new SimpleLightbow('.js-gallery a')

loadMore.style.display = 'none';


searchFormEl.addEventListener("submit", handleSearch)

let isFirstLoad = true;

async function handleSearch(event) {
    event.preventDefault();

    userQuery = event.currentTarget.elements.user_query.value.trim();

    if (userQuery === '') {
        iziToast.error({
            message: `Please enter a valid search query.`,
            position: "topRight",
            timeout: 2000,
            color: "#FF0000",
            messageColor: "#FFFFFF",
        });
        return;
    }

    galleryEl.innerHTML = '';
    loader.style.display = 'block';
    loadMore.style.display = 'none';

    page = 1;
    totalLoadedImages = 0;

    try {
        const { hits, totalHits: fetchedTotalHits } = await getPhotos(userQuery, true);

        if (hits.length > 0) {
            totalHits = fetchedTotalHits;
            totalLoadedImages += hits.length;

            const galleryMarkup = createGalleryItems(hits);
            galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

            lightbox.refresh();

            if (totalLoadedImages < totalHits) {
                loadMore.style.display = 'block';
            } else {
                iziToast.info({
                    message: `We're sorry, but you've reached the end of search results.`,
                    position: "topRight",
                    timeout: 2000,
                    color: "lightblue",
                    messageColor: "#FFFFFF",
                });
            }
        }
       

    } catch (err) {
        console.log(err);
    } finally {
        loader.style.display = 'none';
        searchFormEl.reset();
    }
}

loadMore.addEventListener('click', handleLoad);

async function handleLoad() {
    loader.style.display = 'block';

    try {
        const { hits } = await getPhotos(userQuery, false);

        if (hits.length > 0) {
            totalLoadedImages += hits.length;

            const galleryMarkup = createGalleryItems(hits);
            galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

            lightbox.refresh();
        }
        if (!isFirstLoad) {
            smoothScroll();
        }
        isFirstLoad = false; 

        if (totalLoadedImages >= totalHits) {
            loadMore.style.display = 'none';
            iziToast.info({
                message: `We're sorry, but you've reached the end of search results.`,
                position: "topRight",
                timeout: 2000,
                color: "orange",
                messageColor: "#FFFFFF",
            });
        }
    } catch (err) {
        console.log(err);
    } finally {
        loader.style.display = 'none';
    }
}


function smoothScroll() {
    const { height: cardHeight } = galleryEl.firstElementChild.getBoundingClientRect();
    
    window.scrollBy({
        top: cardHeight * 2, 
        behavior: 'smooth', 
    });
}
