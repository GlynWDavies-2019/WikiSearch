const input = document.querySelector('.main-search');
const searchButton = document.querySelector('.main-btn');

searchButton.addEventListener('click', searchWiki);

function searchWiki(event) {
    event.preventDefault();
    showGIF('show');
}

function showGIF(value) {
    if(value === 'show') {
        document.querySelector('.wait-icon').classList.add('show');
    } else if(value === 'hide') {
        document.querySelector('.wait-icon').classList.remove('show');
    }
}