import "server-only";
import User from "../components/User";
import { fetchData } from "../helpers/fetchData";
import { fetcher } from "../helpers/fetcher";
import useSWR from "swr";
import { getJWTPayload } from "../helpers/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

async function fetchHeaderData() {
  const jwtPayload = await getJWTPayload();
  // fetch user data
  const res = await sql(
    "select id, username, avatar from users where id = $1",
    [jwtPayload.sub] // sub is 'subject, userId
  );

  if (!res.rowCount) console.log("user not found");
  const user = res.rows[0];
  return user;
}

export default async function Header() {
  const data = await fetchHeaderData();

  if (!data) return <div>Failed to load.</div>;

  return (
    <header className="flex flex-row w-full p-5 bg-slate-800 rounded-lg my-2 justify-between items-center">
      <div>
        <h1 className="font-mono text-lg">TW*TTER</h1>
      </div>
      <div>
        <User user={data} href="account" />
      </div>
    </header>
  );
}
