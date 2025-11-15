'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  fallbackSrc?: string;
}

const defaultFallback = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzJkM2Q0ZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

export default function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  className,
  style,
  priority,
  fallbackSrc = defaultFallback,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Reset when src changes
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  // Validate and sanitize src
  const isValidSrc = src && 
    src !== 'N/A' && 
    src !== 'undefined' && 
    src.trim() !== '' &&
    (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:'));

  const finalSrc = isValidSrc ? imgSrc : fallbackSrc;

  return (
    <Image
      src={finalSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      style={style}
      priority={priority}
      onError={handleError}
      unoptimized={finalSrc.startsWith('data:')}
    />
  );
}

