import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  currentUser: null,
  isAuth: false,
  favoriteProducts: [],
  role: null
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
      state.role = action.payload.role;
      state.userId = action.payload.id
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuth = false;
      state.role = null;
    },
    deleteUserS: (state, action) => {
      state.userList = state.userList.filter((u) => u.id != action.payload);
    },

    getAllFavoriteProducts: (state, action) => {
      state.favoriteProducts = action.payload;
    },

    addFavoriteProduct: (state, action) => {
      const productId = action.payload;
      if (!state.favoriteProducts.includes(productId)) {
        state.favoriteProducts.push(productId);
      }
    },

    removeFavoriteProduct: (state, action) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (product) => product.id !== action.payload
      );
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
  getAllFavoriteProducts,
} = userSlice.actions;

export default userSlice.reducer;
