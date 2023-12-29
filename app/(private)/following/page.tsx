import UsersContainer from "@/app/components/UsersContainer";
import { redirect } from "next/navigation";
import { getJWTPayload } from "@/app/helpers/auth";

export default async function Following() {
  const jwtPayload = await getJWTPayload();

  if (!jwtPayload) {
    redirect("/auth");
  }
  return (
    <main>
      <h2>Following</h2>
      <UsersContainer endpoint="following" />
    </main>
  );
}
