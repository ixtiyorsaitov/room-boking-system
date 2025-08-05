import { AuthModal } from "@/components/modals/auth";
import Navbar from "@/components/shared/navbar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <Navbar />
      <main className="w-full flex items-center justify-center flex-col">
        <div className="w-[60%]">{children}</div>
      </main>
      <AuthModal />
    </div>
  );
};

export default RootLayout;
