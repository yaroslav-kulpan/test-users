import { useState, useEffect, useCallback } from "react";
import { setGlobalSearchParams } from "../utils/set-global-search-params";

type QueryParams = {
  [key: string]: string;
};

const getSearchParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return {
    limit: searchParams.get("limit") ?? "10",
    offset: searchParams.get("offset") ?? "0",
  };
};

export function useQueryParams() {
  const [params, setParams] = useState<QueryParams>(getSearchParams);

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setParams(getSearchParams);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const updateParams = useCallback((newParams: Partial<QueryParams>) => {
    setGlobalSearchParams(newParams as unknown as Record<string, string>);
    setParams(getSearchParams);
  }, []);

  return [params, updateParams] as const;
}
