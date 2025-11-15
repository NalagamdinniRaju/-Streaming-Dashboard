import HeroBanner from '@/app/components/HeroBanner';
import MovieRow from '@/app/components/MovieRow';
import { fetchPopular, fetchNowPlaying, fetchTopRated } from '@/lib/tmdb';
import type { Movie } from '@/types/movie';

export default async function HomePage() {
  try {
    const [popularData, nowPlayingData, topRatedData] = await Promise.all([
      fetchPopular(),
      fetchNowPlaying(),
      fetchTopRated(),
    ]);

    const popularMovies: Movie[] = popularData.results || [];
    const nowPlayingMovies: Movie[] = nowPlayingData.results || [];
    const topRatedMovies: Movie[] = topRatedData.results || [];

    const heroMovie = popularMovies[0] || null;

    return (
      <div className="pt-16">
        {heroMovie && <HeroBanner movie={heroMovie} />}
        <div className="mt-8">
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
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Error Loading Movies</h1>
          <p className="text-gray-400">
            Please check your API key in .env.local file
          </p>
        </div>
      </div>
    );
  }
}

