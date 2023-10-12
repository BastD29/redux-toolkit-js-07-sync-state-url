import { useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions, searchSelectors } from "../store/search";
import { filterActions, filterSelectors } from "../store/filter";
import useSyncURLWithState2 from "./useSyncURLWithState2";

export default function useFilteredUsersGlobalState3(initialUsers) {
  const dispatch = useDispatch();

  const searchTerm = useSelector(searchSelectors.getValue);
  const filters = useSelector(filterSelectors.getFilters);

  const { searchParams, setSearchParams } = useSyncURLWithState2(
    searchTerm,
    filters
  );

  const filterBySearchTerm = (user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase());

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

  const filteredUsers = useMemo(
    () => initialUsers.filter(filterBySearchTerm).filter(filterByFilters),
    [searchTerm, filters, initialUsers]
  );

  useEffect(() => {
    if (!searchParams) return;

    for (const [key, value] of searchParams) {
      if (key !== "search") {
        dispatch(filterActions.setFilter({ key, value }));
      } else {
        dispatch(searchActions.setSearchValue(value));
      }
    }
  }, [searchParams, dispatch]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams((prev) => ({ ...prev, search: value }));
    dispatch(searchActions.setSearchValue(value));
  };

  const handleFilterChange = useCallback(
    (filterType) => (e) => {
      const value = e.target.value;
      setSearchParams((prev) => ({ ...prev, [filterType]: value }));
      dispatch(filterActions.setFilter({ key: filterType, value }));
    },
    [dispatch, setSearchParams]
  );

  return {
    filteredUsers,
    filters,
    searchTerm,
    handleFilterChange,
    handleSearchChange,
  };
}
