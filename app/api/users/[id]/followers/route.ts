import { getPageNumber } from "@/app/helpers/utils";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const page = getPageNumber(searchParams);
  const limit = 5;
  const offset = page * limit;
  const { id } = params;
  const res = await sql(
    `select u.id, u.username, u.avatar 
    from users u inner join follows f on u.id = f.follower_id
    where user_id = $1 limit $2 offset $3`,
    [id, limit, offset]
  );

  return NextResponse.json({ data: res.rows });
}
