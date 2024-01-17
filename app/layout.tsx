import ThemeButton from "./components/ThemeButton";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WHINE·online",
  description: "Sarcastic social media app for people who enjoy complaining",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="dark:bg-slate-900 bg-slate-200 dark:text-slate-200 text-slate-900">
        <ThemeButton />
        {children}
      </body>
    </html>
  );
}
