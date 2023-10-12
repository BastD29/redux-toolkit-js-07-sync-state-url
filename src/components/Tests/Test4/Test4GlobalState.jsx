import React from "react";

// components
import Users from "./components/Users";
import Search from "./components/Search";
import Filter from "./components/Filter";

// data
import { users } from "../../../data/users";

// hooks
import useFilteredUsersGlobalState from "../../../hooks/useFilteredUsersGlobalState";

export default function Test4GlobalsState() {
  // prettier-ignore
  const { filteredUsers, handleFilterChange, handleSearchChange, searchTerm, filters } = useFilteredUsersGlobalState(users);

  return (
    <>
      <Search handleSearch={handleSearchChange} searchTerm={searchTerm} />
      <Filter handleFilter={handleFilterChange} filters={filters} />
      <Users users={filteredUsers} />
    </>
  );
}
