"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import LoadingProvider from "./loading.provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <LoadingProvider>{children}</LoadingProvider>
    </SessionProvider>
  );
}
