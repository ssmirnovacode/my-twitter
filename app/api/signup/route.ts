import { sql } from "@/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const json = await req.json();
  const res = await sql(
    "select id, username, password from users where username ilike $1",
    [json.username]
  );

  if (res.rowCount)
    return NextResponse.json({ error: "User already exists" }, { status: 409 });

  const saltRounds = 10;
  const hash = await bcrypt.hash(json.password, saltRounds);

  await sql("insert into users (username, password) values ($1, $2)", [
    json.username,
    hash,
  ]);

  return NextResponse.json({ msg: "Registration completed!" }, { status: 201 });
}
