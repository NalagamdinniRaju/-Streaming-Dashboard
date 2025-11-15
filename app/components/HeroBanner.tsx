'use client';

import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';
import type { Movie } from '@/types/movie';

interface HeroBannerProps {
  movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  // OMDb doesn't provide backdrop images, so we'll use the poster as fallback
  const backdropUrl = movie.backdrop_path && movie.backdrop_path !== 'N/A'
    ? movie.backdrop_path
    : (movie.Poster && movie.Poster !== 'N/A')
    ? movie.Poster
    : (movie.poster_path && movie.poster_path !== 'N/A')
    ? movie.poster_path
    : null;

  // Don't render if no valid image
  if (!backdropUrl) {
    return null;
  }

  return (
    <section className="relative h-[75vh] md:h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={backdropUrl}
          alt={movie.title || movie.Title || 'Movie backdrop'}
          fill
          priority
          style={{ objectFit: 'cover' }}
          className="brightness-[0.35]"
        />
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      
      {/* Content */}
      <div className="relative h-full flex items-end">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 pb-12 md:pb-20 lg:pb-24">
          <div className="max-w-4xl">
            {/* Year Badge */}
            {movie.Year && (
              <div className="inline-flex items-center gap-2 mb-5 px-5 py-2.5 bg-black/50 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-white text-sm font-semibold tracking-wide">{movie.Year}</span>
              </div>
            )}
            
            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-6 leading-[0.9] drop-shadow-2xl tracking-tight">
              {movie.title || movie.Title}
            </h1>
            
            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {movie.vote_average && (
                <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md rounded-lg px-5 py-2.5 border border-white/10 shadow-xl">
                  <span className="text-yellow-400 text-2xl">⭐</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white font-bold text-xl">{movie.vote_average.toFixed(1)}</span>
                    <span className="text-gray-400 text-sm">/ 10</span>
                  </div>
                </div>
              )}
              {movie.vote_count && (
                <div className="text-gray-300 text-sm md:text-base font-medium bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                  {movie.vote_count.toLocaleString()} {movie.vote_count === 1 ? 'vote' : 'votes'}
                </div>
              )}
            </div>
            
            {/* Overview */}
            {movie.overview && (
              <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-8 line-clamp-3 drop-shadow-lg leading-relaxed max-w-3xl">
                {movie.overview}
              </p>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/movie/${movie.id || movie.imdbID}`}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 via-red-500 to-pink-600 hover:from-red-500 hover:via-pink-500 hover:to-pink-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 active:scale-95"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span className="text-lg">Watch Now</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href={`/movie/${movie.id || movie.imdbID}`}
                className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>More Info</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
}

