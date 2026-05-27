'use client';

import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export const ContactStoryCta = () => {
  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-8 text-center">
        <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
          Have a story to tell?
        </h2>
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
          If you&apos;d like to be a guest on A Normal Family, I&apos;d love to hear from you. Fill in the story submission form and I&apos;ll be in touch.
        </p>
        <Button asChild size="lg" className="rounded-none font-medium">
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSfCySo69H8MLnCD10kr6kPE2GXiHD5T-dAeq8aR3kZeEcsDqw/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Share your story
          </a>
        </Button>
      </div>
    </div>
  );
};
