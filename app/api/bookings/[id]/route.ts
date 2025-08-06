import bookingModel from "@/database/booking.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.currentUser) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });
    }

    const booking = await bookingModel.findById(id);
    if (!booking) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    if (booking.user.toString() !== session.currentUser._id.toString()) {
      return NextResponse.json({ error: "Not allowed" }, { status: 405 });
    }

    const deleted = await bookingModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true, data: deleted }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
