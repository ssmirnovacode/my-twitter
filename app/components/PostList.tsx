"use client";
import Post from "@/app/components/Post";
import { IPost } from "@/app/types";
import useSWR from "swr";

// TODO unite with FeedList
export default function PostList({
  index,
  username,
}: {
  index: number;
  username: string;
}) {
  const { data, error, isLoading } = useSWR(
    () => `/api/posts?page=${index}&username=${username}`
  );

  if (error) return <div>Failed to load the posts</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data.data.map((post: IPost) => {
        return (
          <li key={post.id} className="my-5">
            <Post post={post} />
          </li>
        );
      })}
    </ul>
  );
}
