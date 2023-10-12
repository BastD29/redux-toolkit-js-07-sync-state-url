import React from "react";
import { useSelector } from "react-redux";
import { searchSelectors } from "../store/search";
import { filterSelectors } from "../store/filter";

export default function Home() {
  // ** EXAMPLE OF HOW WE ARE ACCESSING THE STATE FROM EVERYWHERE IN THE APP
  // const search = useSelector(searchSelectors.getValue);
  // console.log("search", search);
  const filter = useSelector(filterSelectors.getFilters);
  console.log("filter", filter);

  return <div>Home</div>;
}
