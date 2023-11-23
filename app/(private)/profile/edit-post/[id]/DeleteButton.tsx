"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ postId }: { postId: string }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSure, setIsSure] = useState(false);

  const router = useRouter();
  const handleCancel = () => {
    setIsSure(false);
    setShowConfirm(false);
  };
  const handleDelete = async () => {
    // const isSure = confirm(
    //   "Are you sure you wanna be a better person and delete this piece of written drama?"
    // );
    if (!isSure) return;
    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/profile");
    }
  };
  return (
    <div>
      {showConfirm ? (
        <div>
          <p>
            Do you really want to be a better person and delete this piece of
            written drama?
          </p>
          <div className="flex flex-row justify-around my-3">
            <button
              className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg w-24"
              onClick={handleCancel}
            >
              No
            </button>
            <button
              className="bg-red-900 p-2 rounded-lg w-24"
              onClick={handleDelete}
            >
              Yes!
            </button>
          </div>
        </div>
      ) : (
        <button
          className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg"
          onClick={() => setShowConfirm(true)}
        >
          Delete post
        </button>
      )}
    </div>
  );
}
