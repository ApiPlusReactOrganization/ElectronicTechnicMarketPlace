import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  favoriteProducts: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    addFavoriteProduct: (state, action) => {
      const productId = action.payload;
      if (!state.favoriteProducts.includes(productId)) {
        state.favoriteProducts.push(productId);
      }
    },
    removeFavoriteProduct: (state, action) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (id) => id !== action.payload
      );
    },
    setFavoriteProducts: (state, action) => {
      state.favoriteProducts = action.payload;
    },
  },
});

export const {
  authUser,
  logout,
  addFavoriteProduct,
  removeFavoriteProduct,
  setFavoriteProducts,
} = userSlice.actions;

export default userSlice.reducer;
