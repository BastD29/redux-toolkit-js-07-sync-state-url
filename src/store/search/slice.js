import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

const getValue = (state) => state.search.value;

export const selectors = {
  getValue,
};

export const { actions, reducer } = slice;
