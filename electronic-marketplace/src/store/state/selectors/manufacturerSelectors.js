import { createSelector } from "@reduxjs/toolkit";
import isEqual from "lodash/isEqual";
const selectManufacturerList = (state) => state.manufacturer.manufacturerList;
const selectFiltersManufacturerIds = (state) => state.filters.manufacturerIds;

export const selectMemoizedmanufacturerList = createSelector(
  [selectManufacturerList],
  (manufacturerList) => {
    return manufacturerList;
  },
  {
    memoizeOptions: {
      resultEqualityCheck: isEqual,
    },
  }
);
export const selectMemoizedFiltersManufacturerIds = createSelector(
  [selectFiltersManufacturerIds],
  (manufacturerIds) => {
    return manufacturerIds;
  },
  {
    memoizeOptions: {
      resultEqualityCheck: isEqual,
    },
  }
);