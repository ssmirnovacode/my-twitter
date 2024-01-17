"use client";
import ThemeButton from "../components/ThemeButton";
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
    <SWRConfig value={{ fetcher }}>
      <div className="flex flex-col min-h-screen max-w-md m-auto p-2 items-center justify-center">
        <SearchBar />
        <ThemeButton />
        <Header />
        <Navbar />
        <main className="w-full p-5 dark:bg-slate-800 bg-slate-300 rounded-lg my-2">
          {children}
        </main>
        <Footer />
      </div>
    </SWRConfig>
  );
}
