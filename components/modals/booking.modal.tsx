"use client";

import { Calendar, CheckCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IRoom } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { bookingSchema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  room: IRoom;
  open: boolean;
  success: boolean;
  loading: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  onSubmit: (data: z.infer<typeof bookingSchema>) => void;
}

const BookingModal = ({
  open,
  room,
  loading,
  setOpen,
  onCancel,
  onSubmit,
  success,
}: Props) => {
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof bookingSchema>) => {
    onSubmit(values);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-elegant text-xl">
            Book {room.name}
          </AlertDialogTitle>
        </AlertDialogHeader>

        {success ? (
          <div className="pt-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-elegant mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-muted-foreground">
              Your reservation has been successfully created.
            </p>
            <Button
              onClick={onCancel}
              className="bg-green-500 hover:bg-green-600 w-full mt-3"
            >
              OK
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                <h4 className="font-medium text-elegant">Room Details</h4>
                <p className="text-sm text-muted-foreground">
                  Capacity: {room.capacity} people
                </p>
                <p className="text-sm text-luxury font-semibold">
                  ${room.price}/night
                </p>
              </div>

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-elegant">Booking Date</FormLabel>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          type="date"
                          className="pl-10"
                          disabled={loading}
                          min={new Date().toISOString().split("T")[0]}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* {true && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Nimadir xato ketdi
                  </AlertDescription>
                </Alert>
              )} */}

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
          </Form>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BookingModal;
