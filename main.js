const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

const themeTog = document.getElementById("theme-toggler");
const body = document.body;

async function searchWiki(query) {
  const encodedQuery = encodeURIComponent(query);
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${encodedQuery}`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error("Failed to fetch the result from Wikipidia");
  }

  const json = await response.json();
  return json;
}

function displayResult(results) {
  searchResults.innerHTML = "";
  results.forEach((result) => {
    const url = `https://en.wikipedia.org/?curid=${results.pageid}`;
    const titleLink = `<a href="${url}" target="_blank" rel="noopener">${result.title} </a>`;
    const urlLink = `<a href="${url} class="result-link" target="_blank" rel="noopener">${url}</a>`;
  });
}
