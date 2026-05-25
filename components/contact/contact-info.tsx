'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';

type ContactInfoProps = {
  email: string;
};

export const ContactInfo = ({ email }: ContactInfoProps) => {
  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
        Get in Touch
      </h1>
      <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
        For media inquiries, speaking requests, partnerships, or general questions, 
        please fill out the form or contact me directly using the information below.
      </p>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-1">Email</h3>
            <Link className="text-muted-foreground hover:underline" href={`mailto:${email}`}>
              {email}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
