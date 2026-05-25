import 'server-only';
import type {
  HeroImageKey,
  HeroImageConfig,
  DeviceType,
  AspectRatio,
  GravityType,
} from '@/types/image';

import cloudinary from './client/cloudinary';

interface HeroImageOptions {
  imageId: HeroImageKey;
  deviceType: DeviceType;
  aspectRatio?: AspectRatio;
  quality?: 'auto' | 'low' | 'medium' | 'high';
  gravity?:
    | GravityType
    | {
        mobile?: GravityType;
        tablet?: GravityType;
        desktop?: GravityType;
      };
}

/**
 * Generate optimized hero image URL for different devices
 * Uses manual configuration for edge cases
 */
export function generateHeroImageUrl({
  imageId,
  deviceType,
  aspectRatio,
  quality = 'auto',
  gravity,
}: HeroImageOptions): string {
  const baseTransformations = {
    format: 'auto',
    quality,
    crop: 'fill',
  };

  // Use manual configuration (fallback mode)
  const deviceAspectRatio = aspectRatio || '16:9';
  const deviceGravity = typeof gravity === 'string' ? gravity : 'center';

  // Device-specific configurations
  const deviceConfigs = {
    mobile: {
      width: 800,
      height:
        deviceAspectRatio === '16:9'
          ? 450
          : deviceAspectRatio === '4:3'
            ? 600
            : 533,
      gravity: deviceGravity,
    },
    tablet: {
      width: 1200,
      height:
        deviceAspectRatio === '16:9'
          ? 675
          : deviceAspectRatio === '4:3'
            ? 900
            : 800,
      gravity: deviceGravity,
    },
    desktop: {
      width: 1920,
      height:
        deviceAspectRatio === '16:9'
          ? 1080
          : deviceAspectRatio === '4:3'
            ? 1440
            : 1280,
      gravity: deviceGravity,
    },
  };

  const deviceConfig = deviceConfigs[deviceType];
  const transformations = { ...baseTransformations, ...deviceConfig };

  const url = cloudinary.url(imageId, {
    secure: true,
    transformation: transformations,
  });

  return url;
}

/**
 * Generate all hero image URLs using a hero image configuration
 * This is the recommended way to generate hero images
 */
export function generateConfiguredHeroImageUrls(config: HeroImageConfig) {
  const generateForDevice = (deviceType: DeviceType) => {
    const deviceConfig = config.devices[deviceType];
    const baseTransformations = {
      format: 'auto',
      quality: 'auto',
      crop: 'fill',
    };

    // Device-specific dimensions
    const deviceConfigs = {
      mobile: {
        width: 800,
        height:
          deviceConfig.aspectRatio === '16:9'
            ? 450
            : deviceConfig.aspectRatio === '4:3'
              ? 600
              : 533,
      },
      tablet: {
        width: 1200,
        height:
          deviceConfig.aspectRatio === '16:9'
            ? 675
            : deviceConfig.aspectRatio === '4:3'
              ? 900
              : 800,
      },
      desktop: {
        width: 1920,
        height:
          deviceConfig.aspectRatio === '16:9'
            ? 1080
            : deviceConfig.aspectRatio === '4:3'
              ? 1440
              : 1280,
      },
    };

    const dimensions = deviceConfigs[deviceType];
    const transformations = {
      ...baseTransformations,
      ...dimensions,
      gravity: deviceConfig.gravity,
    };

    const url = cloudinary.url(config.imageId, {
      secure: true,
      transformation: transformations,
    });

    return url;
  };

  const urls = {
    mobile: generateForDevice('mobile'),
    tablet: generateForDevice('tablet'),
    desktop: generateForDevice('desktop'),
  };

  return urls;
}
