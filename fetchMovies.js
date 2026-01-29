const OMDB_API_KEY = "";

// -- APPLICATION ACTIONS (ORCHESTRATOR) --
export async function fetchMoviesBySearch(query) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`,
    );

    if (!response.ok) {
      throw new Error("Request Failed!");
    }

    const jsonResponse = await response.json();
    const movies = jsonResponse.Search || [];

    return movies;
  } catch (error) {
    console.log(error);
  }
}

export function fetchMoviesWithDetails(movies) {
  return Promise.all(
    movies.map(async (movie) => {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movie.imdbID}`,
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch ${movie.imdbID}: ${res.status}`);
      }
      return response.json();
    }),
  );
}
