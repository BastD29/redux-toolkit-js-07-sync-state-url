import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.value = action.payload;
    },
  },
});

const getValue = (state) => state.filter.value;

export const selectors = {
  getValue,
};

export const { actions, reducer } = slice;
