import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function useSyncURLWithState2(searchTerm, filters) {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateURLSearchParams = (key, value) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (searchParams.get("search") !== searchTerm) {
      updateURLSearchParams("search", searchTerm);
    }

    for (let key in filters) {
      if (searchParams.get(key) !== filters[key]) {
        updateURLSearchParams(key, filters[key]);
      }
    }
  }, [searchTerm, filters, searchParams, setSearchParams]);

  return { searchParams, setSearchParams };
}
