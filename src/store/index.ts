import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./tripSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    trip: tripReducer,
    auth: authReducer,
  },
});

// TypeScript only: export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
