import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {},
};

const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    resetFilters: (state) => {
      state.filters = {};
    },
  },
});

const getFilters = (state) => state.filter.filters;
// console.log("getFilters", getFilters);

export const selectors = {
  getFilters,
};

export const { actions, reducer } = slice;
