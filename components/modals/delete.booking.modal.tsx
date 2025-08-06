import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useDeleteBooking } from "@/hooks/use-delete-booking";
import { format } from "date-fns";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const DeleteBookingModal = ({
  onDelete,
  loading,
}: {
  onDelete: () => void;
  loading: boolean;
}) => {
  const { open, setOpen, initialBooking, setInitialBooking } =
    useDeleteBooking();

  const roomName = initialBooking?.room?.name || "unknown room";

  return initialBooking ? (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to delete your booking for{" "}
            <span className="font-semibold">{roomName}</span> on{" "}
            <span className="font-semibold">
              {format(new Date(initialBooking.date), "dd-MM-yyyy")}
            </span>
            . <br />
            This action cannot be undone and will permanently remove your
            booking from our system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setInitialBooking(null);
              setOpen(false);
            }}
            disabled={loading}
          >
            Cancel
          </AlertDialogCancel>
          <Button disabled={loading} onClick={onDelete}>
            {loading ? <Loader2 className="animate-spin" /> : <Trash2 />}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) : null;
};

export default DeleteBookingModal;
