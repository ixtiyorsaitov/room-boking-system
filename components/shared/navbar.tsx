"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Building2, Calendar, Home, LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  const authModal = useAuthModal();
  const pathname = usePathname();

  return (
    <div className="w-full flex items-center justify-center py-3 bg-white shadow-sm">
      <div className="w-full max-w-6xl flex items-center justify-between px-4">
        <Link href={"/"} className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold text-gray-800">BookingR</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button
              variant="ghost"
              className={cn(
                "hidden md:flex items-center gap-2",
                pathname === "/" && "bg-muted text-primary"
              )}
            >
              <Home className="h-4 w-4" />
              Rooms
            </Button>
          </Link>

          <Link href="/bookings">
            <Button
              variant="ghost"
              className={cn(
                "hidden md:flex items-center gap-2",
                pathname === "/bookings" && "bg-muted text-primary"
              )}
            >
              <Calendar className="h-4 w-4" />
              Bookings
            </Button>
          </Link>

          {status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.currentUser.profileImage}
                      alt="User Avatar"
                    />
                    <AvatarFallback className="uppercase">
                      {session.currentUser.fullName.split(" ").map((c) => c[0])}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => authModal.setOpen(true)}>Login</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
