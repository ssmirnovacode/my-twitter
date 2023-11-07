import { getJWTPayload } from "@/app/helpers/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const jwtPayload = await getJWTPayload();

  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const page =
    (searchParams.get("page") && parseInt(searchParams.get("page")!)) || 0;

  const limit = 3;
  const offset = page * limit;

  if (username) {
    // TODO Profile pages of other users
  }

  const res = await sql(
    `select p.*, u.avatar, u.username from posts p 
    inner join users u on p.user_id = u.id 
    where user_id = $1
    order by created_at desc limit $2 offset $3`,
    [jwtPayload?.sub, limit, offset]
  );

  return NextResponse.json({ data: res.rows });
}

export async function POST(req: Request) {
  const body = await req.json();
  const jwtPayload = await getJWTPayload();

  const res = await sql(
    "insert into posts (user_id, content) values ($1, $2) returning *", //  returning * means the post we just created
    [jwtPayload?.sub, body?.content]
  );

  return NextResponse.json({ data: res.rows[0] }, { status: 201 });
}
