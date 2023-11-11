"use client";
import { useState } from "react";
import FollowingList from "./FollowingList";

export default function FollowingContainer() {
  const [count, setCount] = useState(1); // counts how many times 'load more' button was clicked

  const pages = [];

  for (let i = 0; i < count; i++) {
    pages.push(<FollowingList index={i} key={i} />);
  }
  return (
    <div>
      {pages}
      <div className="flex justify-center">
        <button
          className="bg-slate-900 p-2 rounded-lg "
          onClick={() => setCount(count + 1)}
        >
          Load more
        </button>
      </div>
    </div>
  );
}
