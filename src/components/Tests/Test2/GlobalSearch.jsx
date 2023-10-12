import React from "react";
import { useSyncStateWithUrlParams } from "../../../hooks/useSyncStateWithUrlParams";
import { searchActions, searchSelectors } from "../../../store/search";

export default function GlobalSearch() {
  const [search, setSearch] = useSyncStateWithUrlParams(
    "search",
    searchSelectors.getValue,
    searchActions.setSearchValue,
    ""
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return <input type="text" onChange={handleSearch} value={search} />;
}
