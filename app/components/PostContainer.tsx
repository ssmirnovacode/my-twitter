"use client";

import { useState } from "react";
import PostList from "./PostList";

export default function PostContainer({ username }: { username: string }) {
  const [count, setCount] = useState(1);

  const pages = [];

  for (let i = 0; i < count; i++) {
    pages.push(<PostList index={i} username={username} key={i} />);
  }

  return (
    <div className="my-5">
      {pages}
      <div className="flex flex-row justify-center">
        <button
          className="my-5 bg-slate-900 p-2 rounded-lg "
          onClick={() => setCount(count + 1)}
        >
          Load more
        </button>
      </div>
    </div>
  );
}
