import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MockRooms } from "@/lib/constants";
import { Building2, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

const BookingsPage = () => {
  return (
    <div className="space-y-8 mt-3">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Calendar className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-elegant">Your Bookings</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          {true
            ? `You have 4 booking${true ? "s" : ""}`
            : "No bookings yet. Start by browsing our available rooms!"}
        </p>
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
          {MockRooms.map((booking) => (
            <Card
              key={booking._id}
              className="h-full flex flex-col justify-between transition-all duration-200 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="flex-1">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-elegant line-clamp-2">
                      {booking.name}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-success/10 text-success border-success/20"
                    >
                      Confirmed
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Ixtiyor</span>
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
                  Capacity: 5 people • $228/night
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
