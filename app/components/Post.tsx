import Link from "next/link";
import { IPost } from "../types";
import Image from "next/image";

export default function Post({
  post,
  currentUser = "",
}: {
  post: IPost;
  currentUser: string;
}) {
  const { avatar, content, created_at, username } = post || {};
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const createAt = new Date(created_at);

  return (
    <article className="flex flex-row gap-5 justify-between">
      <div>
        {avatar ? (
          <Link href={`/${username}`}>
            <Image
              src={avatar}
              width={50}
              height={50}
              alt={username}
              className="rounded-full"
            />
          </Link>
        ) : (
          <Link href={`/${username}`}>
            <div
              className="bg-slate-600 rounded-full"
              style={{ width: 50, height: 50 }}
            ></div>
          </Link>
        )}
      </div>
      <div className="flex flex-col w-10/12">
        <div className="font-bold hover:underline">
          <Link href={`/${username}`}>{username}</Link>
        </div>
        <div className="text-slate-500 ">
          {createAt.toLocaleDateString("en-GB", options)}
        </div>
        <p>{content}</p>
      </div>
      {currentUser === post.username && (
        <div className="text-right flex-grow">
          <Link href={`profile/edit-post/${post.id}`}>Edit</Link>
        </div>
      )}
    </article>
  );
}
