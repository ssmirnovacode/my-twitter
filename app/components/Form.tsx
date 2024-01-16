"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FormEndpoint } from "@/types";
import { FORM_FIELDS, LOGIN, SIGNUP } from "@/utils/constants";
import ButtonWithSpinner from "./ButtonWithSpinner";
import { getServerErrors, validateAuth } from "./helpers/formValidation";
import { FieldLabel, IError } from "../types";

export default function Form({ endpoint }: { endpoint: FormEndpoint }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [errors, setErrors] = useState<IError[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    const newErrors = validateAuth({
      username,
      password,
      confirmPassword,
      type: endpoint,
    });

    if (newErrors.length) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const res = await fetch(`/api/${endpoint}`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.ok) {
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      // TODO - auto-login on signup ?
      endpoint === SIGNUP ? router.push("/signin") : router.push("/feed");
    } else {
      setLoading(false);
      const errors = getServerErrors(res.status);
      setErrors(errors);
    }
  }

  const CTA = endpoint === SIGNUP ? "Sign up" : "Log in";

  const getError = (field: FieldLabel) =>
    errors.find((item) => item.field === field);

  // const renderError = (field: FieldLabel) => {
  //   const fieldError = getError(field);
  //   return fieldError ? (
  //     <p className="text-red-600">{fieldError.message}</p>
  //   ) : null;
  // };

  const getClassName = (field: FieldLabel) => {
    const inputClasses = "text-black p-3 border border-slate-700 rounded-lg";
    return getError(field)
      ? inputClasses + " border-4 border-red-600"
      : inputClasses;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-5 max-w-xs w-full dark:bg-slate-800 bg-slate-300 rounded-lg "
    >
      <div className="text-center">
        <h3 className="font-semibold">{CTA}</h3>
      </div>
      <div className="my-3">
        <hr />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            className={getClassName("username")}
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* {renderError("username")} */}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className={getClassName("password")}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* {renderError("password")} */}
        </div>
        {endpoint === SIGNUP && (
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              className={getClassName("confirmPassword")}
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* {renderError("confirmPassword")} */}
          </div>
        )}
        <ButtonWithSpinner type="button" loading={loading} text={CTA} />

        {errors.map((err) => (
          <div key={err.field} className="text-red-600">
            {err.field === FORM_FIELDS.confirmPassword &&
            !err.message.includes("blank")
              ? err.message
              : `${err.field.slice(0, 1).toUpperCase()}${err.field.slice(1)} ${
                  err.message
                }`}
          </div>
        ))}
      </div>
    </form>
  );
}
