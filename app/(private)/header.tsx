//import "server-only";
//"use client";
import User from "../components/User";
import { fetchData } from "../helpers/fetchData";
import { fetcher } from "../helpers/fetcher";
import useSWR from "swr";

export default async function Header() {
  const { data, error, loading } = await fetchData("/api/users/profile");
  // const {
  //   data,
  //   error,
  //   isLoading: loading,
  // } = useSWR("/api/users/profile", fetcher);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load.</div>;

  return (
    <header className="flex flex-row w-full p-5 bg-slate-800 rounded-lg my-2 justify-between items-center">
      <div>
        <h1 className="font-mono text-lg">TW*TTER</h1>
      </div>
      <div>
        <User user={data} href="account" />
      </div>
    </header>
  );
}
