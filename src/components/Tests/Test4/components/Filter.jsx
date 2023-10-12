import React from "react";
import { Select } from "../../../Select";
import { cities } from "../../../../constants/options";
import { ages } from "../../../../constants/options";

export default function Filter({ handleFilter, filters }) {
  return (
    <>
      <Select
        label="Filter by city:"
        handleChange={handleFilter("city")}
        value={filters.city}
        options={cities}
      />
      <Select
        label="Filter by age:"
        handleChange={handleFilter("age")}
        value={filters.age}
        options={ages}
      />
    </>
  );
}
