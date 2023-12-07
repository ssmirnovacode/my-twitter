"use client";
import User from "@/app/components/User";
import { IUser } from "@/app/types";
import useSWR from "swr";
import Spinner from "./Spinner/Spinner";

export default function UsersList({
  index,
  endpoint,
}: {
  index: number;
  endpoint: string;
}) {
  const { data: userData } = useSWR("/api/users/profile");
  const {
    data: otherUsersData,
    error,
    isLoading,
  } = useSWR(() => `/api/users/${userData.data.id}/${endpoint}?page=${index}`);

  if (!otherUsersData) return <Spinner />;

  if (error) return <div>failed to load</div>;

  return (
    <ul>
      {otherUsersData.data.map((user: IUser) => {
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
