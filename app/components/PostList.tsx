"use client";
import Post from "@/app/components/Post";
import { IPost } from "@/app/types";
import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

// TODO unite with FeedList
export default function PostList({
  index,
  username,
}: {
  index: number;
  username: string;
}) {
  const { data, error, isLoading } = useSWR(
    () => `/api/posts?page=${index}&username=${username}`,
    fetcher
  );
  const {
    data: user,
    error: userError,
    isLoading: isLoadingUser,
  } = useSWR("/api/users/profile", fetcher);

  if (error) return <div>Failed to load the posts</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data.data.map((post: IPost) => {
        return (
          <li key={post.id} className="my-5">
            <Post currentUser={user.data.username} post={post} />
          </li>
        );
      })}
    </ul>
  );
}
