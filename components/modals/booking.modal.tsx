import { AlertCircle, Calendar, CheckCircle, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { IRoom } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";

interface Props {
  room: IRoom;
  open: boolean;
  loading: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
}

const BookingModal = ({ open, room, loading, setOpen, onCancel }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-elegant text-xl">
            Book {room.name}
          </DialogTitle>
        </DialogHeader>

        {false ? (
          <div className="py-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-elegant mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-muted-foreground">
              Your reservation has been successfully csreated.
            </p>
          </div>
        ) : (
          <form className="space-y-6">
            <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
              <h4 className="font-medium text-elegant">Room Details</h4>
              <p className="text-sm text-muted-foreground">
                Capacity: {room.capacity} people
              </p>
              <p className="text-sm text-luxury font-semibold">
                ${room.price}/night
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerName" className="text-elegant">
                Customer Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="customerName"
                  type="text"
                  placeholder="Enter your name"
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-elegant">
                Booking Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  className="pl-10"
                  disabled={loading}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {false && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Something went wrong</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={loading}
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
