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

    deleteCategory: (state, action) => {
      state.categoryList = state.categoryList.filter(
        (category) => category.id !== action.payload.id
      );
    },

    updateCategory: (state, action) => {
      const index = state.categoryList.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.categoryList[index] = action.payload;
      }
    },
  },
});

export const {
  getAll,
  addCategory,
  deleteCategory,
  updateCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
