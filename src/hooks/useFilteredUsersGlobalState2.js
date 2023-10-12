import { useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions, searchSelectors } from "../store/search";
import { filterActions, filterSelectors } from "../store/filter";
import useSyncURLWithState from "./useSyncURLWithState";

export default function useFilteredUsersGlobalState2(initialUsers) {
  const dispatch = useDispatch();

  const searchTerm = useSelector(searchSelectors.getValue);
  const filters = useSelector(filterSelectors.getFilters);

  const { searchParams, setSearchParams } = useSyncURLWithState(
    searchTerm,
    filters
  );

  useEffect(() => {
    if (!searchParams) return;

    const params = Array.from(searchParams.entries());
    params.forEach(([key, value]) => {
      if (key !== "search") {
        dispatch(filterActions.setFilter({ key, value }));
        return;
      }

      dispatch(searchActions.setSearchValue(value));
    });
  }, [searchParams]);

  // * SEARCH

  const filterBySearchTerm = (user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase());

  // * FILTER

  const filterByFilters = (user) => {
    for (let key in filters) {
      if (
        filters[key] !== "all" &&
        user[key].toString().toLowerCase() !==
          filters[key].toString().toLowerCase()
      ) {
        return false;
      }
    }

    return true;
  };

  // * SEARCH & FILTERS

  const filteredUsers = useMemo(
    () => initialUsers.filter(filterBySearchTerm).filter(filterByFilters),
    [searchTerm, filters, initialUsers]
  );

  // * HANDLERS

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const newParams = { ...Object.fromEntries(searchParams), search: value };
    setSearchParams(newParams);
    dispatch(searchActions.setSearchValue(value));
  };

  const handleFilterChange = useCallback(
    (filterType) => (e) => {
      const value = e.target.value;
      const newParams = {
        ...Object.fromEntries(searchParams),
        [filterType]: value,
      };
      setSearchParams(newParams);
      dispatch(filterActions.setFilter({ key: filterType, value }));
    },
    [filters, searchParams, setSearchParams]
  );

  return {
    filteredUsers,
    filters,
    searchTerm,
    handleFilterChange,
    handleSearchChange,
  };
}
