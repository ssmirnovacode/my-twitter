"use client";

import useSWR from "swr";
import CreatePost from "./CreatePost";
import PostContainer from "@/app/components/PostContainer";
import { fetcher } from "@/app/helpers/fetcher";

export default function Profile() {
  const { data, error, isLoading } = useSWR("/api/users/profile", fetcher);

  if (error) return <div>failed to load. Error: {error.msg}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      <h2>Profile</h2>
      <CreatePost />
      <PostContainer username={data.data.username} />
    </main>
  );
}
