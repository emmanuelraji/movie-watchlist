const API_KEY = "";

const form = document.querySelector("form");
const cardContainer = document.getElementById("cards-container");

let movieDetailsList = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const searchQuery = formData.get("search-query");
  const moviesContainer = document.getElementById("no-movies");

  // remove current elements in the main section
  if (moviesContainer.checkVisibility()) {
    document.querySelector("main").style.overflow = "scroll";
    moviesContainer.style.display = "none";
  }

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
        .then((data) => {
          renderMovies(data, cardContainer);
          movieDetailsList.push(data);
        });
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
      <button type="button" aria-label=“”  aria-pressed=“” id="watchlist-btn" data-id="${movie.imdbID}">
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
  const { id } = event.target.dataset;

  const selectedMovie = movieDetailsList.filter((movie) => {
    return movie.imdbID === id;
  });

  if (selectedMovie) {
    addToLocalStorage(selectedMovie);
  }
});

function addToLocalStorage(movie) {
  let watchlist = JSON.parse(localStorage.getItem("movies"));

  if (watchlist === null) {
    localStorage.setItem("movies", JSON.stringify(movie));
    return;
  }

  watchlist.push(movie);
  localStorage.setItem("movies", JSON.stringify(watchlist));
}
