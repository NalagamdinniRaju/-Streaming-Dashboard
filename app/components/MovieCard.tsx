'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : '/placeholder-poster.jpg';

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="block min-w-[150px] md:min-w-[200px] group transition-transform hover:scale-105"
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
        <Image
          src={posterUrl}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 150px, 200px"
          style={{ objectFit: 'cover' }}
          className="group-hover:opacity-80 transition-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white text-sm font-semibold line-clamp-2">{movie.title}</p>
          {movie.release_date && (
            <p className="text-gray-300 text-xs mt-1">{new Date(movie.release_date).getFullYear()}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

