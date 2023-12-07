import Spinner from "@/app/components/Spinner/Spinner";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
export default function AvatarForm() {
  const { data, error, isLoading } = useSWR("/api/users/profile");

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Spinner />;

  const { avatar } = data?.data || {};

  // TODO form submission with blod storage Vercel
  return (
    <div>
      {avatar ? (
        <div>
          <Image
            src={avatar}
            alt={avatar}
            width={200}
            height={200}
            className="rounded-full m-auto my-5"
          />
        </div>
      ) : (
        <div className="bg-slate-600 rounded-full m-auto my-5"></div>
      )}
      <Link href="/avatar/upload" className="underline">
        Upload avatar
      </Link>
    </div>
  );
}
