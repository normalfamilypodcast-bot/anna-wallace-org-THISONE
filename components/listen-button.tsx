'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ApplePodcastIcon } from '@/components/icons/apple-podcast-icon'
import { SpotifyIcon } from '@/components/icons/spotify-icon'
import { YouTubeIcon } from '@/components/icons/youtube-icon'
import { Play } from 'lucide-react'
import type { PodcastSource } from '@/types/contact-details'

interface ListenButtonProps {
  audioUrls: PodcastSource[]
  episodeTitle: string
  variant?: 'default' | 'ghost'
  size?: 'default' | 'sm'
}

export function ListenButton({ audioUrls, episodeTitle, variant = 'default', size = 'default' }: ListenButtonProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'apple-podcasts':
        return <ApplePodcastIcon />
      case 'spotify':
        return <SpotifyIcon />
      case 'youtube':
        return <YouTubeIcon />
      default:
        return null
    }
  }

  // Single source - render direct link with platform icon
  if (audioUrls.length === 1) {
    const source = audioUrls[0]
    const buttonClasses = variant === 'default' 
      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
      : 'text-primary hover:text-primary hover:bg-primary/10 -ml-2'

    return (
      <Button
        asChild
        variant={variant}
        size={size}
        className={buttonClasses}
      >
        <a href={source.url} target="_blank" rel="noopener noreferrer">
          {size === 'sm' ? (
            <>
              {getIcon(source.icon)}
              <span className="ml-1">Play</span>
            </>
          ) : (
            <>
              {getIcon(source.icon)}
              <span className="ml-2">Listen Now</span>
            </>
          )}
        </a>
      </Button>
    )
  }

  // Multiple sources - render modal
  const buttonClasses = variant === 'default' 
    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
    : 'text-primary hover:text-primary hover:bg-primary/10 -ml-2'

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={buttonClasses}
        >
          {size === 'sm' ? (
            <>
              <Play className="w-3 h-3 mr-1" />
              Play
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Listen Now
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Listen to this Episode</DialogTitle>
          <DialogDescription className="line-clamp-2">
            {episodeTitle}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4">
          {audioUrls.map((source) => (
            <Button
              key={source.id}
              asChild
              variant="outline"
              className="w-full justify-start gap-3 h-12"
            >
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {getIcon(source.icon)}
                {source.cta}
              </a>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
