import React, { PropsWithChildren } from 'react';

import { OptimizedHeroImage } from '@/components/optimized-hero-image';
import { HeroImage } from '@/types/image';

export type HeroProps = PropsWithChildren & {
  title: string;
  subtitle: string;
};

export const Hero = ({ title, subtitle, children }: HeroProps) => (
  <div className='text-center mb-12'>
    <h1 className='text-4xl font-bold text-sage-900 mb-4'>{title}</h1>
    <p className='text-xl text-gray-600 max-w-3xl mx-auto'>{subtitle}</p>
    {children}
  </div>
);

export type HeroWithImageProps = PropsWithChildren & {
  title?: string;
  subtitle?: string;
  heroImage: HeroImage;
};

export const HeroWithImage = ({
  title,
  subtitle,
  heroImage,
  children,
}: HeroWithImageProps) => {
  const hasContent = title || subtitle || children;
  
  // When no content, render as a banner-only image with aspect ratio
  if (!hasContent) {
    return (
      <section className="relative w-full aspect-[16/9] md:aspect-[21/9] mb-8">
        <OptimizedHeroImage
          urls={heroImage.urls}
          alt={heroImage.alt}
        />
      </section>
    );
  }
  
  return (
    <section className="relative h-[60vh] flex items-center mb-8">
      <div className="absolute inset-0 z-0">
        <OptimizedHeroImage
          urls={heroImage.urls}
          alt={heroImage.alt}
          className="brightness-75"
        />
      </div>
      <div className='container relative z-10 mx-auto px-4 text-center text-white'>
        {title && <h1 className='text-4xl md:text-5xl font-bold mb-4'>{title}</h1>}
        {subtitle && <p className='text-xl md:text-2xl mb-4 max-w-3xl mx-auto'>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
};
