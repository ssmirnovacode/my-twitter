"use client";

import { useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";

const SWITCH_WIDTH_PX = 56; // 72;
const HANDLE_DIAMETER_PX = 24; // 30;
const SWITCH_OFFSET_PX = 3;
export default function ThemeButton() {
  const [isDark, setIsDark] = useState(true);
  function handleTheme() {
    if (
      !document.documentElement.classList.contains("dark")
      //   localStorage.theme === "dark" ||
      //   (!("theme" in localStorage) &&
      //     window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    }
  }

  return (
    <div className="mt-3 mx-3 flex gap-2 align-middle justify-end lg:mr-72">
      <div>
        <MdOutlineDarkMode size={28} />
      </div>

      <div
        style={{
          width: SWITCH_WIDTH_PX,
          height: HANDLE_DIAMETER_PX + 2 * SWITCH_OFFSET_PX,
          borderRadius: HANDLE_DIAMETER_PX,
          border: "1px #ddd solid",
          position: "relative",
          transition: ".5s",
          cursor: "pointer",
          background: isDark ? "rgb(30 41 59)" : "rgb(148 163 184)",
        }}
        onClick={handleTheme}
      >
        <div
          style={{
            background: isDark ? "white" : "rgb(30 41 59)",
            borderRadius: "100%",
            height: HANDLE_DIAMETER_PX,
            width: HANDLE_DIAMETER_PX,
            position: "absolute",
            top: SWITCH_OFFSET_PX,
            left: isDark
              ? SWITCH_WIDTH_PX - HANDLE_DIAMETER_PX - SWITCH_OFFSET_PX
              : SWITCH_OFFSET_PX,
            transition: ".5s",
          }}
        ></div>
      </div>
    </div>
  );
}
