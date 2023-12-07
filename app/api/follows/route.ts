import { getJWTPayload } from "@/app/helpers/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

// /api/follows?user_id=123
// Determines whether the currently logged in user follows a specific user
export async function GET(req: Request) {
  // get currently logged in user
  const jwtPayload = await getJWTPayload();
  if (!jwtPayload)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
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

// to follow a user
//
export async function POST(req: Request) {
  const jwtPayload = await getJWTPayload();
  if (!jwtPayload)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  const body = await req.json();

  const checkIfAlreadyFollows = await sql(
    `select * from follows where user_id = $1 and follower_id = $2 `,
    [body.user_id, jwtPayload.sub]
  );

  if (checkIfAlreadyFollows.rowCount > 1)
    return NextResponse.json(
      { error: "Already following this user" },
      { status: 409 }
    );

  await sql(`insert into follows (user_id, follower_id) values ($1, $2)`, [
    body.user_id,
    jwtPayload.sub,
  ]);

  return NextResponse.json({ msg: "Started following successfully" });
}

// unfollow a user
// /api/follows?id=123
export async function DELETE(req: Request) {
  const jwtPayload = await getJWTPayload();
  if (!jwtPayload)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const idToUnfollow = searchParams.get("id");

  const checkIfFollows = await sql(
    `select * from follows where user_id = $1 and follower_id = $2 `,
    [idToUnfollow, jwtPayload.sub]
  );

  if (!checkIfFollows.rowCount)
    return NextResponse.json(
      { error: "Not following this user already" },
      { status: 409 }
    );

  const res = await sql(
    `delete from follows where user_id = $1 and follower_id = $2`,
    [idToUnfollow, jwtPayload.sub]
  );

  if (res.rowCount === 1)
    return NextResponse.json({ msg: "delete success" }, { status: 200 });

  return NextResponse.json({ error: "Not found " }, { status: 404 });
}
