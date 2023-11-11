import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const router = useRouter();

  async function handleSignout() {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (res.ok) router.push("/signin");
    else console.error("logout failed");
  }

  return (
    <button
      onClick={handleSignout}
      className="text-green-400 underline p-2 rounded-lg my-5"
    >
      Sign out
    </button>
  );
}
