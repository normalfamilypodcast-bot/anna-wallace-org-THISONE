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
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dhngfy4p6/image/upload/v1764680381/tall_trees_pale_green_zquwdu.jpg"
          alt="Sunlit forest trail"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-foreground/30 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-background mb-4">Get in touch</h1>
          <p className="text-lg text-background/90 max-w-md">I'd love to hear from you.</p>
        </div>
      </div>

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
