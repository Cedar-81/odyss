import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import tripReducer from "./tripSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trip: tripReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
