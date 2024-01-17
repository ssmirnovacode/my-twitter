"use client";
import { useEffect, useRef, useState } from "react";
import FeedList from "./FeedList";

export default function FeedContainer() {
  const [count, setCount] = useState(1); // counts how many times 'load more' button was clicked
  const pages = [];

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setCount(count + 1);
      console.log("scroll", count);
    }
    //window.removeEventListener("scroll", handleScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  for (let i = 0; i < count; i++) {
    pages.push(<FeedList index={i} key={i} />);
  }
  // TODO disable button when no more posts are available
  return (
    <div>
      {pages}
      <div className="flex justify-center">
        {/* <button
          className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg  transition duration-300  dark:hover:bg-slate-700 hover:bg-slate-600"
          onClick={() => setCount(count + 1)}
        >
          Load more
        </button> */}
      </div>
    </div>
  );
}
