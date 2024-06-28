const API_KEY = "";

const form = document.querySelector("form");
const cardContainer = document.getElementById("cards-container");

let moviesArray = [];
let localMovies = [];

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
  console.log(jsonResponse.Search);
  getSingleMovie(jsonResponse.Search);
}

const getSingleMovie = (movies) => {
  cardContainer.innerHTML = "";
  moviesArray = [];
  for (let movie of movies) {
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`)
      .then((response) => response.json())
      .then((data) => {
        renderMovies(data);
        moviesArray.push(data);
      });
  }
};

function renderMovies(movie) {
  cardContainer.innerHTML += `
  <article class="movie-card">
  <img src="${movie.Poster} atl="${movie.Title} poster image"/>
  <div class="movie-info">
    <div>
      <h2>${movie.Title}</h2>
      <img src="./assets/star-icon.png" atl="star icon"/>
      <span>${movie.imdbRating}</span>
    </div>
    <div>
      <span>${movie.Runtime}</span>
      <span>${movie.Genre}</span>
      <button type="button" aria-label=“”  aria-pressed=“” id="watchlist-btn" value="${movie.Title}">
      <img src="./assets/icon.png" atl="save to watchlist"/>
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
  if (localMovies.length === 0) {
    localStorage.setItem("movies", JSON.stringify(movie));
    localMovies.push(movie[0]);
    return;
  }
  localMovies.push(movie[0]);
  localStorage.setItem("movies", JSON.stringify(localMovies));
  console.log(localMovies);
}

// localStorage.removeItem("movies");
