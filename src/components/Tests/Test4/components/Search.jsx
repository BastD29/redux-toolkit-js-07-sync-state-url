import React from "react";

export default function Search({ handleSearch, searchTerm }) {
  return (
    <input
      type="text"
      placeholder="search by name"
      onChange={handleSearch}
      value={searchTerm}
    />
  );
}
