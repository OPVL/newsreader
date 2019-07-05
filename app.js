import { ftruncateSync } from "fs";

const apiKey = '';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');

window.addEventListener('load', e => {
    updateNews();
});

async function updateNews() {
    const res = await fetch(`${apiKey}`);
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
            <p>${article.desctiption}</p>
        </a>
    </div>`;
}