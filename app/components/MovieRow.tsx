'use client';

import type { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

interface MovieRowProps {
  movies: Movie[];
  categoryTitle: string;
}

export default function MovieRow({ movies, categoryTitle }: MovieRowProps) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="mb-12 md:mb-16">
      <div className="container mx-auto px-4 md:px-8 mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <span className="w-1 h-8 bg-gradient-to-b from-red-600 to-pink-600 rounded-full"></span>
          {categoryTitle}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-transparent rounded-full mb-6"></div>
      </div>
      <div className="flex gap-5 overflow-x-auto px-4 md:px-8 pb-6 scrollbar-hide scroll-smooth snap-x snap-mandatory">
        {movies.map((movie) => (
          <div key={movie.id} className="snap-start flex-shrink-0">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}

