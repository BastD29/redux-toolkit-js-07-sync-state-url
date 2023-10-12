import { useState, useMemo, useCallback } from "react";

export default function useFilteredUsersLocalState(initialUsers) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ city: "all", age: "all" });

  const filterBySearchTerm = (user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase());

  const filterByFilters = (user) =>
    (filters.city === "all" || user.city.toLowerCase() === filters.city) &&
    (filters.age === "all" || user.age.toString() === filters.age);

  const filteredUsers = useMemo(
    () => initialUsers.filter(filterBySearchTerm).filter(filterByFilters),
    [searchTerm, filters, initialUsers] // Added initialUsers as a dependency
  );

  const handleFilterChange = useCallback(
    (filterType) => (e) => {
      setFilters({ ...filters, [filterType]: e.target.value });
    },
    [filters, setFilters]
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return {
    filteredUsers,
    setSearchTerm,
    setFilters,
    filters,
    handleFilterChange,
    handleSearchChange,
  };
}
