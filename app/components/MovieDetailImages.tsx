'use client';

import ImageWithFallback from './ImageWithFallback';

interface MovieDetailImagesProps {
  posterUrl: string | null;
  backdropUrl: string | null;
  title: string;
}

export function MovieBackdrop({
  backdropUrl,
  title,
}: {
  backdropUrl: string | null;
  title: string;
}) {
  if (!backdropUrl) return null;
  
  return (
    <div className="fixed inset-0 -z-10">
      <ImageWithFallback
        src={backdropUrl}
        alt={`${title} backdrop`}
        fill
        style={{ objectFit: 'cover' }}
        className="brightness-30"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}

export function MoviePoster({
  posterUrl,
  title,
}: {
  posterUrl: string | null;
  title: string;
}) {
  return (
    <div className="flex-shrink-0">
      <div className="relative w-full max-w-sm aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
        <ImageWithFallback
          src={posterUrl || ''}
          alt={`${title} poster`}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </div>
  );
}

