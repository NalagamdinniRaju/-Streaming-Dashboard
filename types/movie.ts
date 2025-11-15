// OMDb API Movie interface (search results)
export interface Movie {
  id: string; // imdbID from OMDb
  imdbID: string;
  Title: string;
  Year?: string;
  Poster?: string;
  Type?: string;
  // Mapped fields for compatibility
  title: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
}

// OMDb API Movie Detail interface (full movie data)
export interface MovieDetail {
  imdbID: string;
  Title: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: Array<{ Source: string; Value: string }>;
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: string;
  // Mapped fields for compatibility
  id: string;
  title: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  genres?: Array<{ id: number; name: string }>;
  runtime?: number;
  tagline?: string;
  status?: string;
}

export interface MovieResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
  results: Movie[];
}

