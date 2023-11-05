import Link from "next/link";
import { IUser } from "../types";
import Image from "next/image";

function User({ user, href }: { user: IUser; href: string }) {
  const { avatar, username } = user;

  return (
    <div>
      <Link
        href={`/${href || username}`}
        className="flex flex-row items-center"
      >
        <div>
          {avatar ? (
            <Image
              src={avatar}
              width={50}
              height={50}
              alt={username}
              className="rounded-full mr-3"
            />
          ) : (
            <div
              style={{ width: 50, height: 50 }}
              className="bg-slate-600 rounded-full mr-3"
            ></div>
          )}
        </div>
        <div>{username}</div>
      </Link>
    </div>
  );
}

export default User;
