"use client";
import Link from "next/link";
import { useState } from "react";
import Spinner from "./Spinner/Spinner";

export default function Auth() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => setLoading(true);
  return (
    <>
      <Link
        href="/signin"
        className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg w-48 text-center flex justify-center gap-2"
        onClick={handleClick}
      >
        Log in / Register {loading && <Spinner />}
      </Link>
      <p className="w-96 mt-3">
        Please log in or register to be able to view user profiles and have
        access to more functionality
      </p>
    </>
  );
}
