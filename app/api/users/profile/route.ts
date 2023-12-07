import { getJWTPayload } from "@/app/helpers/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // get currently logged in user
  const jwtPayload = await getJWTPayload();
  if (!jwtPayload)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  // fetch user data
  const res = await sql(
    "select id, username, avatar from users where id = $1",
    [jwtPayload.sub] // sub is 'subject, userId
  );
  const user = res.rows[0];
  return NextResponse.json({ data: user });
}
