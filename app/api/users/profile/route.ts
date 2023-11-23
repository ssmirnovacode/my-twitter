import { getJWTPayload } from "@/app/helpers/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // get currently logged in user
  const jwtPayload = await getJWTPayload();
  // fetch user data
  const res = await sql(
    "select id, username, avatar from users where id = $1",
    [jwtPayload.sub] // sub is 'subject, userId
  );

  if (!res.rowCount)
    return NextResponse.json({ smg: "User not found" }, { status: 404 });
  const user = res.rows[0];
  console.log("user", user);
  return NextResponse.json({ data: user });
}
