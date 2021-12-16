
import galleryCardsTpl from '../templates/gallery-card.hbs'



const API_KEY = '24801124-06fccb0e586a8b9d373fb9ce7';
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
    getImages();
}


refs.form.addEventListener('submit', onSearchSubmit)
//refs.loadMoreButton.addEventListener('click', onLoadMoreImages)


search.addEventListener('click', searchFunction);

async function searchFunction() {
    //console.log('Приветggg');
    try {
        const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${refs.search}&image_type=photo&orientation=horizontal&safesearch=true&page=${refs.pageNumber}&per_page=40`);
        const images = await response.json()

        const markup = images.hits.map(galleryCardsTpl).join('')
        refs.galleryOfImages.insertAdjacentHTML('beforeend', markup)
        lightbox.refresh();
        refs.loadMoreButton.classList.remove('is-hidden')
        refs.totalQuantityOfImages += imagesPerPage
    }

    

    catch (error) {
        console.log(error.message);
    }
}