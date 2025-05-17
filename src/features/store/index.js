import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const { dispatch, getState } = store;
