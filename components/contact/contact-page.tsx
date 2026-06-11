"use client"

import Image from "next/image"
import { useContactDetails } from "@/providers/contact-details-provider"
import { ContactStoryCta } from "./contact-story-cta"
import { ContactInfo } from "./contact-info"
import { ContactForm } from "./contact-form"

export const ContactPageClient = () => {
  const { email } = useContactDetails()

  return (
    <>
      {/* Hero: portrait image gets full height in a split layout */}
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-[75vw] md:min-h-[85vh] order-1">
          <Image
            src="https://res.cloudinary.com/dhngfy4p6/image/upload/v1781214133/anna_hero_contact_kdvl8f.jpg"
            alt="Anna Wallace"
            fill
            className="object-cover object-[50%_20%]"
            priority
          />
        </div>
        <div className="order-2 flex flex-col justify-center bg-background px-8 md:px-16 py-14">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Get in touch</h1>
          <p className="text-lg text-muted-foreground">I'd love to hear from you.</p>
        </div>
      </div>

      {/* Contact content */}
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
