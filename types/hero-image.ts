export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type AspectRatio = '16:9' | '4:3' | '3:2' | '21:9';
export type GravityType =
  | 'center'
  | 'north'
  | 'south'
  | 'east'
  | 'west'
  | 'northeast'
  | 'northwest'
  | 'southeast'
  | 'southwest'
  | 'auto';

export interface HeroImageConfig {
  imageId: string;
  alt: string;
  devices: {
    desktop: {
      aspectRatio: AspectRatio;
      gravity: GravityType;
    };
    tablet: {
      aspectRatio: AspectRatio;
      gravity: GravityType;
    };
    mobile: {
      aspectRatio: AspectRatio;
      gravity: GravityType;
    };
  };
}

export interface HeroImageUrls {
  mobile: string;
  tablet: string;
  desktop: string;
}

export type HeroImage = {
  urls: HeroImageUrls;
  alt: string;
};

export type HeroImageConfigMap = {
  [key: string]: HeroImageConfig;
};

export type HeroImageKey = keyof HeroImageConfigMap;
