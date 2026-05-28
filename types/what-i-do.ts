import { Image } from './image'
export interface WhatIDoItem {
  id: string;
  title: string;
  description: string;
  image: Image;
  videoId?: string;
  cta: {
    text: string;
    href: string;
  };
}
