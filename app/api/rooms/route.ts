import { connectToDatabase } from "@/lib/mongoose";
import Room from "@/database/room.model";
import { NextRequest, NextResponse } from "next/server";
import { IRoom } from "@/types";
import bookingModel from "@/database/booking.model";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (type === "additionDatas") {
      const rooms = await Room.find(); // All rooms

      const roomsWithBookings = await Promise.all(
        rooms.map(async (room) => {
          const bookings = await bookingModel
            .find({ room: room._id })
            .populate("user", "fullName"); // get user's name

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
      const rooms = await Room.find();
      return NextResponse.json(rooms);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const data = body as IRoom;

    const newRoom = await Room.create({
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
