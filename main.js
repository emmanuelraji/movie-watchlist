const API_KEY = "ca36afe8";

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
          movieDetailsList.push(data);
          renderMovies();
        });
    })
  );
}

function renderMovies() {
  let html = "";

  for (let movie of movieDetailsList) {
    html += `
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

  cardContainer.innerHTML = html;
}

cardContainer.addEventListener("click", (event) => {
  const addToWatchlistBtn = event.target;
  const { id } = event.target.dataset;
  const selectedBtn = document.querySelector(`[data-id=${id}]`);

  if (addToWatchlistBtn.type === "button") {
    if (addToWatchlistBtn.firstElementChild.className.includes("plus")) {
      selectedBtn.style.color = "#dfdddd";
      selectedBtn.innerHTML = `
        <i class="fa-solid fa-circle-minus" aria-hidden="true"></i>
        <span>Remove</span>
      `;

      const selectedMovie = movieDetailsList.filter(
        (movie) => movie.imdbID === id
      );

      if (selectedMovie) {
        addToLocalStorage(selectedMovie);
      }
      return;
    }

    removeFromLocalStorage(id);
    selectedBtn.style.color = "#000000";
    selectedBtn.innerHTML = `
    <i class="fa-solid fa-circle-plus" aria-hidden="true"></i>
    <span>Watchlist</span>
  `;
  }
});

function addToLocalStorage(movie) {
  if (localStorage.movies) {
    let watchlist = JSON.parse(localStorage.getItem("movies"));

    watchlist.push(movie[0]);
    localStorage.setItem("movies", JSON.stringify(watchlist));

    return;
  }

  localStorage.setItem("movies", JSON.stringify(movie));
}

function removeFromLocalStorage(id) {
  let watchlist = JSON.parse(localStorage.getItem("movies"));

  const newWatchlist = watchlist.filter((movie) => movie.imdbID !== id);

  localStorage.setItem("movies", JSON.stringify(newWatchlist));
}
