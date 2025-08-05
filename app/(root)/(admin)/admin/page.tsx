"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Calendar, Users } from "lucide-react";
import { MockRooms } from "@/lib/constants";
import UsersList from "../_components/users-list";
import BookingsList from "../_components/bookings-list";
import Overview from "../_components/overview";
import { useState } from "react";
import { IRoom } from "@/types";
import ManageRoomModal from "@/components/modals/manage.room.modal";
import RoomsList from "../_components/rooms-list";

const AdminPage = () => {
  return (
    <div className="space-y-8 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-elegant">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage rooms, users, and bookings
          </p>
        </div>
      </div>

      <Tabs defaultValue="rooms" className="space-y-6 w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rooms" className="gap-2">
            <Building className="h-4 w-4" />
            Rooms
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="bookings" className="gap-2">
            <Calendar className="h-4 w-4" />
            Bookings
          </TabsTrigger>
          {/* <TabsTrigger value="overview" className="gap-2">
            Overview
          </TabsTrigger> */}
        </TabsList>
        <RoomsList />
        <UsersList />
        <BookingsList />
        {/* <Overview /> */}
      </Tabs>
    </div>
  );
};

export default AdminPage;
