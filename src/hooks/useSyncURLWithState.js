import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function useSyncURLWithState(searchTerm, filters) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // search
    const urlSearchTerm = searchParams.get("search");
    if (!urlSearchTerm) {
      searchParams.delete("search");
    } else if (urlSearchTerm && urlSearchTerm !== searchTerm) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("search", urlSearchTerm);
      setSearchParams(newSearchParams);
    }

    // filters
    for (let key in filters) {
      const urlFilterValue = searchParams.get(key);
      if (urlFilterValue && urlFilterValue !== filters[key]) {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set(key, urlFilterValue);
        setSearchParams(newSearchParams);
      }
    }
  }, [searchTerm, filters, searchParams, setSearchParams]);

  return { searchParams, setSearchParams };
}
