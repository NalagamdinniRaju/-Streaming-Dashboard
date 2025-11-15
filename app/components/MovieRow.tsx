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
    <section className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 px-4 md:px-8">
        {categoryTitle}
      </h2>
      <div className="flex gap-4 overflow-x-auto px-4 md:px-8 pb-4 scrollbar-hide scroll-smooth">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

