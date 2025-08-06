"use client";

import NotFound from "@/app/not-found";
import { ROLE } from "@/types/role";
import { useSession } from "next-auth/react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  return session?.currentUser.role !== ROLE.ADMIN ? (
    <NotFound />
  ) : (
    <div className="w-full flex items-center justify-center">{children}</div>
  );
};

export default AdminLayout;
