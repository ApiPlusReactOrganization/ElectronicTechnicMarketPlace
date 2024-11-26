import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  productForEdit: null
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.productList = action.payload;
    },
    getProduct: (state, action) => {
      state.productForEdit = action.payload;
    },
    addProduct: (state, action) => {
      state.productList = [...state.productList, action.payload];
    },
    deleteProductReduser: (state, action) => {
      state.productList = state.productList.filter(
        (m) => m.id !== action.payload.id
      );
    },
    updateProductReducer: (state, action) => {
      const index = state.productList.findIndex(
        (m) => m.id === action.payload.id
      );
      if (index !== -1) {
        state.productList[index] = action.payload;
      }
    },
  },
});

export const {
  getAll,
  addProduct,
  deleteProductReduser,
  updateProductReducer,
  getProduct
} = productSlice.actions;
export default productSlice.reducer;
