import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  manufacturerList: [],
};

export const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.manufacturerList = action.payload;
    },
    addManufacturer: (state, action) => {
      debugger
      state.manufacturerList = [...state.manufacturerList, action.payload];
    },
  },
});

export const { getAll, addManufacturer } = manufacturerSlice.actions;
export default manufacturerSlice.reducer;
