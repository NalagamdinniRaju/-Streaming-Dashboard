import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchMovieById } from '@/lib/tmdb';
import type { MovieDetail } from '@/types/movie';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const movie: MovieDetail = await fetchMovieById(id);
    return {
      title: `${movie.title} - Streaming Dashboard`,
      description: movie.overview || `Details for ${movie.title}`,
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
    const movie: MovieDetail = await fetchMovieById(id);

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '/placeholder-poster.jpg';

    const backdropUrl = movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : null;

    return (
      <div className="pt-16 min-h-screen">
        {/* Backdrop */}
        {backdropUrl && (
          <div className="fixed inset-0 -z-10">
            <Image
              src={backdropUrl}
              alt={movie.title}
              fill
              style={{ objectFit: 'cover' }}
              className="brightness-30"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-block mb-6 text-gray-300 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <div className="relative w-full max-w-sm aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>

              {movie.tagline && (
                <p className="text-xl text-gray-300 italic mb-4">{movie.tagline}</p>
              )}

              <div className="flex flex-wrap gap-4 mb-6">
                {movie.release_date && (
                  <span className="text-gray-300">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                )}
                {movie.runtime && (
                  <span className="text-gray-300">{movie.runtime} min</span>
                )}
                {movie.vote_average && (
                  <span className="text-gray-300">
                    ⭐ {movie.vote_average.toFixed(1)} / 10
                  </span>
                )}
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-red-600 text-white rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {movie.overview && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                  <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mt-8">
                {movie.status && (
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Status</h3>
                    <p className="text-white">{movie.status}</p>
                  </div>
                )}
                {movie.budget && movie.budget > 0 && (
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Budget</h3>
                    <p className="text-white">${movie.budget.toLocaleString()}</p>
                  </div>
                )}
                {movie.revenue && movie.revenue > 0 && (
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Revenue</h3>
                    <p className="text-white">${movie.revenue.toLocaleString()}</p>
                  </div>
                )}
                {movie.vote_count && (
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Votes</h3>
                    <p className="text-white">{movie.vote_count.toLocaleString()}</p>
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

