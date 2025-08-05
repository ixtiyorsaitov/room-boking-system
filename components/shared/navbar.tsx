import React from "react";
import { Button } from "../ui/button";
import { Building2, Calendar, Home } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-center py-3 bg-white">
      <div className="w-[60%] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold text-elegant">BookingR</h1>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button>
            <Home />
            Rooms
          </Button>
          <Button variant={"ghost"}>
            <Calendar />
            Bookings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
