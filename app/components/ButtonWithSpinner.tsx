import Link from "next/link";
import Spinner from "./Spinner/Spinner";

export default function ButtonWithSpinner({
  className = "",
  handleClick = () => {},
  loading,
  text,
  type = "button",
}: {
  className?: string;
  handleClick?: (() => void) | (() => Promise<void>);
  loading: boolean;
  text: string;
  type: "button" | "link";
}) {
  return type === "button" ? (
    <button
      className={
        className ||
        "mt-4 dark:bg-slate-900 bg-slate-400 text-white p-3 rounded-lg w-full flex justify-center gap-3 transition duration-300  dark:hover:bg-slate-700 hover:bg-slate-600"
      }
      type="submit"
      onClick={handleClick}
    >
      {text}
      {loading && <Spinner />}
    </button>
  ) : (
    <Link
      href="/signin"
      className={
        className ||
        "dark:bg-slate-800 bg-slate-400 p-2 rounded-lg w-48 text-center flex justify-center gap-2 transition duration-300  dark:hover:bg-slate-700 hover:bg-slate-600"
      }
      onClick={handleClick}
    >
      {text}
      {loading && <Spinner />}
    </Link>
  );
}
