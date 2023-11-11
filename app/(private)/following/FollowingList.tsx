"use client";
import User from "@/app/components/User";
import { IUser } from "@/app/types";
import useSWR from "swr";

export default function FollowingList({ index }: { index: number }) {
  const { data: userData } = useSWR("/api/users/profile");
  const {
    data: followerData,
    error,
    isLoading,
  } = useSWR(() => `/api/users/${userData.data.id}/following?page=${index}`);

  if (!followerData) return <div>Loading...</div>;
  console.log("followerData", followerData);
  if (error) return <div>failed to load</div>;

  return (
    <ul>
      {followerData.data.map((user: IUser) => {
        return (
          <li key={user.id} className="my-5">
            {/* TODO add link href */}
            <User href="" user={user} />
          </li>
        );
      })}
    </ul>
  );
}
