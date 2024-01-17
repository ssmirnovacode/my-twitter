import UsersContainer from "@/app/components/UsersContainer";
import { redirect } from "next/navigation";
import { getJWTPayload } from "@/app/helpers/auth";

export default async function Followers() {
  const jwtPayload = await getJWTPayload();

  if (!jwtPayload) {
    redirect("/auth");
  }
  return (
    <main>
      <UsersContainer endpoint="followers" />
    </main>
  );
}
