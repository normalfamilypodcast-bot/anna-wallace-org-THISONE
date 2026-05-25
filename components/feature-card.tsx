import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  buttonText: string
  buttonHref: string
}

export function FeatureCard({ icon: Icon, title, description, buttonText, buttonHref }: FeatureCardProps) {
  return (
    <Card className="p-6 md:p-8 bg-card border-border hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl md:text-2xl font-serif text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        <Button variant="outline" className="border-border text-foreground" asChild>
          <Link href={buttonHref}>{buttonText}</Link>
        </Button>
      </div>
    </Card>
  )
}
