const watchlistCardContainer = document.getElementById("cards-container");
const cardContainer = document.getElementById("cards-container");

let watchlist = JSON.parse(localStorage.getItem("movies"));

onload = () => {
  if (watchlist.length !== 0) {
    document.querySelector("main").style.overflow = "scroll";
    document.querySelector("main > div").style.display = "none";
    renderMovies();
  }
};

function renderMovies() {
  let html = "";

  for (let movie of watchlist) {
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
            <i class="fa-solid fa-circle-minus" aria-hidden="true"></i>
            <span>Remove</span>
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
  const { id } = event.target.dataset;
  removeFromLocalStorage(id);
});

function removeFromLocalStorage(id) {
  const newWatchlist = watchlist.filter((movie) => movie.imdbID !== id);
  localStorage.setItem("movies", JSON.stringify(newWatchlist));
  watchlist = newWatchlist;
  renderMovies();
}
