"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form
        className="my-5 flex"
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = (inputFileRef.current?.files)![0];

          await fetch(`/api/avatar/upload?filename=${file.name}`, {
            method: "POST",
            body: file,
          });

          router.push("/account");
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button
          className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg transition duration-300  dark:hover:bg-slate-700 hover:bg-slate-600"
          type="submit"
        >
          Upload
        </button>
      </form>
    </>
  );
}
