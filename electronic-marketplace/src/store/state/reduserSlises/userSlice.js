import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  currentUser: undefined,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.currentUser = action.payload;
    },
    getAll: (state, action) => {
      state.userList = action.payload;
    },
    authUser: (state, action) => {
  
      state.currentUser = action.payload;
      state.isAuth = true;
    },
  },
});

export const { signIn, getAll, authUser } = userSlice.actions;

export default userSlice.reducer;
