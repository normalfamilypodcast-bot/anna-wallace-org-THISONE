"use client"

import Image from "next/image"
import { useContactDetails } from "@/providers/contact-details-provider"
import { ContactStoryCta } from "./contact-story-cta"
import { ContactInfo } from "./contact-info"
import { ContactForm } from "./contact-form"

export const ContactPageClient = () => {
  const { email } = useContactDetails()

  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      {/* Image column — height driven by content column opposite */}
      <div className="relative min-h-[80vw] md:min-h-0 order-1">
        <Image
          src="https://res.cloudinary.com/dhngfy4p6/image/upload/v1781214133/anna_hero_contact_kdvl8f.jpg"
          alt="Anna Wallace"
          fill
          className="object-cover object-[50%_20%]"
          priority
        />
      </div>

      {/* Content column — determines the overall section height */}
      <div className="order-2 flex flex-col justify-start bg-background px-8 md:px-14 py-16 md:py-20">
        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-3">Get in touch</h1>
        <p className="text-lg text-muted-foreground mb-12">I'd love to hear from you.</p>

        <ContactStoryCta />

        <div className="mt-12 space-y-12">
          <ContactInfo email={email} />
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
