"use client";
import Post from "@/app/components/Post";
import Spinner from "@/app/components/Spinner/Spinner";
import { IPost } from "@/app/types";
import useSWR from "swr";

export default function FeedList({ index }: { index: number }) {
  const { data, error, isLoading } = useSWR("/api/posts/feed?page=" + index);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Spinner />;

  return (
    <ul>
      {data.data.map((post: IPost) => {
        return (
          <li key={post.id} className="my-5">
            <Post currentUser="" post={post} />
          </li>
        );
      })}
    </ul>
  );
}
