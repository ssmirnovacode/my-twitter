import { getJWTPayload } from "@/app/helpers/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  // { id: number } - id corresponds to folder slug id

  const jwtPayload = await getJWTPayload();
  if (!jwtPayload)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const res = await sql("select * from posts where id = $1 and user_id = $2", [
    params.id,
    jwtPayload.sub,
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
  if (!jwtPayload)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  // TODO add checking if author === current logged in user

  const res = await sql("select * from posts where id = $1 and user_id = $2", [
    params.id,
    jwtPayload.sub,
  ]);

  if (res.rowCount === 0)
    return NextResponse.json({ error: "Not found " }, { status: 404 });

  await sql("update posts set content = $1 where user_id = $2 and id = $3", [
    body?.content,
    jwtPayload.sub,
    params.id,
  ]);

  return NextResponse.json({ msg: "update success" }, { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
  const jwtPayload = await getJWTPayload();
  if (!jwtPayload)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const res = await sql("delete from posts where id = $1 and user_id = $2", [
    params.id,
    jwtPayload.sub,
  ]);

  if (res.rowCount === 1)
    return NextResponse.json({ msg: "delete success" }, { status: 200 });

  return NextResponse.json({ error: "Not found " }, { status: 404 });
}
