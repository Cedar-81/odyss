import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../supabaseClient"; // import your Supabase client

// Define types
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  showAuth: "signup" | "signin" | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  showAuth: null,
};

// Register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
    },
    { rejectWithValue }
  ) => {
    try {
      // 1. Sign up the user without triggering verification email
      const {
        data: signUpData,
        error: signUpError,
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined, // prevent redirect email? (optional)
          // OR configure Supabase to disable confirmation email globally
        },
      });

      if (signUpError) throw new Error(signUpError.message);

      const userId = signUpData.user?.id;

      // 2. Insert user profile with averified = false
      const { error: insertError } = await supabase.from("Users").insert([
        {
          userId,
          email,
          firstName,
          lastName,
          phoneNumber,
          verified: false, // explicitly set this field
        },
      ]);

      if (insertError) throw new Error(insertError.message);

      // 3. Return user info
      return {
        id: userId,
        email,
        firstName,
        lastName,
        phoneNumber,
        verified: false,
      };
    } catch (error) {
      return rejectWithValue(((error as unknown) as any).message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // 1. Sign in with email/password
      const {
        data: loginData,
        error: loginError,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError || !loginData.user) {
        throw new Error(loginError?.message || "Login failed");
      }

      const userId = loginData.user.id;

      // 2. Get user profile from `Users` table
      const { data: users, error: fetchError } = await supabase
        .from("Users")
        .select("*")
        .eq("userId", userId)
        .single();

      if (fetchError || !users) {
        throw new Error("User profile not found");
      }

      return {
        id: userId,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        phoneNumber: users.phoneNumber,
      };
    } catch (error) {
      return rejectWithValue(((error as unknown) as any).message);
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return null;
    } catch (error) {
      return rejectWithValue(((error as unknown) as any).message);
    }
  }
);

// Check auth status
export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        throw new Error("No active session");
      }

      const userId = session.user.id;

      const { data: userData, error: userError } = await supabase
        .from("Users")
        .select("*")
        .eq("userId", userId)
        .single();

      if (userError || !userData) {
        throw new Error("User profile not found");
      }

      return {
        id: userId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
      };
    } catch (error) {
      return rejectWithValue(((error as unknown) as any).message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setShowAuth: (state, action) => {
      state.showAuth = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        //@ts-ignore
        state.user = action.payload;
        state.showAuth = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.showAuth = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setShowAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
