'use client';

import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';
import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  // OMDb provides full poster URLs, or use poster_path if available
  const posterUrl = movie.Poster && movie.Poster !== 'N/A' 
    ? movie.Poster 
    : movie.poster_path && movie.poster_path !== 'N/A'
    ? movie.poster_path
    : null;

  // Don't render if no valid image
  if (!posterUrl || posterUrl === 'N/A' || (!posterUrl.startsWith('http://') && !posterUrl.startsWith('https://'))) {
    return null;
  }

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="block min-w-[160px] md:min-w-[220px] group"
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl hover-lift">
        <ImageWithFallback
          src={posterUrl || ''}
          alt={movie.title || movie.Title || 'Movie poster'}
          fill
          sizes="(max-width: 768px) 160px, 220px"
          style={{ objectFit: 'cover' }}
          className="group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {movie.vote_average && (
            <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
              <span className="text-yellow-400 text-xs">⭐</span>
              <span className="text-white text-xs font-bold">{movie.vote_average.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <p className="text-white text-sm md:text-base font-bold line-clamp-2 mb-1 drop-shadow-lg">
            {movie.title || movie.Title}
          </p>
          {(movie.Year || movie.release_date) && (
            <p className="text-gray-300 text-xs md:text-sm font-medium">
              {movie.Year || (movie.release_date ? new Date(movie.release_date).getFullYear() : '')}
            </p>
          )}
        </div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 rounded-xl transition-all duration-300"></div>
      </div>
    </Link>
  );
}

