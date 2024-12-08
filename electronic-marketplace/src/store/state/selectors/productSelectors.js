import { createSelector } from "@reduxjs/toolkit";

const selectProductList = (state) => state.product.productList;

export const selectMemoizedProductList = createSelector(
  [selectProductList],
  (productList) => productList
);
