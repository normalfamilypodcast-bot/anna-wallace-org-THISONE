"use client"

import Image from "next/image"
import Link from "next/link"
import { useContactDetails } from "@/providers/contact-details-provider"
import { ContactForm } from "./contact-form"

export const ContactPageClient = () => {
  const { email } = useContactDetails()

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
          <div className="flex flex-col justify-start pt-0 md:pt-8">
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
              Get in touch
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Whether you're thinking about bringing a workshop or keynote to your organisation, exploring what coaching could do for you or your team, booking me to speak at an event, or sharing your family story on A Normal Family — I'd love to hear from you.
            </p>

            <Link
              href={`mailto:${email}`}
              className="text-base font-medium text-foreground hover:underline mb-10"
            >
              {email}
            </Link>

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
