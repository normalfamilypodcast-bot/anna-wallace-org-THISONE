"use client"

import { useContactDetails } from "@/providers/contact-details-provider"
import { ContactStoryCta } from "./contact-story-cta"
import { ContactInfo } from "./contact-info"
import { ContactForm } from "./contact-form"
import { HeroWithImage } from "@/components/hero"
import type { HeroImage } from "@/types/hero-image"

interface ContactPageProps {
  heroImage: HeroImage
}

export const ContactPageClient = ({ heroImage }: ContactPageProps) => {
  const { email } = useContactDetails()

  return (
    <>
      <HeroWithImage
        title="Contact Us"
        subtitle="We'd love to hear from you. Get in touch with any questions."
        heroImage={heroImage}
      />

      <div className="bg-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <ContactStoryCta />

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
            <ContactInfo email={email} />
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}
