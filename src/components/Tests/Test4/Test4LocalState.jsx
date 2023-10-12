import React from "react";

// components
import Users from "./components/Users";
import Search from "./components/Search";
import Filter from "./components/Filter";

// data
import { users } from "../../../data/users";

// hooks
import useFilteredUsersLocalState from "../../../hooks/useFilteredUsersLocalState";

export default function Test4LocalState() {
  // prettier-ignore
  const { filteredUsers, filters, handleFilterChange, handleSearchChange } = useFilteredUsersLocalState(users);

  return (
    <>
      <Search handleSearch={handleSearchChange} />
      <Filter handleFilter={handleFilterChange} filters={filters} />
      <Users users={filteredUsers} />
    </>
  );
}
