// roleSlice.js або аналогічний файл
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roleList: [],
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    getRoles: (state, action) => {
      state.roleList = action.payload;
    },
  },
});

export const { getRoles } = roleSlice.actions; // Експорт функції getRoles
export default roleSlice.reducer;
