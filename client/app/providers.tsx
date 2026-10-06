'use client';

import { HeroUIProvider, ToastProvider } from '@heroui/react';
import StoreProvider from '@/lib/StoreProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <HeroUIProvider>
        <ToastProvider placement="top-center" />
        {children}
      </HeroUIProvider>
    </StoreProvider>
  );
}
