"use client";
import useSWR from "swr";

export default function Header() {
  const { data, error, isLoading } = useSWR("/api/users/profile");

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  //console.log(data);
  return <header>Hello, {data.data.username}</header>;
}
