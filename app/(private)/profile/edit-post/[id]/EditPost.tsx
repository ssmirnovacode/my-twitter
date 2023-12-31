"use client";

import { IPost } from "@/app/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useSWRConfig } from "swr";

export default function EditPost({ prevPost }: { prevPost: IPost }) {
  const { mutate } = useSWRConfig();
  const [post, setPost] = useState(prevPost.content);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/posts/${prevPost.id}`, {
      method: "PATCH",
      body: JSON.stringify({ content: post }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (res.ok) {
      setPost("");
      // SWR will automatically re-fetch the updated data and update the view where needed
      // key is the string of request (Network tab)
      mutate((key) => typeof key === "string" && key.startsWith("/api/posts"));
      router.push("/profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="bg-white text-black p-2 rounded-lg w-full my-2"
        placeholder="What was that drama again??"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg"
      >
        Take your words back
      </button>
    </form>
  );
}
