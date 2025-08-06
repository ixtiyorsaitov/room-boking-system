import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  useDeleteRoomModal,
  useManageRoomModal,
} from "@/hooks/use-manage-room-modal";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { deleteSchema, roomSchema } from "@/lib/validations";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import { IRoom } from "@/types";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Loader2, Trash2 } from "lucide-react";

const ManageRoomModal = ({
  setList,
}: {
  list: IRoom[];
  setList: Dispatch<SetStateAction<IRoom[]>>;
}) => {
  const manageRoomModal = useManageRoomModal();

  const form = useForm<z.infer<typeof roomSchema>>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: manageRoomModal.initialRoom ? manageRoomModal.initialRoom.name : "",
      capacity: manageRoomModal.initialRoom
        ? String(manageRoomModal.initialRoom.capacity)
        : "1",
      price: manageRoomModal.initialRoom
        ? String(manageRoomModal.initialRoom.price)
        : "",
      description: manageRoomModal.initialRoom
        ? manageRoomModal.initialRoom.description
        : "",
    },
  });

  useEffect(() => {
    if (manageRoomModal.initialRoom) {
      form.reset({
        name: manageRoomModal.initialRoom.name,
        capacity: String(manageRoomModal.initialRoom.capacity),
        price: String(manageRoomModal.initialRoom.price),
        description: manageRoomModal.initialRoom.description,
      });
    } else {
      form.reset({ name: "", capacity: "1", price: "", description: "" });
    }
  }, [manageRoomModal.initialRoom, form]);

  const addRoomMutate = useMutation({
    mutationFn: async (values: z.infer<typeof roomSchema>) => {
      const { data: response } = await api.post("/rooms", {
        ...values,
        price: Number(values.price),
        capacity: Number(values.capacity),
      });
      return response;
    },
    onSuccess: (response) => {
      if (response.success) {
        setList((prev) => [...prev, response.data]);
        manageRoomModal.setInitialRoom(null);
        manageRoomModal.setOpen(false);
        toast.success("Room created successfuly!");
      } else {
        toast.error("Room created successfuly!");
      }
    },
  });
  const updateRoomMutate = useMutation({
    mutationFn: async (values: z.infer<typeof roomSchema>) => {
      const { data: response } = await api.put(
        `/rooms/${manageRoomModal.initialRoom?._id}`,
        {
          ...values,
          price: Number(values.price),
          capacity: Number(values.capacity),
        }
      );
      return response;
    },
    onSuccess: (response) => {
      if (response.success) {
        setList((prev) =>
          prev.map((c) => (c._id === response.data._id ? response.data : c))
        );
        manageRoomModal.setInitialRoom(null);
        manageRoomModal.setOpen(false);
        toast.success("Room updated successfuly!");
      } else {
        toast.error("Room updated successfuly!");
      }
    },
  });

  const onSubmit = (values: z.infer<typeof roomSchema>) => {
    if (manageRoomModal.initialRoom) {
      updateRoomMutate.mutate(values);
    } else {
      addRoomMutate.mutate(values);
      form.reset();
    }
  };

  return (
    <Dialog open={manageRoomModal.open} onOpenChange={manageRoomModal.setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {manageRoomModal.initialRoom ? "Update" : "Add New"} Room
          </DialogTitle>
          <DialogDescription>
            {manageRoomModal.initialRoom ? "Update room" : "Create a new room"}
            with details and pricing.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter room name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter capacity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per night</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter room description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  manageRoomModal.setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Add Room</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageRoomModal;

export const RoomDeleteModal = ({
  setList,
}: {
  list: IRoom[];
  setList: Dispatch<SetStateAction<IRoom[]>>;
}) => {
  const roomDeleteModal = useDeleteRoomModal();

  const form = useForm<z.infer<typeof deleteSchema>>({
    resolver: zodResolver(deleteSchema),
    defaultValues: {
      confirmText: "",
    },
  });
  useEffect(() => {
    if (!open) {
      roomDeleteModal.setInitialRoom(null);
      form.reset(); // Reset form fields and errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomDeleteModal.open, roomDeleteModal.setOpen, form]);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { data: response } = await api.delete(
        `/rooms/${roomDeleteModal.initialRoom?._id}`
      );
      return response;
    },
    onSuccess: async (response) => {
      if (response.success) {
        setList((prev) =>
          prev.filter((c) => c._id !== roomDeleteModal.initialRoom?._id)
        );
        roomDeleteModal.setInitialRoom(null);
        roomDeleteModal.setOpen(false);
        toast.success("Room deleted successfuly!");
      } else {
        toast.error(response.error);
      }
    },
    onError: (error) => {
      toast.error("Error");
      console.error(error);
    },
  });

  function onSubmit() {
    deleteMutation.mutate();
  }
  return roomDeleteModal.initialRoom ? (
    <AlertDialog
      open={roomDeleteModal.open}
      onOpenChange={roomDeleteModal.setOpen}
    >
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {`Are you absolutely sure you want to delete "${roomDeleteModal.initialRoom.name}"?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {`This action cannot be undone. This will permanently delete the room`}
            <span className="font-medium text-foreground">
              {`"${roomDeleteModal.initialRoom.name}"`}
            </span>
            {"and remove its associated data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Alert variant="destructive" className="mb-4">
          <Trash2 className="h-4 w-4" />
          <AlertTitle>Permanent Deletion Warning</AlertTitle>
          <AlertDescription>
            {`Deleting this room is irreversible. All related content, bookings,
            and analytics will be lost forever. Please proceed with caution.`}
          </AlertDescription>
        </Alert>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="confirmText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {`Tasdiqlash uchun, pastga`}
                    <span className="font-bold text-red-500">{"'DELETE'"}</span>
                    {`deb yozing:`}
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      disabled={deleteMutation.isPending}
                      placeholder="Type delete"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-full flex items-center justify-end gap-1">
              <Button
                variant={"secondary"}
                disabled={deleteMutation.isPending}
                type="button"
                onClick={() => {
                  roomDeleteModal.setInitialRoom(null);
                  roomDeleteModal.setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={deleteMutation.isPending}
                type="submit"
                variant={"destructive"}
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash2 />
                )}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  ) : null;
};
