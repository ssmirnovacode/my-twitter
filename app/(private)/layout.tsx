"use client";
import { fetcher } from "../helpers/fetcher";
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
      <div>
        <Header />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </SWRConfig>
  );
}
