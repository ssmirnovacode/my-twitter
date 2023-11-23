"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IUser } from "../types";
import User from "../components/User";

export default function SearchBar() {
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [term, setTerm] = useState("");

  const ref = useRef(null);

  let timer: string | number | NodeJS.Timeout | undefined;

  useEffect(() => {
    if (!debouncedTerm) {
      setSearchResults([]);
      return;
    }
    fetchSearchResults(debouncedTerm);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTerm]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // @ts-ignore // TODO
      if (ref.current && !ref.current.contains(e.target)) {
        clearInput();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const clearInput = () => {
    setSearchResults([]);
    setTerm("");
    setDebouncedTerm("");
  };

  const fetchSearchResults = async (query: string) => {
    // console.log(`searching for ${query}`);
    const res = await fetch(`/api/search?q=${query}`);
    if (res.ok) {
      const results = await res.json();
      setSearchResults(results.data);
    } else {
      setSearchResults([]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    // debounce
    timer = setTimeout(() => setDebouncedTerm(e.target.value), 700);
  };
  return (
    <div className="flex flex-row max-w-md w-full justify-end relative">
      <input
        onChange={handleChange}
        className="p-2 rounded-lg bg-white dark:bg-gray-700 dark:text-white text-black my-2 max-w-xs"
        placeholder="Search..."
        ref={ref}
        value={term}
      />
      {searchResults.length ? (
        <ul className="flex flex-col bg-white text-black absolute p-2 rounded-lg top-14 right-2 w-full max-w-sm">
          {searchResults.map((res: IUser) => (
            <li key={res.id} className="my-3">
              <User href={res.username} user={res} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
