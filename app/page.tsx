"use client";
import Link from "next/link";
import { useState } from "react";
import Spinner from "./components/Spinner/Spinner";

export default function Home() {
  const [loading, setLoading] = useState<undefined | "login" | "signup">();
  return (
    <main className="flex min-h-screen items-center justify-center text-black dark:text-white">
      <div className="flex flex-col gap-2 p-5 max-w-xs w-full dark:bg-slate-800 bg-slate-300">
        <div className="text-center my-4">
          <h1>WHINE·online</h1>
        </div>
        <div onClick={() => setLoading("login")}>
          <Link href="/signin" className="link justify-center gap-3">
            Sign in
            {loading === "login" && <Spinner />}
          </Link>{" "}
        </div>
        <div onClick={() => setLoading("signup")}>
          <Link href="/signup" className="link justify-center gap-3">
            Sign up
            {loading === "signup" && <Spinner />}
          </Link>{" "}
        </div>
      </div>
    </main>
  );
}
