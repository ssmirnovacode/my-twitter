"use client";
import Spinner from "@/app/components/Spinner/Spinner";
import { notFound } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
export default function UserPageHeader({ username }: { username: string }) {
  const { mutate } = useSWRConfig();
  const {
    data: dataUser,
    error: errorUser,
    isLoading: isLoadingUser,
  } = useSWR(`/api/users?username=${username}`);

  const {
    data: dataFollow,
    error: errorFollow,
    isLoading: isLoadingFollow,
  } = useSWR(() => `/api/follows?user_id=${dataUser.data.id}`);

  if (errorFollow || errorUser) return <div>Failed to load</div>;
  if (isLoadingFollow || isLoadingUser) return <Spinner />;

  if (!dataUser?.data) {
    notFound(); // Next.js function that takes us to 404 page
  }

  const handleFollow = async () => {
    const res = await fetch("/api/follows", {
      method: "POST",
      body: JSON.stringify({ user_id: dataUser.data.id }),
    });

    if (res.ok) {
      // refetch updated data
      mutate(`/api/follows?user_id=${dataUser.data.id}`);
    }
  };

  const handleUnfollow = async () => {
    const res = await fetch(`/api/follows?id=${dataFollow.data[0].user_id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // refetch updated data
      mutate(`/api/follows?user_id=${dataUser.data.id}`);
    }
  };
  return (
    <header className="w-full bg-slat-800 p-2 rounded-lg flex flew-row justify-between">
      <h2 className="text-lg font-bold">{username}</h2>
      {dataFollow.data.length ? (
        <button
          className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg"
          onClick={handleUnfollow}
        >
          Unfollow
        </button>
      ) : (
        <button
          className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg"
          onClick={handleFollow}
        >
          Follow
        </button>
      )}
    </header>
  );
}
