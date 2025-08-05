import React from "react";
import LoadingIcon from "../ui/loading";
import { useSession } from "next-auth/react";

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  return status === "loading" ? (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
      <LoadingIcon className="w-15 h-15 fill-primary" />
    </div>
  ) : (
    children
  );
};

export default LoadingProvider;
