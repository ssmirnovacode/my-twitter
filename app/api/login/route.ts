import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const json = await req.json();
  const res = await sql(
    "select id, username, password from users where username ilike $1",
    [json.username]
  );
  return NextResponse.json({ data: res.rows[0] });
}
