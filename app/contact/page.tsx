import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactPageClient } from "@/components/contact/contact-page"

export const dynamic = "force-dynamic"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <ContactPageClient />
      <SiteFooter />
    </div>
  )
}
