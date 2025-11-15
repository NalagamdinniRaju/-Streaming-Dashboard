const BASE = "http://www.omdbapi.com";

// Helper function to get API key
function getApiKey(): string {
  const apiKey = process.env.OMDB_API_KEY;

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === "development") {
    console.log("API Key check:", apiKey ? "Found" : "Not found");
  }

  if (!apiKey) {
    console.error("OMDB_API_KEY is missing. Check your .env.local file.");
    throw new Error(
      "OMDB_API_KEY is not configured. Please add it to .env.local file and restart the server."
    );
  }
  return apiKey;
}

// Helper function to search for movies
async function searchMovies(searchTerm: string): Promise<any[]> {
  const API_KEY = getApiKey();

  const res = await fetch(
    `${BASE}/?s=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}&type=movie`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to search movies: ${res.status} ${errorText}`);
  }

  const data = await res.json();

  if (data.Response === "False") {
    return [];
  }

  return data.Search || [];
}

// Helper function to fetch full movie details by IMDB ID
async function fetchMovieDetails(imdbId: string): Promise<any> {
  const API_KEY = getApiKey();

  const res = await fetch(`${BASE}/?i=${imdbId}&apikey=${API_KEY}&plot=full`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch movie: ${res.status} ${errorText}`);
  }

  const data = await res.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found");
  }

  return data;
}

// Helper to validate image URL
function hasValidImage(posterUrl: string | null | undefined): boolean {
  if (!posterUrl || posterUrl === "N/A" || posterUrl.trim() === "") {
    return false;
  }
  // Check if it's a valid URL (starts with http/https)
  const isValidUrl =
    posterUrl.startsWith("http://") || posterUrl.startsWith("https://");
  // Exclude placeholder images
  const isNotPlaceholder =
    !posterUrl.includes("placeholder") &&
    !posterUrl.includes("no-poster") &&
    !posterUrl.startsWith("data:");
  return isValidUrl && isNotPlaceholder;
}

// Helper to filter valid movies
function isValidMovie(movie: any): boolean {
  const hasValidPoster = hasValidImage(movie.Poster);

  return (
    movie &&
    movie.imdbID &&
    movie.Title &&
    movie.Title !== "N/A" &&
    movie.Year &&
    movie.Year !== "N/A" &&
    hasValidPoster &&
    movie.Type === "movie"
  );
}

// Popular movies - using search terms for well-known movies
export async function fetchPopular(): Promise<{ results: any[] }> {
  const searchTerms = [
    "inception",
    "interstellar",
    "the dark knight",
    "pulp fiction",
    "the matrix",
    "fight club",
    "forrest gump",
    "the godfather",
  ];
  const allResults: any[] = [];

  for (const term of searchTerms) {
    try {
      const results = await searchMovies(term);
      const validResults = results.filter(isValidMovie);
      allResults.push(...validResults.slice(0, 3)); // Get 3 valid movies per search term
    } catch (error) {
      console.error(`Error searching for ${term}:`, error);
    }
  }

  // Remove duplicates based on imdbID and filter valid movies
  const uniqueResults = Array.from(
    new Map(allResults.map((movie) => [movie.imdbID, movie])).values()
  ).filter(isValidMovie);

  return { results: uniqueResults.slice(0, 20) };
}

// Now Playing - using recent movie search terms
export async function fetchNowPlaying(): Promise<{ results: any[] }> {
  const searchTerms = [
    "dune",
    "oppenheimer",
    "barbie",
    "top gun",
    "everything everywhere",
    "the batman",
    "no time to die",
    "spider-man",
  ];
  const allResults: any[] = [];

  for (const term of searchTerms) {
    try {
      const results = await searchMovies(term);
      const validResults = results.filter(isValidMovie);
      allResults.push(...validResults.slice(0, 3));
    } catch (error) {
      console.error(`Error searching for ${term}:`, error);
    }
  }

  const uniqueResults = Array.from(
    new Map(allResults.map((movie) => [movie.imdbID, movie])).values()
  ).filter(isValidMovie);

  return { results: uniqueResults.slice(0, 20) };
}

// Top Rated - using acclaimed movie search terms
export async function fetchTopRated(): Promise<{ results: any[] }> {
  const searchTerms = [
    "shawshank redemption",
    "schindler's list",
    "the lord of the rings",
    "goodfellas",
    "casablanca",
    "citizen kane",
    "titanic",
    "gladiator",
  ];
  const allResults: any[] = [];

  for (const term of searchTerms) {
    try {
      const results = await searchMovies(term);
      const validResults = results.filter(isValidMovie);
      allResults.push(...validResults.slice(0, 3));
    } catch (error) {
      console.error(`Error searching for ${term}:`, error);
    }
  }

  const uniqueResults = Array.from(
    new Map(allResults.map((movie) => [movie.imdbID, movie])).values()
  ).filter(isValidMovie);

  return { results: uniqueResults.slice(0, 20) };
}

// Fetch movie by ID (IMDB ID format: tt1234567)
export async function fetchMovieById(id: string): Promise<any> {
  // If ID doesn't start with 'tt', assume it's an IMDB ID and add 'tt' prefix
  const imdbId = id.startsWith("tt") ? id : `tt${id}`;
  return fetchMovieDetails(imdbId);
}
