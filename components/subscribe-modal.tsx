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
import { RssIcon } from '@/components/icons/rss-icon'
import { SpotifyIcon } from '@/components/icons/spotify-icon'
import { YouTubeIcon } from '@/components/icons/youtube-icon'
import type { PodcastSource } from '@/types/contact-details'

interface SubscribeModalProps {
  sources: PodcastSource[]
  children: React.ReactNode
}

export function SubscribeModal({ sources, children }: SubscribeModalProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'apple-podcasts':
        return <ApplePodcastIcon />
      case 'spotify':
        return <SpotifyIcon />
      case 'youtube':
        return <YouTubeIcon />
      case 'rss':
        return <RssIcon />
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Subscribe to the Podcast</DialogTitle>
          <DialogDescription>
            Choose your favourite platform to never miss an episode.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4">
          {sources.map((source) => (
            <Button
              key={source.name}
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
