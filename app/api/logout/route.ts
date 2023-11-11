import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const response = NextResponse.json({ msg: "Logout success" });
  response.cookies.delete("jwt");
  return response;
}
