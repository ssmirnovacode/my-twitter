import Post from "@/app/components/Post";
import { sql } from "@/db";
import Auth from "./components/Auth";
import ThemeButton from "./components/ThemeButton";

async function getData() {
  const res = await sql(
    "select p.*, u.avatar, u.username from posts p inner join users u on p.user_id = u.id order by created_at desc limit 10"
  );
  return res.rows;
}

export default async function PublicFeed() {
  const posts = await getData();

  return (
    <main className="my-2 p-2 text-black dark:text-white">
      <h1 className="font-mono text-lg text-center">WHINE·online | Feed</h1>
      {/* <ThemeButton /> */}
      <div className="flex items-center flex-col pt-5">
        <Auth />
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
