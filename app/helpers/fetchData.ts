import { IUser } from "../types";

const LOCALHOST = "http://localhost:3000";

export const fetchData = async (
  url: string
): Promise<{
  data: IUser | undefined;
  error: { msg: string | undefined; status?: number } | null;
  loading: boolean;
}> => {
  let error: { msg: string | undefined; status?: number } | null = null;
  let loading = true;
  const response = await fetch(`${LOCALHOST}${url}`, {
    method: "GET",
    credentials: "include", // This includes cookies in the request
    headers: {
      "Content-Type": "application/json",
      // Add any other headers your API endpoint requires
    },
  }).catch((err) => {
    error = { msg: err?.message, status: err?.statusCode };
  });
  if (response) {
    const { data, status } = (await response?.json()) || {};
    if (!data && !error) error = { msg: "Could not fetch user", status };
    loading = false;
    console.log("data", data);

    return { data, error, loading };
  } else return { data: undefined, error, loading };
};
