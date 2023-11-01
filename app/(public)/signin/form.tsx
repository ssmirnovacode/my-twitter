"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Form() {
  const router = useRouter();

  const [username, setUsername] = useState<undefined | string>("");
  const [password, setPassword] = useState<undefined | string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (res.ok) router.push("/feed");
    else alert("log in failed!");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg"
    >
      <div className="text-center">
        <h3 className="font-semibold">Sign in form</h3>
      </div>
      <div className="my-3">
        <hr />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            className="text-black p-3 border border-slate-700 rounded-lg"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="text-black p-3 border border-slate-700 rounded-lg"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="mt-4 bg-slate-900 text-white p-3 rounded-lg w-full"
          type="submit"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
