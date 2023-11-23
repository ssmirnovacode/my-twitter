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
        <button type="submit">Upload</button>
      </form>
    </>
  );
}
