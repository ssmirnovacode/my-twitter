import Link from "next/link";
import { usePathname } from "next/navigation";

const PATHS = ["/feed", "/profile", "/following", "/followers"];

export default function Navbar() {
  const pathname = usePathname();

  const renderLink = (path: string) => {
    return (
      <li>
        <Link
          href={path}
          className={pathname.startsWith(path) ? "underline font-bold" : ""}
        >
          {path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
        </Link>
      </li>
    );
  };

  return (
    <nav className="flex max-w-md w-full p-5 bg-slate-800 rounded-lg my-2 ">
      <ul className="flex flex-row justify-around w-full">
        {PATHS.map((path) => renderLink(path))}
      </ul>
    </nav>
  );
}
