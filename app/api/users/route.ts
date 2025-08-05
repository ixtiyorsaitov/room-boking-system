import bookingModel from "@/database/booking.model";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    const users = await User.find().select("fullName email");

    const usersWithBookingCount = await Promise.all(
      users.map(async (user) => {
        const count = await bookingModel.countDocuments({ user: user._id });

        return {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          bookings: count,
        };
      })
    );

    return NextResponse.json(usersWithBookingCount);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
