import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactPageClient } from "@/components/contact/contact-page"
import { getHeroImage } from "@/lib/hero-image-source"
import { generateConfiguredHeroImageUrls } from "@/lib/image-optimization"

export const dynamic = "force-dynamic"

const HERO_IMAGE = "tall_trees_pale_green"

export default function ContactPage() {
  const heroImage = getHeroImage(HERO_IMAGE)
  const heroImageUrls = generateConfiguredHeroImageUrls(heroImage)
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <ContactPageClient heroImage={{ alt: heroImage.alt, urls: heroImageUrls }} />
      <SiteFooter />
    </div>
  )
}
