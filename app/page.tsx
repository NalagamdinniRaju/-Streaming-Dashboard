import HeroBanner from '@/app/components/HeroBanner';
import MovieRow from '@/app/components/MovieRow';
import { fetchPopular, fetchNowPlaying, fetchTopRated } from '@/lib/tmdb';
import type { Movie } from '@/types/movie';

// Helper to map OMDb movie to our Movie interface
function mapOMDbMovie(omdbMovie: any): Movie {
  return {
    id: omdbMovie.imdbID || omdbMovie.id,
    imdbID: omdbMovie.imdbID,
    Title: omdbMovie.Title,
    Year: omdbMovie.Year,
    Poster: omdbMovie.Poster,
    Type: omdbMovie.Type,
    // Mapped fields
    title: omdbMovie.Title || omdbMovie.title || '',
    poster_path: omdbMovie.Poster && omdbMovie.Poster !== 'N/A' ? omdbMovie.Poster : null,
    backdrop_path: null, // OMDb doesn't provide backdrop images
    overview: omdbMovie.Plot || omdbMovie.overview,
    release_date: omdbMovie.Year ? `${omdbMovie.Year}-01-01` : omdbMovie.release_date,
    vote_average: omdbMovie.imdbRating ? parseFloat(omdbMovie.imdbRating) : undefined,
    vote_count: omdbMovie.imdbVotes ? parseInt(omdbMovie.imdbVotes.replace(/,/g, '')) : undefined,
  };
}

// Helper to validate image URL
function hasValidImage(posterUrl: string | null | undefined): boolean {
  if (!posterUrl || posterUrl === 'N/A' || posterUrl.trim() === '') {
    return false;
  }
  // Check if it's a valid URL (starts with http/https)
  const isValidUrl = posterUrl.startsWith('http://') || posterUrl.startsWith('https://');
  // Exclude placeholder images
  const isNotPlaceholder = !posterUrl.includes('placeholder') && 
                           !posterUrl.includes('no-poster') &&
                           !posterUrl.startsWith('data:');
  return isValidUrl && isNotPlaceholder;
}

// Filter out invalid movies - must have valid image
function filterValidMovies(movies: Movie[]): Movie[] {
  return movies.filter(movie => 
    movie &&
    movie.id &&
    movie.title &&
    movie.title !== 'N/A' &&
    hasValidImage(movie.poster_path || movie.Poster)
  );
}

export default async function HomePage() {
  try {
    const [popularData, nowPlayingData, topRatedData] = await Promise.all([
      fetchPopular(),
      fetchNowPlaying(),
      fetchTopRated(),
    ]);

    const popularMovies: Movie[] = filterValidMovies((popularData.results || []).map(mapOMDbMovie));
    const nowPlayingMovies: Movie[] = filterValidMovies((nowPlayingData.results || []).map(mapOMDbMovie));
    const topRatedMovies: Movie[] = filterValidMovies((topRatedData.results || []).map(mapOMDbMovie));

    const heroMovie = popularMovies[0] || null;

    return (
      <div className="pt-16 min-h-screen">
        {heroMovie && <HeroBanner movie={heroMovie} />}
        <div className="py-8 md:py-12 bg-gradient-to-b from-transparent via-black/20 to-black">
          {popularMovies.length > 0 && (
            <MovieRow movies={popularMovies} categoryTitle="Popular Movies" />
          )}
          {nowPlayingMovies.length > 0 && (
            <MovieRow movies={nowPlayingMovies} categoryTitle="Now Playing" />
          )}
          {topRatedMovies.length > 0 && (
            <MovieRow movies={topRatedMovies} categoryTitle="Top Rated" />
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching movies:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isApiKeyError = errorMessage.includes('OMDB_API_KEY is not configured');
    
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-black">
        <div className="text-center max-w-2xl px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Error Loading Movies</h1>
          {isApiKeyError ? (
            <div className="space-y-4">
              <p className="text-gray-300 text-lg mb-6">
                The OMDb API key is not configured. Please follow these steps:
              </p>
              <div className="bg-gray-900 rounded-lg p-6 text-left space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">1.</span>
                  <div>
                    <p className="text-white font-semibold">Get a free API key from OMDb</p>
                    <p className="text-gray-400 text-sm">Visit <a href="http://www.omdbapi.com/apikey.aspx" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">omdbapi.com/apikey.aspx</a> and request an API key</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">2.</span>
                  <div>
                    <p className="text-white font-semibold">Create .env.local file</p>
                    <p className="text-gray-400 text-sm">In the root directory, create a file named <code className="bg-gray-800 px-2 py-1 rounded">.env.local</code></p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">3.</span>
                  <div>
                    <p className="text-white font-semibold">Add your API key</p>
                    <p className="text-gray-400 text-sm">Add this line to .env.local:</p>
                    <pre className="bg-gray-800 p-3 rounded mt-2 text-green-400 text-sm overflow-x-auto">OMDB_API_KEY=your_api_key_here</pre>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">4.</span>
                  <div>
                    <p className="text-white font-semibold">Restart the dev server</p>
                    <p className="text-gray-400 text-sm">Stop the server (Ctrl+C) and run <code className="bg-gray-800 px-2 py-1 rounded">npm run dev</code> again</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-gray-300">An error occurred while fetching movies:</p>
              <p className="text-red-400 text-sm font-mono bg-gray-900 p-3 rounded">{errorMessage}</p>
              <p className="text-gray-400 text-sm mt-4">Please check your API key and try again.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

