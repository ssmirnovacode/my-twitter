"use client";
import Link from "next/link";
import { useState } from "react";
import Spinner from "./Spinner/Spinner";
import ButtonWithSpinner from "./ButtonWithSpinner";

export default function Auth() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => setLoading(true);
  return (
    <>
      <ButtonWithSpinner
        handleClick={handleClick}
        type="link"
        loading={loading}
        text="Log in / Register"
      />
      <p className="w-96 mt-3">
        Please log in or register to be able to view user profiles and have
        access to more functionality
      </p>
    </>
  );
}
