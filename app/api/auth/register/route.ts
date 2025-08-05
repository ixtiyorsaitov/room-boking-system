import { connectToDatabase } from "@/lib/mongoose";
import User from "@/database/user.model";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { fullName, email, password } = body;

  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists." },
      { status: 400 }
    );
  }

  const hashedPassword = await hash(password, 10);

  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
    profileImage: "",
  });

  return NextResponse.json({ success: true, user: newUser, });
}
