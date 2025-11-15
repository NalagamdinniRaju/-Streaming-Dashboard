export interface Movie {
  id: number;
  title: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
}

export interface MovieDetail extends Movie {
  genres?: Array<{ id: number; name: string }>;
  runtime?: number;
  budget?: number;
  revenue?: number;
  tagline?: string;
  status?: string;
  production_companies?: Array<{ id: number; name: string; logo_path?: string | null }>;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

