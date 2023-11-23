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
    <main className="my-5 p-2 text-black dark:text-white">
      <h1 className="font-mono text-lg">TW*TTER | Feed</h1>
      <div>
        <h2 className="text-lg font-bold">Recent posts from the community</h2>
        <ul>
          {posts?.map((post) => (
            <li key={post.id} className="my-5">
              <Post currentUser="" post={post} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
