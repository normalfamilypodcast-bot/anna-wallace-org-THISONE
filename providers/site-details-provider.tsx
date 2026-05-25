'use client';

import React from 'react';
import { createContext, useContext } from 'react';
import { SiteDetails } from '@/types/contact-details';

type SiteDetailsProviderProps = {
  value: SiteDetails;
  children: React.ReactNode;
};

export const SiteDetailsProvider = ({
  value,
  children,
}: SiteDetailsProviderProps) => (
  <SiteDetailsContext.Provider value={value}>
    {children}
  </SiteDetailsContext.Provider>
);

export const SiteDetailsContext = createContext<SiteDetails>(null);

export const useSiteDetails = () => useContext(SiteDetailsContext);
