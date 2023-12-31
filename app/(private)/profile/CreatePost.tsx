"use client";

import { FormEvent, useState } from "react";
import { useSWRConfig } from "swr";

export default function CreatePost() {
  const { mutate } = useSWRConfig();
  const [post, setPost] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="bg-white text-black p-2 rounded-lg w-full my-2"
        placeholder="What's the drama this time?"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg"
      >
        Let everyone know
      </button>
    </form>
  );
}
