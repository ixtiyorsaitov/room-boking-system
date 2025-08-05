"use client";

import { AuthModal } from "@/components/modals/auth";
import Navbar from "@/components/shared/navbar";
import { useSession } from "next-auth/react";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  return (
    <div className="w-full">
      <Navbar />
      <main className="w-full flex items-center justify-center flex-col">
        <div className="w-[70%]">{children}</div>
      </main>
      {status === "unauthenticated" && <AuthModal />}
    </div>
  );
};

export default RootLayout;
