import { configureStore } from "@reduxjs/toolkit";
import systemInfoSlice from "./systemInfoSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    systemInfo: systemInfoSlice,
    user: userSlice,
  },
});

