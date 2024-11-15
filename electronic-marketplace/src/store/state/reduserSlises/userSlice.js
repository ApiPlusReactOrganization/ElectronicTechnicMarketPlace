import { createSlice } from "@reduxjs/toolkit";
import actions from "../../actionCreator";

const initialState = {
  userList: [],
  roleList: [],
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
      state.role = null;
    },
    deleteUserS: (state, action) => {
      state.userList = state.userList.filter((u) => u.id != action.payload);
    },
    getRolesS: (state, action) => {
      state.roleList = action.payload;
    }
  },
});

export const { getAll, authUser, logout, deleteUserS, getRolesS } = userSlice.actions;

export default userSlice.reducer;
