import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();
  const SERVER_PASSWORD = process.env.APP_PASSWORD;

  if (password === SERVER_PASSWORD) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
