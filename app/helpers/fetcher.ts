export const fetcher = async (url: RequestInfo | URL) => {
  const res = await fetch(url);
  if (!res.ok) {
    const info = await res.json();
    const error = new Error("An error occured while fetching data");
    console.error(error);
    throw error;
  }
  return await res.json();
};
