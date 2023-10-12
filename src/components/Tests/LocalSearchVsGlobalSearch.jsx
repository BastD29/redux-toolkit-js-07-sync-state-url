// import React, { useState } from "react";

// export default function LocalSearch() {
//   const [search, setSearch] = useState("");

//   console.log("search", search);

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//   };

//   return (
//     <>
//       <input type="text" onChange={handleSearch} value={search} />
//     </>
//   );
// }

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions, searchSelectors } from "../../store/search";
import { useSearchParams } from "react-router-dom";

export default function GlobalSearch() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useSelector(searchSelectors.getValue);
  console.log("search", search);

  useEffect(() => {
    const urlSearchValue = searchParams.get("search");
    if (urlSearchValue && urlSearchValue !== search) {
      dispatch(searchActions.setSearchValue(urlSearchValue));
    } else if (!urlSearchValue && search) {
      setSearchParams({ search });
    }
  }, [search, searchParams, setSearchParams]);

  const handleSearch = (e) => {
    dispatch(searchActions.setSearchValue(e.target.value));
    setSearchParams({ search: e.target.value });
  };

  return (
    <>
      <input type="text" onChange={handleSearch} value={search} />
    </>
  );
}
