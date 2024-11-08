import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  categoryList: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.categoryList = action.payload;
    },
    addCategory: (state, action) => {
      state.categoryList = [...state.categoryList, action.payload];
    },
    // update: (state, action) => {
    //   state.categoryList = state.categoryList.map((category) =>
    //     category._id === action.payload._id ? action.payload : category
    //   );
    // },
    // remove: (state, action) => {
    //   state.categoryList = state.categoryList.filter(
    //     (category) => category._id !== action.payload._id
    //   );
    // },
  },
});

export const { getAll, addCategory } = categorySlice.actions;
export default categorySlice.reducer;