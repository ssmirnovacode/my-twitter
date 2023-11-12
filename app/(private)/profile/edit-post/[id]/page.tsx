"use client";
import useSWR from "swr";
import EditPost from "./EditPost";

export default function EditPostPage({ params }: { params: { id: number } }) {
  const { data, error, isLoading } = useSWR(`/api/posts/${params.id}`);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit post</h2>
      <div className="flex flex-col gap-10">
        <EditPost prevPost={data.data} />
        {/* <DeleteButton /> */}
      </div>
    </div>
  );
}
