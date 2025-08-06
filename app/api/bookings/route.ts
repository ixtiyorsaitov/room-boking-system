import bookingModel from "@/database/booking.model";
import roomModel from "@/database/room.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const bookings = await bookingModel
      .find()
      .populate({
        path: "user",
        select: "fullName",
      })
      .populate({
        path: "room",
        select: "name capacity price",
      });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.currentUser) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });
    }

    await connectToDatabase();
    const body = await req.json();
    const data = body as { roomId: string; date: string };

    const room = await roomModel.findById(data.roomId);
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const bookingDate = new Date(data.date);

    const existingBooking = await bookingModel
      .findOne({
        room: data.roomId,
        date: bookingDate,
      })
      .populate({
        path: "user",
        select: "fullName",
      });

    if (existingBooking) {
      return NextResponse.json(
        {
          error:
            existingBooking.user._id.toString() ===
            session.currentUser._id.toString()
              ? "You have already booked this date!"
              : `This date has already been booked by ${existingBooking.user.fullName}`,
        },
        { status: 409 }
      );
    }

    const expireAt = new Date(bookingDate);
    expireAt.setDate(expireAt.getDate() + 1);

    const newBooking = await bookingModel.create({
      user: session.currentUser._id,
      room: data.roomId,
      date: bookingDate,
      expireAt: expireAt,
    });

    return NextResponse.json(
      { success: true, data: newBooking },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
