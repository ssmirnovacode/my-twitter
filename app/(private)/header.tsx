"use client";
import useSWR from "swr";
import User from "../components/User";
import Spinner from "../components/Spinner/Spinner";

export default function Header() {
  const { data, error, isLoading } = useSWR("/api/users/profile");

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Spinner />;

  //console.log(data);
  return (
    <header className="flex flex-row w-full p-5 dark:bg-slate-800 bg-slate-300 rounded-lg my-2 justify-between items-center">
      <div>
        <h1 className="font-mono text-lg">WHINE·online</h1>
      </div>
      <div>
        <User user={data.data} href="account" />
      </div>
    </header>
  );
}
