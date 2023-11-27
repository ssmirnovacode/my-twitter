import "server-only";
import CreatePost from "./CreatePost";
import PostContainer from "@/app/components/PostContainer";
import { fetchProfileData } from "@/app/helpers/handlers";

export default async function Profile() {
  const data = await fetchProfileData();

  if (!data) return <div>failed to load.</div>;

  return (
    <main>
      <h2>Profile</h2>
      <CreatePost />
      <PostContainer username={data.username} />
    </main>
  );
}
