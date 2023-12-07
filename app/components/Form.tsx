"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FormEndpoint } from "@/types";
import { SIGNUP } from "@/utils/constants";
import Spinner from "./Spinner/Spinner";

export default function Form({ endpoint }: { endpoint: FormEndpoint }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<undefined | string>("");
  const [password, setPassword] = useState<undefined | string>("");
  const [confirmPassword, setConfirmPassword] = useState<undefined | string>(
    ""
  );

  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    if (endpoint === SIGNUP && password !== confirmPassword) {
      const newErrors = [];
      newErrors.push("Passwords don't match!");
      setErrors(newErrors);
      // const timer = setTimeout(() => setErrors([]), 2000);
      //alert("Passwords don't match!");
      return;
    }

    const res = await fetch(`/api/${endpoint}`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.ok) {
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      // TODO - auto-login on signup
      endpoint === SIGNUP ? router.push("/signin") : router.push("/feed");
    } else {
      // TODO - display errors
      alert("Form submission failed!");
    }
    setLoading(false);
  }

  const CTA = endpoint === SIGNUP ? "Sign up" : "Log in";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-5 max-w-xs w-full dark:bg-slate-800 bg-slate-300 rounded-lg "
    >
      <div className="text-center">
        <h3 className="font-semibold">{CTA}</h3>
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
        {endpoint === SIGNUP && (
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              className="text-black p-3 border border-slate-700 rounded-lg"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button
          className="mt-4 dark:bg-slate-900 bg-slate-400 text-white p-3 rounded-lg w-full flex justify-center gap-3"
          type="submit"
        >
          {CTA}
          {loading && <Spinner />}
        </button>
        {errors.map((err) => (
          <div key={err} className="text-red-600">
            {err}
          </div>
        ))}
      </div>
    </form>
  );
}
