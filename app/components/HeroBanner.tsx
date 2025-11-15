import Image from 'next/image';
import Link from 'next/link';
import type { Movie } from '@/types/movie';

interface HeroBannerProps {
  movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '/placeholder-backdrop.jpg';

  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full">
      <Image
        src={backdropUrl}
        alt={movie.title}
        fill
        priority
        style={{ objectFit: 'cover' }}
        className="brightness-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {movie.title}
          </h1>
          {movie.overview && (
            <p className="text-lg md:text-xl text-gray-200 mb-6 line-clamp-3 drop-shadow-md">
              {movie.overview}
            </p>
          )}
          <Link
            href={`/movie/${movie.id}`}
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </section>
  );
}

