import { sql } from "@/db";
import { NextResponse } from "next/server";

// GET /api/users?username=foo
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username)
    return NextResponse.json(
      { error: "Username query param required" },
      { status: 400 }
    );

  const res = await sql(
    `select id, username, avatar from users where username ilike $1`, // we use ILIKE because it's case-insensitive
    [username]
  );

  return NextResponse.json({ data: res.rows[0] });
}
