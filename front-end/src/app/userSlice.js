import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: { isLogin: false },
  reducers: {
    logIn: (state) => {
      state.isLogin = true;
    },
    logOut: (state) => {
      state.isLogin = false;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
