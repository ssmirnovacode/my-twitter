"use client";
import useSWR from "swr";

const fetcher = async (url: RequestInfo | URL) => {
  const res = await fetch(url);
  if (!res.ok) {
    const info = await res.json();
    const error = new Error("An error occured while fetching data");
    console.error(error);
    throw error;
  }
  return await res.json();
};

export default function Header() {
  const { data, error, isLoading } = useSWR("/api/users/profile", fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log(data);
  return <header>Header</header>;
}
