import { connectToDatabase } from "@/lib/mongoose";
import Room from "@/database/room.model";
import { NextRequest, NextResponse } from "next/server";
import { IRoom } from "@/types";

export async function GET() {
  try {
    await connectToDatabase();
    const rooms = await Room.find();
    return NextResponse.json(rooms);
  } catch (error) {
    console.error(error);
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
