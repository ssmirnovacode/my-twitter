"use client";
import { useState } from "react";
import UsersList from "./UsersList";

export default function UsersContainer({ endpoint }: { endpoint: string }) {
  const [count, setCount] = useState(1); // counts how many times 'load more' button was clicked

  const pages = [];

  for (let i = 0; i < count; i++) {
    pages.push(<UsersList endpoint={endpoint} index={i} key={i} />);
  }
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
