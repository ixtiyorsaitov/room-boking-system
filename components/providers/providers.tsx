"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import LoadingProvider from "./loading.provider";
import QueryProvider from "./query.provider";
import { ThemeProvider } from "./theme.provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>{children}</LoadingProvider>
        </ThemeProvider>
      </QueryProvider>
    </SessionProvider>
  );
}
