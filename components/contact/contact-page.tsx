"use client"

import Image from "next/image"
import { useContactDetails } from "@/providers/contact-details-provider"
import { ContactStoryCta } from "./contact-story-cta"
import { ContactInfo } from "./contact-info"
import { ContactForm } from "./contact-form"

export const ContactPageClient = () => {
  const { email } = useContactDetails()

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">

        {/* Two-column: image at natural proportions, content beside it */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Image — renders at natural 2:3 portrait ratio, no cropping */}
          <div className="w-full">
            <Image
              src="https://res.cloudinary.com/dhngfy4p6/image/upload/v1781214133/anna_hero_contact_kdvl8f.jpg"
              alt="Anna Wallace"
              width={800}
              height={1200}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Content — stacked naturally beside the image */}
          <div className="flex flex-col justify-start pt-0 md:pt-8">
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-3">Get in touch</h1>
            <p className="text-lg text-muted-foreground mb-10">I'd love to hear from you.</p>
            <ContactStoryCta />
            <div className="mt-10 space-y-10">
              <ContactInfo email={email} />
              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
