import { getJWTPayload } from "@/app/helpers/auth";
import { getPageNumber } from "@/app/helpers/utils";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = getPageNumber(searchParams);
  const limit = 10;
  const offset = page * limit;
  const jwtPayload = await getJWTPayload(); // to know the current user
  if (!jwtPayload)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const res = await sql(
    `select p.*, u.username, u.avatar from posts p 
    inner join users u on p.user_id = u.id 
    where user_id in (select user_id from follows where follower_id = $1) 
    order by created_at desc limit $2 offset $3`,
    [jwtPayload.sub, limit, offset]
  );

  return NextResponse.json({ data: res.rows });
}
