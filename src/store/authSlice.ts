import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  showAuth: null | "signin" | "signup";
  isAuth: boolean;
}

const initialState: AuthState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  showAuth: null,
  isAuth: false,
};

// Only allow updating string fields
type StringFieldKeys = Extract<keyof AuthState, "firstname" | "lastname" | "email" | "password">;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set multiple fields (used for login/signup)
    setAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
      return { ...state, ...action.payload };
    },

    // Update a single string field
    updateField: (
      state,
      action: PayloadAction<{ field: StringFieldKeys; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },

    // Set showAuth ("signin", "signup", or null)
    setShowAuth: (state, action: PayloadAction<AuthState["showAuth"]>) => {
      state.showAuth = action.payload;
    },

    // Set auth status
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },

    // Reset to initial state
    clearAuth: () => initialState,
  },
});

export const {
  setAuth,
  updateField,
  setShowAuth,
  setIsAuth,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;
