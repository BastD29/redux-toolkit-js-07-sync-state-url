import React from "react";
import { useSyncStateWithUrlParams } from "../../../hooks/useSyncStateWithUrlParams";
import { filterActions, filterSelectors } from "../../../store/filter";

export default function GlobalFilter() {
  const [filter, setFilter] = useSyncStateWithUrlParams(
    "filter",
    filterSelectors.getFilters,
    filterActions.setFilter,
    "all"
  );

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <select onChange={handleFilter} value={filter}>
      <option value="all">All</option>
      <option value="fruit">Fruit</option>
      <option value="vegetable">Vegetable</option>
    </select>
  );
}
