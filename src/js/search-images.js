import { Notify } from 'notiflix/build/notiflix-aio';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import galleryCardsTpl from '../templates/gallery-card.hbs'



const API_KEY = '24801124-06fccb0e586a8b9d373fb9ce7';
const imagesPerPage = 40;

const search = document.querySelector('.button');

const refs = {
    search: null,
    pageNumber: null,
    totalHits: null,
    totalQuantityOfImages: 0,
    form: document.querySelector('.search-form'),
    searchValue: document.querySelector('[name="searchQuery"]'),
    galleryOfImages: document.querySelector('.gallery'),
    submitButton: document.querySelector('.search-button'),
    loadMoreButton: document.querySelector('.load-more'),
}



const onSearchSubmit = (e) => {
    e.preventDefault()
    refs.galleryOfImages.innerHTML = ''
    refs.pageNumber = 1
    refs.totalQuantityOfImages = 0
    refs.search = refs.searchValue.value
    console.log(refs.search)
    searchFunction()
}

const onLoadMoreImages = () => {
    refs.pageNumber += 1
    searchFunction();
}


refs.form.addEventListener('submit', onSearchSubmit)
refs.loadMoreButton.addEventListener('click', onLoadMoreImages)


search.addEventListener('click', searchFunction);

async function searchFunction() {
    //console.log('Приветggg');
    try {
        const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${refs.search}&image_type=photo&orientation=horizontal&safesearch=true&page=${refs.pageNumber}&per_page=${imagesPerPage}`);
        const images = await response.json()

        if (refs.totalQuantityOfImages > images.totalHits - 1) {
            console.log('Попал')
            Notify.failure("We're sorry, but you've reached the end of search results.")
            refs.loadMoreButton.classList.add('is-hidden')
            return;
        }

        if (images.hits.length === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            refs.loadMoreButton.classList.add('is-hidden')
            Loading.remove()
            return
        }

        refs.totalHits = images.totalHits
        if (refs.pageNumber === 1) {
            Notify.success(`Hooray! We found ${refs.totalHits} images.`);
            
        }


        console.log(refs.totalQuantityOfImages)
        console.log(images.totalHits)
        const markup = images.hits.map(galleryCardsTpl).join('')
        refs.galleryOfImages.insertAdjacentHTML('beforeend', markup)
        lightbox.refresh();
        refs.loadMoreButton.classList.remove('is-hidden')
        if ((refs.totalQuantityOfImages += imagesPerPage) > (images.totalHits - imagesPerPage)) {
            refs.totalQuantityOfImages += imagesPerPage - 1;
        }
        //refs.totalQuantityOfImages += imagesPerPage
        
    }
    
    catch (error) {
        console.log(error.message);
    }
}


const lightbox = new SimpleLightbox('.gallery a', {
   disableRightClick: true,
    scrollZoom: false,
    captionDelay: 250,
    captionsData: 'alt', 
});   