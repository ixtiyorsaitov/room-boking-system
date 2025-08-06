import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { IBooking } from "@/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const BookingsList = () => {
  const { data, isPending } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data: response } = await api.get<IBooking[]>("/bookings");
      return response;
    },
  });
  return (
    <TabsContent value="bookings" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
          <CardDescription>View all room bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Booking Date</TableHead>
                {/* <TableHead>Status</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending ? (
                <BookingsListSkeleton />
              ) : data ? (
                data.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell className="font-medium">
                      {booking.user.fullName}
                    </TableCell>
                    <TableCell>{booking.room.name}</TableCell>
                    <TableCell>
                      {format(new Date(booking.date), "dd-MM-yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(booking.createdAt), "dd-MM-yyyy")}
                    </TableCell>
                    {/* <TableCell>
                      <Badge variant="default">Confirmed</Badge>
                    </TableCell> */}
                  </TableRow>
                ))
              ) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default BookingsList;

export function BookingsListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="font-medium">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </TableCell>
          <TableCell>
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </TableCell>
          <TableCell>
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </TableCell>
          <TableCell>
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
