"use client";

import { ROLE } from "@/types/role";
import { useSession } from "next-auth/react";
import AdminNotFound from "./not-found";
import ManageRoomModal from "@/components/modals/manage.room.modal";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  return session?.currentUser.role !== ROLE.ADMIN ? (
    <AdminNotFound />
  ) : (
    <div className="w-full flex items-center justify-center">{children}</div>
  );
};

export default AdminLayout;
