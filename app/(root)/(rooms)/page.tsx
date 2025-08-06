"use client";

import RoomCard from "@/components/core/room-card";
import BookingModal from "@/components/modals/booking.modal";
import api from "@/lib/axios";
import { MockRooms } from "@/lib/constants";
import { bookingSchema } from "@/lib/validations";
import { IRoom } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Building2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

const BookingsPage = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const handleBook = (room: IRoom) => {
    setSelectedRoom(room);
    setBookingModalOpen(true);
  };

  const handleCancel = () => {
    setSelectedRoom(null);
    setBookingModalOpen(false);
    setBookingSuccess(false);
  };

  const addBookingMutate = useMutation({
    mutationFn: async (values: z.infer<typeof bookingSchema>) => {
      const { data: response } = await api.post("/bookings", {
        ...values,
        roomId: selectedRoom?._id,
      });
      console.log(response);

      return response;
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Room booked successfuly!");
        setBookingSuccess(true);
      } else {
        toast.error(response.error);
      }
    },
    onError: (error) => {
      toast.error("Error with booking room");
      console.log(error);
    },
  });

  const handleBookingSubmit = (values: z.infer<typeof bookingSchema>) => {
    if (selectedRoom) {
      addBookingMutate.mutate(values);
    }
  };

  const { isPending } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const { data: response } = await api.get("/rooms");
      setRooms(response);
      console.log(response);

      return response;
    },
  });

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
        {isPending ? (
          <>Loading...</>
        ) : (
          rooms.map((room) => (
            <RoomCard onBook={handleBook} key={room._id} room={room} />
          ))
        )}
      </div>

      {selectedRoom && (
        <BookingModal
          success={bookingSuccess}
          room={selectedRoom}
          open={bookingModalOpen}
          loading={addBookingMutate.isPending}
          setOpen={setBookingModalOpen}
          onSubmit={handleBookingSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default BookingsPage;
