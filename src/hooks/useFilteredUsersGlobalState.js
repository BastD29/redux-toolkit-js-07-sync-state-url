import { useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions, searchSelectors } from "../store/search";
import { filterActions, filterSelectors } from "../store/filter";
import { useSearchParams } from "react-router-dom";

export default function useFilteredUsersGlobalState(initialUsers) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = useSelector(searchSelectors.getValue);
  const filters = useSelector(filterSelectors.getFilters);

  // * SYNC STATE WITH URL THANKS TO USESEARCHPARAMS

  useEffect(() => {
    // search
    const urlSearchTerm = searchParams.get("search");

    console.log({ searchTerm, urlSearchTerm });

    if (!urlSearchTerm) {
      searchParams.delete("search");
    } else if (urlSearchTerm && urlSearchTerm !== searchTerm) {
      dispatch(searchActions.setSearchValue(urlSearchTerm));
    } else if (!urlSearchTerm && searchTerm) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("search", searchTerm);
    }

    // filters
    for (let key in filters) {
      const urlFilterValue = searchParams.get(key);
      if (urlFilterValue && urlFilterValue !== filters) {
        dispatch(filterActions.setFilter({ key, value: urlFilterValue }));
      } else if (!urlFilterValue && filters) {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set("filters", filters);
      }
    }
  }, [
    searchTerm,
    filters,
    searchParams,
    setSearchParams,
    searchActions.setSearchValue,
    filterActions.setFilter,
  ]);

  useEffect(() => {
    if (!searchParams) return;

    const params = Array.from(searchParams.entries());
    console.log(params);
    params.forEach(([key, value]) => {
      console.log(key, value);

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

  // * SEARCH & FILTER HANDLERS

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(searchActions.setSearchValue(value));
    const newParams = { ...Object.fromEntries(searchParams), search: value };
    setSearchParams(newParams);
  };

  const handleFilterChange = useCallback(
    (filterType) => (e) => {
      const value = e.target.value;
      dispatch(filterActions.setFilter({ key: filterType, value }));
      const newParams = {
        ...Object.fromEntries(searchParams),
        [filterType]: value,
      };
      setSearchParams(newParams);
    },
    [filters, searchParams, setSearchParams]
  );

  return {
    filteredUsers,
    filters,
    handleFilterChange,
    handleSearchChange,
    searchTerm,
  };
}
