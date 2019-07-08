const apiKey = 'f8df029c38894949b77be86616a3bc58';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'the-verge';

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e =>{
        updateNews(e.target.value);
    });

    if ('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('service worker registered');
        } catch (error) {
            console.error('service worker registration failed: ' + error);            
        }
    }
    console.log('init finished');
    
});

async function updateSources() {
    const res = await fetch(`https://newsapi.org/v2/sources?language=en&apiKey=${apiKey}`);
    const json = await res.json();

    sourceSelector.innerHTML = json.sources
        .map(src => `<option value="${src.id}">${src.name}</option>`)
        .join('\n');
}

async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`);
    const json = await res.json();

    main.innerHTML = json.articles
        .map(createArticle)
        .join('\n');
}

function createArticle(article) {
    return `
    <div class="article">
        <a href="${article.url}">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}" alt="${article.title}">
            <p>${article.description}</p>
        </a>
    </div>`;
}