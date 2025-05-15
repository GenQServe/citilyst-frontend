import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../slices/counterSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const { dispatch, getState } = store;
