const input = document.querySelector('.main-search');
const searchButton = document.querySelector('.main-btn');

searchButton.addEventListener('click', searchWiki);

function searchWiki(event) {
    event.preventDefault();
    showGIF('show');
    let searchValue = input.value;
    const origin = 'https://en.wikipedia.org';
    const url = `${origin}/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${searchValue}`;
    fetch(url)
        .then(data => data.json())
        .then(data => displayData(data))
        .catch(error => console.log(error));
}

function displayData(data) {
    let result = data.query.search;
    let output = '';
    result.forEach(item => output += `
        <li class="search-item">
            <h2 class="search-item-title">${item.title}</h2>
            <p class="search-item-text">${item.snippet}</p>
            <a href="http://en.wikipedia.org/?curid=${item.pageid}" class="search-item-link" target="_blank">Read more...</a>
        </li>
    `);
    document.querySelector('.results').innerHTML = output;
    showGIF('hide');
}

function showGIF(value) {
    if(value === 'show') {
        document.querySelector('.wait-icon').classList.add('show');
    } else if(value === 'hide') {
        document.querySelector('.wait-icon').classList.remove('show');
    }
}

// Notes --------------------------------------------------------------------------------

// This is what you get back from the API call to Wikipedia

// {batchcomplete: "", continue: {…}, query: {…}}
//     batchcomplete: ""
//     continue: {sroffset: 10, continue: "-||"}
//     query:
//         search: Array(10)
//             0: {ns: 0, title: "Orange", pageid: 22421, size: 7521, wordcount: 864, …}

// {batchcomplete...} is "data"
// Then everything on the next hierarchical level down goes behind a dot
// So, data.query.search
// Because search is an array the first element will be data.query.search[0]
// The search array hold objects
// So, you would have things like search[0].title, search[8].snippet

// --------------------------------------------------------------------------------------