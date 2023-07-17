import { createSlice } from "@reduxjs/toolkit";

export const systemInfoSlice = createSlice({
  name: "systemInfo",
  initialState: {
    systemInfo: null,
  },
  reducers: {
    setSystemInfo: (state, action) => {
      state.systemInfo = action.payload;
    },
  },
});

export const { setSystemInfo } = systemInfoSlice.actions;

export default systemInfoSlice.reducer;