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

    const resultIt = document.createElement("div");
    resultIt.className = "result-item";
    resultIt.innerHTML = `<h3 classs='result-title'>${titleLink}</h3> ${urlLink} <p class='result-sinppet'>${result.snippet}</p>`;

    searchResults.appendChild(resultIt);
  });
}

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    searchResults.innerHTML = "<p> Please enter a valid search teerm.</p>";
    return;
  }

  searchResults.innerHTML = '<div class="spinner">Loading...</div>';

  try {
    const results = await searchWiki(query);

    if (results.query.searchinfo.totalhits === 0) {
      searchResults.innerHTML = "<p> No results found. </p>";
    } else {
      displayResult(results.query.search);
    }
  } catch (error) {
    console.error(error);
    searchResults.innerHTML =
      "<p> An error occured while searching. Please try again later. </p>";
  }
});
