import ManageRoomModal, {
  RoomDeleteModal,
} from "@/components/modals/manage.room.modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import {
  useDeleteRoomModal,
  useManageRoomModal,
} from "@/hooks/use-manage-room-modal";
import api from "@/lib/axios";
import { IRoom } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";

const RoomsList = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const manageRoomModal = useManageRoomModal();
  const deleteRoomModal = useDeleteRoomModal();

  const { isPending } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const { data: res } = await api.get("/rooms");
      setRooms(res);
      return res;
    },
  });

  return (
    <>
      <TabsContent value="rooms" className="space-y-6 w-full">
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <div>
                <CardTitle>Room Management</CardTitle>
                <CardDescription>Add, edit, and delete rooms</CardDescription>
              </div>
              <Button
                onClick={() => {
                  manageRoomModal.setInitialRoom(null);
                  manageRoomModal.setOpen(true);
                }}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Room
              </Button>
            </div>
          </CardHeader>
          <CardContent className="w-full">
            <Table className="w-full">
              <TableHeader className="w-full">
                <TableRow className="w-full">
                  <TableHead>Name</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full">
                {isPending ? (
                  <RoomListSkeleton />
                ) : (
                  rooms.map((room) => (
                    <TableRow key={room._id}>
                      <TableCell className="font-medium">{room.name}</TableCell>
                      <TableCell>{room.capacity} guests</TableCell>
                      <TableCell>${room.price}/night</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {room.description}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              manageRoomModal.setInitialRoom(room);
                              manageRoomModal.setOpen(true);
                            }}
                            className="gap-1"
                          >
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              deleteRoomModal.setInitialRoom(room);
                              deleteRoomModal.setOpen(true);
                            }}
                            className="gap-1"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <ManageRoomModal list={rooms} setList={setRooms} />
      <RoomDeleteModal list={rooms} setList={setRooms} />
    </>
  );
};

export default RoomsList;

export const RoomListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="font-medium">
            <Skeleton className="h-4 w-[150px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[80px]" />
          </TableCell>
          <TableCell className="max-w-xs truncate">
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-[70px]" />
              <Skeleton className="h-8 w-[70px]" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
