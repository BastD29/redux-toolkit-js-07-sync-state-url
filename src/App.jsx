import React from "react";
import { Route, Routes } from "react-router";

// components
import StoreWithUseState from "./components/Tests/StoreWithUseState";
import StoreWithUseSearchParams from "./components/Tests/StoreWithUseSearchParams";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import LocalSearchVsGlobalSearch from "./components/Tests/LocalSearchVsGlobalSearch";
import LocalFilterVsGlobalFilter from "./components/Tests/LocalFilterVsGlobalFilter";
import Test1 from "./components/Tests/Test1";
import Test2 from "./components/Tests/Test2/Test2";
import Test3 from "./components/Tests/Test3/Test3";

import Test4LocalState from "./components/Tests/Test4/Test4LocalState";
import Test4GlobalState from "./components/Tests/Test4/Test4GlobalState";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/store" element={<StoreWithUseState />} /> */}
        {/* <Route path="/store" element={<StoreWithUseSearchParams />} /> */}
        {/* <Route path="/store" element={<Test1 />} /> */}
        {/* <Route path="/store" element={<Test2 />} /> */}
        {/* <Route path="/store" element={<Test3 />} /> */}
        {/* <Route path="/store" element={<Test4LocalState />} /> */}
        <Route path="/store" element={<Test4GlobalState />} />
        {/* <Route path="/store" element={<LocalSearchVsGlobalSearch />} /> */}
        {/* <Route path="/store" element={<LocalFilterVsGlobalFilter />} /> */}
      </Routes>
    </>
  );
}
