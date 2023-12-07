"use client";

import useSWR from "swr";
import CreatePost from "./CreatePost";
import PostContainer from "@/app/components/PostContainer";
import Spinner from "@/app/components/Spinner/Spinner";

export default function Profile() {
  const { data, error, isLoading } = useSWR("/api/users/profile");

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Spinner />;

  return (
    <main>
      <h2>Profile</h2>
      <CreatePost />
      <PostContainer username={data.data.username} />
    </main>
  );
}
