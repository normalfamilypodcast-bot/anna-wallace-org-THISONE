'use client';

import React from 'react';
import { createContext, useContext } from 'react';
import { ContactDetails } from '@/types/contact-details';

type ContactDetailsProviderProps = {
  value: ContactDetails;
  children: React.ReactNode;
};

export const ContactDetailsProvider = ({
  value,
  children,
}: ContactDetailsProviderProps) => (
  <ContactDetailsContext.Provider value={value}>
    {children}
  </ContactDetailsContext.Provider>
);

export const ContactDetailsContext = createContext<ContactDetails>(null);

export const useContactDetails = () => useContext(ContactDetailsContext);
