const watchlistCardContainer = document.getElementById("cards-container");
const cardContainer = document.getElementById("cards-container");

let watchlist = JSON.parse(localStorage.getItem("movies"));

onload = () => {
  if (watchlist.length !== 0) {
    console.log(watchlist);
    console.log("entered");
    document.querySelector("main").style.overflow = "scroll";
    document.querySelector("main > div").style.display = "none";
    getMovies(watchlist);
  }
};

function getMovies(movies) {
  for (let movie of movies) {
    renderMovies(movie);
  }
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
          <i class="fa-solid fa-circle-minus" aria-hidden="true"></i>
          <span>Remove</span>
        </button>
      </div>
      <p>${movie.Plot}</p>
    </div>
  </article>
  `;
}

function removeFromLocalStorage() {}
