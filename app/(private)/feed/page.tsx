import { getJWTPayload } from "@/app/helpers/auth";
import FeedContainer from "./FeedContainer";
import { redirect } from "next/navigation";

export default async function Feed() {
  const jwtPayload = await getJWTPayload();

  if (!jwtPayload) {
    redirect("/auth");
  }

  return (
    <div>
      <FeedContainer />
    </div>
  );
}
