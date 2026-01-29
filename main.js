import { fetchMoviesBySearch, fetchMoviesWithDetails } from "./fetchMovies.js";
import {
  searchForm,
  searchInput,
  searchButton,
  renderSearchResults,
  searchResultsElement,
  setSearchLoadingState,
} from "./ui.js";

// -- GLOBAL --
const WATCHLIST_KEY = "movies";

let searchResults = [];

searchForm.addEventListener("submit", handleSearchSubmit);
searchResultsElement.addEventListener("click", handleAddToWatchlist);
searchInput.addEventListener("input", handleSearchInput);

// -- EVENT HANDLERS --
async function handleSearchSubmit(event) {
  event.preventDefault();

  const query = searchInput.value;
  // protect against UI errors
  if (!query) return;

  searchResults = await searchMovies(query);
  renderSearchResults(searchResults);
}

function handleSearchInput() {
  const hasValue = searchInput.value.trim() !== "";
  searchButton.disabled = !hasValue;
}

function handleAddToWatchlist(event) {
  const movieId = event.target.dataset.movieId;
  // only handle clicks on elements with a movieId
  if (!movieId) return;
  addToWatchlist(movieId);
}

// -- APPLICATION ACTIONS (ORCHESTRATOR) --
async function searchMovies(query) {
  // disable the button to prevent double clicks
  setSearchLoadingState(true);

  try {
    const movies = await fetchMoviesBySearch(query);
    const moviesWithPlot = await fetchMoviesWithDetails(movies);
    return moviesWithPlot;
  } finally {
    // re-enable the button after fetching is done
    setSearchLoadingState(false);
  }
}

function findMovieByImdbId(imdbID) {
  return searchResults.find((movie) => movie.imdbID === imdbID);
}

function addToWatchlist(imdbID) {
  const watchlistMovies = JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || [];
  const movieSaved = findMovieByImdbId(imdbID);

  // check weather the movie already exists in watchlist
  const alreadyAdded = watchlistMovies.some((movie) => movie.imdbID === imdbID);
  if (alreadyAdded) return;

  // add movie to local storage
  watchlistMovies.push(movieSaved);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlistMovies));
}
