export function setGlobalSearchParams(
  params: Record<string, string | number | null>,
  options: { replace?: boolean } = {},
) {
  const searchParams = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(params)) {
    if (!value) searchParams.delete(key);
    else searchParams.set(key, String(value));
  }

  const newUrl = [window.location.pathname, searchParams.toString()]
    .filter(Boolean)
    .join("?");

  if (options.replace) {
    window.history.replaceState({}, "", newUrl);
  } else {
    window.history.pushState({}, "", newUrl);
  }

  return searchParams;
}
