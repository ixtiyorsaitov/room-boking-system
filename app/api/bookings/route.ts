import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
  } catch (error) {
    console.error(error);
  }
}
