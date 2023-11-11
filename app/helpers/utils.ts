export function getPageNumber(searchParams: URLSearchParams) {
  const queryValue = searchParams.get("page") || "0";
  return parseInt(queryValue) || 0;
}
