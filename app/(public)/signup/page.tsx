import Form from "@/app/components/Form";
import { SIGNUP } from "@/utils/constants";
import Link from "next/link";

export default async function Signup() {
  return (
    <div className="flex flex-col gap-2 p-5 max-w-xs w-full dark:bg-slate-800 bg-slate-300">
      <div className="text-center my-4">
        <h1>WHINE·online</h1>
      </div>
      <Form endpoint={SIGNUP} />
      <div>
        <p className="p-5">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-blue-600 dark:text-blue-500 hover:underline block"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
