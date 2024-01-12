import Form from "@/app/components/Form";
import { LOGIN } from "@/utils/constants";
import Link from "next/link";

export default function SignIn() {
  return (
    <main className="flex min-h-screen items-center justify-center text-black dark:text-white">
      <div className="flex flex-col gap-2 p-5 max-w-xs w-full dark:bg-slate-800 bg-slate-300">
        <div className="text-center my-4">
          <h1>WHINE·online</h1>
        </div>
        <Form endpoint={LOGIN} />
        <div>
          <p className="p-5">
            Don&apos;t have an account? Feel free to{" "}
            <Link
              href="/signup"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              sign up
            </Link>
            !
          </p>
        </div>
      </div>
    </main>
  );
}
