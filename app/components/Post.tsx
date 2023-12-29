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
    <article className="flex flex-row">
      <div>
        {!!currentUser ? (
          avatar ? (
            <Link href={`/${username}`}>
              <Image
                src={avatar}
                width={50}
                height={50}
                alt={username}
                className="rounded-full mr-3"
              />
            </Link>
          ) : (
            <Link href={`/${username}`}>
              <div
                className="bg-slate-600 rounded-full mr-3"
                style={{ width: 50, height: 50 }}
              ></div>
            </Link>
          )
        ) : avatar ? (
          <Image
            src={avatar}
            width={50}
            height={50}
            alt={username}
            className="rounded-full mr-3"
          />
        ) : (
          <div
            className="bg-slate-600 rounded-full mr-3"
            style={{ width: 50, height: 50 }}
          ></div>
        )}
      </div>
      <div className="flex flex-col max-w-xs">
        <div className="font-bold">
          {!currentUser ? (
            username
          ) : (
            <Link href={`/${username}`}>{username}</Link>
          )}
        </div>
        <div className="text-slate-400">
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
