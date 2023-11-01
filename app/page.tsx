import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center text-white">
      <div className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800">
        <div className="text-center my-4">
          <h1>My twitter</h1>
        </div>
        <div>
          <Link href="/signin" className="link">
            Sign in
          </Link>
        </div>
        <div>
          <Link href="/signup" className="link">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
