const API_KEY = "";

const form = document.querySelector("form");
const cardContainer = document.getElementById("cards-container");

let watchlist = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const searchQuery = formData.get("search-query");

  getMovies(searchQuery);
});

async function getMovies(query) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
  );
  const jsonResponse = await response.json();
  getMovieDetails(jsonResponse.Search);
}

async function getMovieDetails(movies) {
  cardContainer.innerHTML = "";

  await Promise.all(
    movies.map((movie) => {
      fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`)
        .then((response) => response.json())
        .then((data) => renderMovies(data));
    })
  );
}

function renderMovies(movie) {
  cardContainer.innerHTML += `
  <article class="movie-card">
  <img src="${movie.Poster} atl="${movie.Title} poster image"/>
  <div class="movie-info">
    <div>
      <h2>${movie.Title}</h2>
      <i class="fa-solid fa-star" aria-hidden="true"></i>
      <span>${movie.imdbRating}</span>
    </div>
    <div>
      <span>${movie.Runtime}</span>
      <span>${movie.Genre}</span>
      <button type="button" aria-label=“”  aria-pressed=“” id="watchlist-btn" value="${movie.Title}">
        <i class="fa-solid fa-circle-plus" aria-hidden="true"></i>
        <span>Watchlist</span>
      </button>
    </div>
    <p>${movie.Plot}</p>
  </div>
  </article>
  `;
}

cardContainer.addEventListener("click", (event) => {
  const { value } = event.target;
  const selectedMovie = moviesArray.filter((movie) => movie.Title === value);
  if (event.target.id === "watchlist-btn") {
    addToLocalStorage(selectedMovie);
  }
});

function addToLocalStorage(movie) {
  console.log("clicked");
  if (watchlist.length === 0) {
    localStorage.setItem("movies", JSON.stringify(movie));
    watchlist.push(movie[0]);
    return;
  }
  watchlist.push(movie[0]);
  localStorage.setItem("movies", JSON.stringify(watchlist));
  console.log(watchlist);
}

// localStorage.removeItem("movies");
