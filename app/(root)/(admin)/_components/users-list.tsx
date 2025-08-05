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
import api from "@/lib/axios";
import { IUser } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const UsersList = () => {
  const { data, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data: response } = await api.get<IUser[]>("/users");
      return response;
    },
  });
  return (
    <TabsContent value="users" className="space-y-6 w-full">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage all users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Bookings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending ? (
                <UserListSkeleton />
              ) : (
                data?.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">
                      {user.fullName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.bookings}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default UsersList;

export const UserListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="font-medium">
            <Skeleton className="h-4 w-[180px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[200px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[60px]" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
