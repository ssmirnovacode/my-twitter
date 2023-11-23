import Post from "@/app/components/Post";
import { sql } from "@/db";

async function getData() {
  const res = await sql(
    "select p.*, u.avatar, u.username from posts p inner join users u on p.user_id = u.id order by created_at desc limit 10"
  );
  return res.rows;
}

export default async function PublicFeed() {
  const posts = await getData();

  return (
    <main>
      <h1>TW*TTER | Feed</h1>
      <div>
        <h2>Recent posts from the community</h2>
        {posts?.map((post) => (
          <Post currentUser="" key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
