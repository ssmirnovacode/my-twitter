import { getJWTPayload } from "@/app/helpers/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  // { id: number } - id corresponds to folder slug id

  const jwtPayload = await getJWTPayload();

  const res = await sql("select * from posts where id = $1 and user_id = $2", [
    params.id,
    jwtPayload?.sub,
  ]);

  if (res.rowCount === 0)
    return NextResponse.json({ error: "Not found " }, { status: 404 });

  return NextResponse.json({ data: res.rows[0] });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: number } }
) {
  const body = await req.json();
  const jwtPayload = await getJWTPayload();

  const res = await sql("select * from posts where id = $1 and user_id = $2", [
    params.id,
    jwtPayload?.sub,
  ]);

  if (res.rowCount === 0)
    return NextResponse.json({ error: "Not found " }, { status: 404 });

  await sql("update posts set content = $1 where user_id = $2 and id = $3", [
    body?.content,
    jwtPayload?.sub,
    params.id,
  ]);

  return NextResponse.json({ msg: "update success" }, { status: 201 });
}
