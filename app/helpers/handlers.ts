import { sql } from "@/db";
import { getJWTPayload } from "./auth";

export async function fetchProfileData() {
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
