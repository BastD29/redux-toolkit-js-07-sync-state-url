// import React, { useState } from "react";

// export default function LocalFilter() {
//   const [filter, setFilter] = useState("all");

//   console.log("filter", filter);

//   const handleFilter = (e) => {
//     setFilter(e.target.value);
//   };

//   return (
//     <>
//       <select onChange={handleFilter} value={filter}>
//         <option value="all">All</option>
//         <option value="fruit">Fruit</option>
//         <option value="vegetable">Vegetable</option>
//       </select>
//     </>
//   );
// }

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActions, filterSelectors } from "../../store/filter";
import { useSearchParams } from "react-router-dom";

export default function GlobalFilter() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = useSelector(filterSelectors.getValue);
  console.log("filter", filter);

  useEffect(() => {
    const urlFilterValue = searchParams.get("filter");
    if (urlFilterValue && urlFilterValue !== filter) {
      dispatch(filterActions.setFilter(urlFilterValue));
    } else if (!urlFilterValue && filter) {
      setSearchParams({ filter });
    }
  }, [filter, searchParams, setSearchParams]);

  const handleFilter = (e) => {
    dispatch(filterActions.setFilter(e.target.value));
    setSearchParams({ filter: e.target.value });
  };

  return (
    <>
      <select onChange={handleFilter} value={filter}>
        <option value="all">All</option>
        <option value="fruit">Fruit</option>
        <option value="vegetable">Vegetable</option>
      </select>
    </>
  );
}
