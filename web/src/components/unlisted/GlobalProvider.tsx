'use client';

import { useState, createContext, useContext } from 'react';
import type { ReactElement, ReactNode, SetStateAction, Dispatch } from 'react';

import { create } from 'zustand';
import type { SiteSettings } from 'data/types/siteSettings.types';

export interface GlobalContextType {
  siteSettings?: SiteSettings;
  setSiteSettings: Dispatch<SetStateAction<SiteSettings>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

function useGlobalContext(): GlobalContextType | undefined {
  return useContext(GlobalContext);
}

export interface GlobalProps {
  children: ReactNode;
  siteSettingsData: SiteSettings;
}

const useStore = create(() => ({}));

function useCurrentContext() {
  const local = useGlobalContext() as GlobalContextType;
  const root = useStore();
  return local ?? root;
}

export function useGlobalProvider(): {
  setSiteSettings: Dispatch<SetStateAction<SiteSettings>>;
  siteSettings?: SiteSettings;
} {
  const { siteSettings, setSiteSettings } = useCurrentContext();
  return { siteSettings, setSiteSettings };
}

export default function GlobalProvider({ children, siteSettingsData }: GlobalProps): ReactElement {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(siteSettingsData);
  return (
    <GlobalContext.Provider
      value={{
        setSiteSettings,
        siteSettings,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
