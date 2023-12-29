import PostContainer from "@/app/components/PostContainer";
import UserPageHeader from "./UserPageHeader";
import { redirect } from "next/navigation";
import { getJWTPayload } from "@/app/helpers/auth";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const jwtPayload = await getJWTPayload();

  if (!jwtPayload) {
    redirect("/auth");
  }
  return (
    <div>
      <header>
        <UserPageHeader username={params.username} />
        <PostContainer username={params.username} />
      </header>
    </div>
  );
}
