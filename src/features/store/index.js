import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import reportSlice from "../slices/reportSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    report: reportSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const { dispatch, getState } = store;
