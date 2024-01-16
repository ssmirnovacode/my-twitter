"use client";

import { FormEvent, useState } from "react";
import { useSWRConfig } from "swr";

export default function CreatePost() {
  const { mutate } = useSWRConfig();
  const [post, setPost] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!post) {
      setError("You are trying to submit an empty post");
      return;
    }

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
    if (res.status !== 201) {
      setError("Failed to create the post");
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
      <div className="text-red-600 my-2">{error}</div>
      <button
        type="submit"
        disabled={!post}
        className={
          post
            ? "dark:bg-slate-900 bg-slate-400  transition duration-300  dark:hover:bg-slate-700 hover:bg-slate-600 p-2 rounded-lg"
            : "dark:bg-slate-400 bg-slate-200 p-2 rounded-lg"
        }
      >
        Let everyone know
      </button>
    </form>
  );
}
