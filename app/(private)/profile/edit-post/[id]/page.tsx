"use client";
import useSWR from "swr";
import EditPost from "./EditPost";
import DeleteButton from "./DeleteButton";
import { fetcher } from "@/app/helpers/fetcher";

export default function EditPostPage({ params }: { params: { id: number } }) {
  const { data, error, isLoading } = useSWR(`/api/posts/${params.id}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit post</h2>
      <div className="flex flex-col gap-5">
        <EditPost prevPost={data.data} />
        <DeleteButton postId={data.data.id} />
      </div>
    </div>
  );
}
