import UsersContainer from "@/app/components/UsersContainer";
import { redirect } from "next/navigation";
import { getJWTPayload } from "@/app/helpers/auth";

export default async function Followers() {
  const jwtPayload = await getJWTPayload();

  if (!jwtPayload) {
    redirect("/");
  }
  return (
    <main>
      <h2>Followers</h2>
      <UsersContainer endpoint="followers" />
    </main>
  );
}
