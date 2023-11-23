import "server-only";
import { fetcher } from "../helpers/fetcher";
import SearchBar from "./SearchBar";
import Footer from "./footer";
import Header from "./header";
import Navbar from "./navbar";
import { SWRConfig } from "swr";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // with SWRConfig provider we won't need to import fetcher again when we use SWR
  return (
    <div className="flex flex-col min-h-screen max-w-md m-auto items-center justify-center">
      <SearchBar />
      <Header />
      <Navbar />
      <main className="w-full p-5 bg-slate-800 rounded-lg my-2">
        {children}
      </main>
      <Footer />
    </div>
  );
}
