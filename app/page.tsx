import Post from "@/app/components/Post";
import { sql } from "@/db";
import Link from "next/link";

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
      <h1 className="font-mono text-lg text-center">WHINE·online | Feed</h1>
      <div className="flex items-center flex-col pt-5">
        <Link
          href="/auth"
          className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg w-48 text-center"
        >
          Log in / Register
        </Link>
        <p className="w-96 mt-3">
          Please log in or register to be able to view user profiles and have
          access to more functionality
        </p>
        <div className="flex flex-col items-center mt-5  dark:bg-slate-800 bg-slate-300 max-w-md  rounded-lg my-2 p-5">
          <h2 className="text-lg font-bold">Recent posts from the community</h2>
          <ul>
            {posts?.map((post) => (
              <li key={post.id} className="my-5">
                <Post currentUser="" post={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
