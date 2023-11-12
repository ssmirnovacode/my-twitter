import { getJWTPayload } from "@/app/helpers/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

// /api/follows?
// Determines whether the currently logged in user follows a specific user
export async function GET(req: Request) {
  // get currently logged in user
  const jwtPayload = await getJWTPayload();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");

  if (!userId)
    return NextResponse.json(
      { error: "user_id query param required" },
      { status: 400 }
    );

  const res = await sql(
    `select * from follows where user_id = $1 and follower_id = $2 `,
    [userId, jwtPayload.sub]
  );

  return NextResponse.json({ data: res.rows });
}
