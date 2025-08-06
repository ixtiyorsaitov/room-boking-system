import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { IRoom } from "@/types";
import bookingModel from "@/database/booking.model";
import roomModel from "@/database/room.model";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    await connectToDatabase();
    const { roomId } = await params;
    const room = await roomModel.findById(roomId);
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: room }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    await connectToDatabase();
    const { roomId } = await params;
    const body = await req.json();
    const data = body as IRoom;
    const updatedRoom = await roomModel.findByIdAndUpdate(
      roomId,
      {
        name: data.name,
        capacity: data.capacity,
        price: data.price,
        description: data.description,
      },
      { new: true }
    );
    if (!updatedRoom) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, data: updatedRoom },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    await connectToDatabase();
    const { roomId } = await params;

    await bookingModel.deleteMany({ room: roomId });

    await roomModel.findByIdAndDelete(roomId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE room error:", error);
    return NextResponse.json(
      { success: false, error: "Xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
