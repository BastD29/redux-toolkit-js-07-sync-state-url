import React from "react";

import { cities } from "../../../../constants/options";
import { ages } from "../../../../constants/options";

export default function Select2() {
  return (
    <>
      <label>
        Filter by city:
        <select
        //   value={filters.value}
        //   onChange={(e) => onFilterChange("city", e.target.value)}
        >
          <option value="all">All</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>
      <label>
        Filter by age:
        <select
        //   value={filters.value}
        //   onChange={(e) => onFilterChange("city", e.target.value)}
        >
          <option value="all">All</option>
          {ages.map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
