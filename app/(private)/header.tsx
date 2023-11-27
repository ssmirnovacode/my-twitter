import "server-only";
import User from "../components/User";
import { fetchProfileData } from "../helpers/handlers";

export default async function Header() {
  const data = await fetchProfileData();

  if (!data) return <div>Failed to load.</div>;

  return (
    <header className="flex flex-row w-full p-5 bg-slate-800 rounded-lg my-2 justify-between items-center">
      <div>
        <h1 className="font-mono text-lg">TW*TTER</h1>
      </div>
      <div>
        <User user={data} href="account" />
      </div>
    </header>
  );
}
