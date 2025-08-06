import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { IRoom } from "@/types";
import bookingModel from "@/database/booking.model";
import roomModel from "@/database/room.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { ROLE } from "@/types/role";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (type === "additionDatas") {
      const rooms = await roomModel.find();

      const roomsWithBookings = await Promise.all(
        rooms.map(async (room) => {
          const bookings = await bookingModel
            .find({ room: room._id })
            .populate("user", "fullName");

          return {
            _id: room._id,
            name: room.name,
            price: room.price,
            capacity: room.capacity,
            description: room.description,
            bookingsCount: bookings.length,
            bookings: bookings.map((booking) => ({
              user: booking.user.fullName,
              date: booking.date,
            })),
          };
        })
      );

      return NextResponse.json(roomsWithBookings);
    } else {
      const rooms = await roomModel.find();
      return NextResponse.json(rooms);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const data = body as IRoom;

    const session = await getServerSession(authOptions);
    if (!session?.currentUser) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });
    }
    if (session.currentUser.role !== ROLE.ADMIN) {
      return NextResponse.json({ error: "Not allowed" }, { status: 405 });
    }

    const newRoom = await roomModel.create({
      name: data.name,
      capacity: data.capacity,
      price: data.price,
      description: data.description,
    });
    return NextResponse.json({ success: true, data: newRoom });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
