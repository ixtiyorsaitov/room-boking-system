import { connectToDatabase } from "@/lib/mongoose";
import User from "@/database/user.model";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return NextResponse.json({ error: "User not found." }, { status: 400 });
  }

  const isPasswordMatch = await compare(password, existingUser.password);
  if (!isPasswordMatch) {
    return NextResponse.json({ error: "Invalid password." }, { status: 400 });
  }

  return NextResponse.json({ success: true, user: existingUser });
}
