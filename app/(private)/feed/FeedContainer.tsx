"use client";
import { useState } from "react";
import FeedList from "./FeedList";

export default function FeedContainer() {
  const [count, setCount] = useState(1); // counts how many times 'load more' button was clicked

  const pages = [];

  for (let i = 0; i < count; i++) {
    pages.push(<FeedList index={i} key={i} />);
  }
  // TODO disable button when no more posts are available
  return (
    <div>
      {pages}
      <div className="flex justify-center">
        <button
          className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg "
          onClick={() => setCount(count + 1)}
        >
          Load more
        </button>
      </div>
    </div>
  );
}
