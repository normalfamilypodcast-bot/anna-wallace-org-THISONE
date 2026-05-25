'use client';

import Image from 'next/image';

import { HeroImageUrls } from '@/types/hero-image';

interface OptimizedHeroImageProps {
  urls: HeroImageUrls;
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * Client component that displays optimized hero images for different devices
 * URLs are generated server-side and passed as props
 */
export function OptimizedHeroImage({
  urls,
  alt,
  className = '',
  priority = true,
}: OptimizedHeroImageProps) {
  return (
    <picture>
      {/* Desktop */}
      <source media='(min-width: 1024px)' srcSet={urls.desktop} />

      {/* Tablet */}
      <source media='(min-width: 768px)' srcSet={urls.tablet} />

      {/* Mobile */}
      <source media='(max-width: 767px)' srcSet={urls.mobile} />

      {/* Fallback */}
      <Image
        src={urls.desktop || '/placeholder.svg'}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        priority={priority}
        sizes='100vw'
      />
    </picture>
  );
}
