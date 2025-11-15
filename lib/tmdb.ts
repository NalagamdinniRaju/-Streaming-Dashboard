const BASE = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

if (!API_KEY) {
  console.warn('TMDB_API_KEY is not set. API calls will fail.');
}

export async function fetchPopular(): Promise<{ results: any[] }> {
  const res = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  if (!res.ok) throw new Error('Failed to fetch popular movies');
  return res.json();
}

export async function fetchNowPlaying(): Promise<{ results: any[] }> {
  const res = await fetch(`${BASE}/movie/now_playing?api_key=${API_KEY}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch now playing movies');
  return res.json();
}

export async function fetchTopRated(): Promise<{ results: any[] }> {
  const res = await fetch(`${BASE}/movie/top_rated?api_key=${API_KEY}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch top rated movies');
  return res.json();
}

export async function fetchMovieById(id: string): Promise<any> {
  const res = await fetch(`${BASE}/movie/${id}?api_key=${API_KEY}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch movie');
  return res.json();
}

