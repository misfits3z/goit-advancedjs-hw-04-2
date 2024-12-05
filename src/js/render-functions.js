import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css'; 


const createGalleryItems = (cards) => {
    return cards.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => 
      `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
          />
        </a>
        <div class="gallery-info">
          <p><b>Likes:</b> ${likes}</p>
          <p><b>Views:</b> ${views}</p>
          <p><b>Comments:</b> ${comments}</p>
          <p><b>Downloads:</b> ${downloads}</p>
        </div>
      </li>`
    ).join('');
  };
  
  
  
  const initLightbox = () => {
    const lightbox = new SimpleLightbox('.gallery .gallery-item a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
      animationSpeed: 300,
    });
    
    lightbox.refresh();
  };
  

export default createGalleryItems;
export { createGalleryItems, initLightbox };