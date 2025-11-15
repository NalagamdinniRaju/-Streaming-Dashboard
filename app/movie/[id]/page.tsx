import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchMovieById } from '@/lib/tmdb';
import type { MovieDetail } from '@/types/movie';
import { MovieBackdrop, MoviePoster } from '@/app/components/MovieDetailImages';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const movieData: any = await fetchMovieById(id);
    return {
      title: `${movieData.Title || 'Movie'} - Streaming Dashboard`,
      description: movieData.Plot || `Details for ${movieData.Title || 'movie'}`,
    };
  } catch {
    return {
      title: 'Movie Not Found - Streaming Dashboard',
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  try {
    const movieData: any = await fetchMovieById(id);
    
    // Map OMDb response to MovieDetail format
    const movie: MovieDetail = {
      ...movieData,
      id: movieData.imdbID,
      title: movieData.Title,
      poster_path: movieData.Poster && movieData.Poster !== 'N/A' ? movieData.Poster : null,
      backdrop_path: null, // OMDb doesn't provide backdrop
      overview: movieData.Plot,
      release_date: movieData.Released || movieData.Year ? `${movieData.Year}-01-01` : undefined,
      vote_average: movieData.imdbRating ? parseFloat(movieData.imdbRating) : undefined,
      vote_count: movieData.imdbVotes ? parseInt(movieData.imdbVotes.replace(/,/g, '')) : undefined,
      runtime: movieData.Runtime ? parseInt(movieData.Runtime.replace(' min', '')) : undefined,
      genres: movieData.Genre ? movieData.Genre.split(', ').map((name: string, idx: number) => ({ id: idx, name })) : undefined,
    };

    const posterUrl = movie.poster_path && movie.poster_path !== 'N/A'
      ? movie.poster_path
      : '/placeholder-poster.jpg';

    const backdropUrl = movie.backdrop_path && movie.backdrop_path !== 'N/A'
      ? movie.backdrop_path
      : (movie.poster_path && movie.poster_path !== 'N/A')
      ? movie.poster_path
      : null;

    return (
      <div className="pt-16 min-h-screen">
        <MovieBackdrop
          backdropUrl={backdropUrl}
          title={movie.title || movie.Title || 'Movie'}
        />

        <div className="container mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-block mb-6 text-gray-300 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>

          <div className="flex flex-col md:flex-row gap-8">
            <MoviePoster
              posterUrl={posterUrl}
              title={movie.title || movie.Title || 'Movie'}
            />

            {/* Details */}
            <div className="flex-1 text-white">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {movie.title || movie.Title}
              </h1>

              {movie.Rated && (
                <div className="inline-block mb-6 px-4 py-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full">
                  <span className="text-red-400 font-semibold">Rated: {movie.Rated}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-4 mb-8">
                {movie.Year && (
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="text-gray-400">📅</span>
                    <span className="text-white font-semibold">{movie.Year}</span>
                  </div>
                )}
                {movie.Runtime && (
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="text-gray-400">⏱️</span>
                    <span className="text-white font-semibold">{movie.Runtime}</span>
                  </div>
                )}
                {movie.imdbRating && (
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="text-yellow-400 text-lg">⭐</span>
                    <span className="text-white font-bold">{movie.imdbRating}</span>
                    <span className="text-gray-400 text-sm">/ 10</span>
                  </div>
                )}
                {movie.Metascore && (
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="text-green-400">🎯</span>
                    <span className="text-white font-semibold">Metascore: {movie.Metascore}</span>
                  </div>
                )}
              </div>

              {movie.Genre && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {movie.Genre.split(', ').map((genre: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {movie.Plot && (
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                    <span className="w-1 h-6 bg-gradient-to-b from-red-600 to-pink-600 rounded-full"></span>
                    Plot
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    {movie.Plot}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {movie.Director && (
                  <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <h3 className="text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wide">Director</h3>
                    <p className="text-white text-lg font-medium">{movie.Director}</p>
                  </div>
                )}
                {movie.Writer && (
                  <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <h3 className="text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wide">Writer</h3>
                    <p className="text-white text-lg font-medium">{movie.Writer}</p>
                  </div>
                )}
                {movie.Actors && (
                  <div className="col-span-1 md:col-span-2 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <h3 className="text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wide">Cast</h3>
                    <p className="text-white text-lg font-medium">{movie.Actors}</p>
                  </div>
                )}
                {movie.BoxOffice && (
                  <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <h3 className="text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wide">Box Office</h3>
                    <p className="text-white text-lg font-bold text-green-400">{movie.BoxOffice}</p>
                  </div>
                )}
                {movie.imdbVotes && (
                  <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <h3 className="text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wide">IMDb Votes</h3>
                    <p className="text-white text-lg font-bold">{movie.imdbVotes}</p>
                  </div>
                )}
                {movie.Awards && movie.Awards !== 'N/A' && (
                  <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/30">
                    <h3 className="text-sm text-yellow-400 mb-2 font-semibold uppercase tracking-wide flex items-center gap-2">
                      <span>🏆</span>
                      Awards
                    </h3>
                    <p className="text-white text-lg font-medium">{movie.Awards}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching movie:', error);
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Movie Not Found</h1>
          <Link href="/" className="text-red-600 hover:text-red-500">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
}

