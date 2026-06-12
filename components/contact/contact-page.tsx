"use client"

import Image from "next/image"
import { useContactDetails } from "@/providers/contact-details-provider"
import { ContactForm } from "./contact-form"

export const ContactPageClient = () => {
  // email available if needed: const { email } = useContactDetails()

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Image at natural portrait proportions */}
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

          {/* Content */}
          <div className="flex flex-col justify-start">
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
              Get in touch
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Whether you're here to rewrite your own story through coaching, to help your organisation understand the stories shaping how your teams work together, to book me for a talk or event, or to share your story on the podcast — I'd love to hear from you.
            </p>

<ContactForm />

            <p className="text-sm text-muted-foreground mt-8">
              Want to be a guest on A Normal Family?{" "}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfCySo69H8MLnCD10kr6kPE2GXiHD5T-dAeq8aR3kZeEcsDqw/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Share your story here.
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
