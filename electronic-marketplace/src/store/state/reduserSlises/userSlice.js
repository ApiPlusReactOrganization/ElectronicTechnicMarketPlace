import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  currentUser: null,
  isAuth: false,
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
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuth = false;
      state.role = null
    }
  },
});

export const { getAll, authUser, logout } = userSlice.actions;

export default userSlice.reducer;
