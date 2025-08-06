"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/axios";
import { IBooking } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Building2, Calendar, Clock, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const BookingsPage = () => {
  const { isPending, data } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data: response } = await api.get<IBooking[]>("/bookings");
      console.log(response);

      return response;
    },
  });

  return (
    <div className="space-y-8 mt-3">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Calendar className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-elegant">Bookings</h1>
        </div>
        {isPending ? (
          <div className="w-full flex items-center justify-center">
            <Skeleton className="w-1/5 h-3" />
          </div>
        ) : data ? (
          <p className="text-lg text-muted-foreground">
            {data.length > 0
              ? `You have ${data?.length} booking${true ? "s" : ""}`
              : "No bookings yet. Start by browsing our available rooms!"}
          </p>
        ) : null}
      </div>

      {false ? (
        <div className="text-center py-16">
          <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-elegant mb-2">
            No bookings found
          </h3>
          <p className="text-muted-foreground mb-6">
            Ready to plan your stay? Browse our beautiful rooms and make your
            first reservation.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
          >
            <Building2 className="h-4 w-4" />
            View Available Rooms
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isPending ? (
            <BookingCardSkeleton />
          ) : data ? (
            data.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))
          ) : null}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;

function BookingCard({ booking }: { booking: IBooking }) {
  const { data: session } = useSession();
  return (
    <Card
      key={booking._id}
      className="h-full flex flex-col justify-between transition-all duration-200 hover:shadow-[var(--shadow-elegant)]"
    >
      <div className="flex-1">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg text-elegant line-clamp-2">
              {booking.room.name}
            </CardTitle>
            {session?.currentUser._id === booking.user._id && (
              <Badge variant="destructive" className="cursor-pointer">
                Cancel
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span className="text-sm font-medium">
              {booking.user.fullName}

              {booking.user._id === session?.currentUser._id && (
                <span className="text-muted-foreground">(You)</span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 text-luxury font-semibold">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">15-05-2025</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-xs">Booked 12-05-2025</span>
          </div>
        </CardContent>
      </div>

      <div className="px-6 pt-2 pb-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Capacity: {booking.room.capacity} people • ${booking.room.price}/night
        </p>
      </div>
    </Card>
  );
}

function BookingCardSkeleton({ count = 6 }: { count?: number }) {
  return Array.from({ length: count }).map((_, i) => (
    <Card
      key={i}
      className="h-full flex flex-col justify-between transition-all duration-200 hover:shadow-[var(--shadow-elegant)]"
    >
      <div className="flex-1">
        <CardHeader>
          <div className="flex justify-between items-start">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-2/5" />
          </div>
        </CardContent>
      </div>
      <div className="px-6 pt-2 pb-4 border-t border-border">
        <Skeleton className="h-4 w-full" />
      </div>
    </Card>
  ));
}
