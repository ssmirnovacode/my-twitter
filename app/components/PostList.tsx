"use client";
import Post from "@/app/components/Post";
import { IPost } from "@/app/types";
import useSWR from "swr";
import Spinner from "./Spinner/Spinner";

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
  const {
    data: user,
    error: userError,
    isLoading: isLoadingUser,
  } = useSWR("/api/users/profile");

  if (error) return <div>Failed to load the posts</div>;
  if (isLoading) return <Spinner />;

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
