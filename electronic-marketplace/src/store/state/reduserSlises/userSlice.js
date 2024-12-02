import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  currentUser: null,
  isAuth: false,
  favoriteProducts: []
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.userList = action.payload;
    },
    authUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuth = false;
    },
    deleteUserS: (state, action) => {
      state.userList = state.userList.filter((u) => u.id != action.payload);
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
  getAll,
  authUser,
  logout,
  deleteUserS,
  addFavoriteProduct,
  removeFavoriteProduct,
  setFavoriteProducts,
} = userSlice.actions;

export default userSlice.reducer;
