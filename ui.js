export const searchForm = document.querySelector("form");
export const searchResultsElement = document.querySelector(".search-results");
export const searchInput = document.querySelector("#search-query");
export const searchButton = document.querySelector(".btn-search");

// -- RENDER & UI HELPERS --
function getMovieCardsHTML(movies) {
  let html = "";
  movies.forEach((movie) => {
    html += `
    <article class="movie-card">
        <figure class="movie-card__content">
            <img src="${movie.Poster}" alt="Poster for ${movie.Title}"/>
        </figure>
        <header class="movie-card__details">
            <h2>${movie.Title}</h2>
            <span>${movie.imdbRating}</span>
            <span>${movie.Runtime}</span>
            <span>${movie.Genre}</span>
            <button aria-label="Add ${movie.Title} to list" class="btn-add-movie" data-movie-id="${movie.imdbID}">Add</button>
            <p>${movie.Plot}</p>
        </header>
    </article>
    `;
  });
  return html;
}

export function renderSearchResults(searchResults) {
  if (!searchResults.length) {
    searchResultsElement.innerHTML = "<p>No results found.</p>";
    return;
  }
  searchResultsElement.innerHTML = getMovieCardsHTML(searchResults);
}

export function setSearchLoadingState(isSearching) {
  searchButton.disabled = isSearching;
  searchButton.textContent = isSearching ? "Searching..." : "Search";
}

/*
Icon + text that form a single concept
<span class="">
    <i class="fa-regular fa-comment-dots"></i>
    (place text here: under <i></i> tag)
</span>
*/
