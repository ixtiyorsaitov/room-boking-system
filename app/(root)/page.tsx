"use client";

import RoomCard from "@/components/core/room-card";
import BookingModal from "@/components/modals/booking.modal";
import { MockRooms } from "@/lib/constants";
import { IRoom } from "@/types";
import { Building2 } from "lucide-react";
import { useState } from "react";

const BookingsPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const handleBook = (room: IRoom) => {
    setSelectedRoom(room);
    setBookingModalOpen(true);
  };

  const handleCancel = () => {
    setSelectedRoom(null);
    setBookingModalOpen(false);
  };

  return (
    <div className="space-y-8 mt-3">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Building2 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-elegant">Available Rooms</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our premium collection of rooms and suites, each designed for
          comfort and luxury
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MockRooms.map((room) => (
          <RoomCard onBook={handleBook} key={room._id} room={room} />
        ))}
      </div>

      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onCancel={handleCancel}
          loading={loading}
          open={bookingModalOpen}
          setOpen={setBookingModalOpen}
        />
      )}
    </div>
  );
};

export default BookingsPage;
