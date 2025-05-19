import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../supabaseClient";

const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:5173";

// Define types
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  verified: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  showAuth: "signup" | "signin" | "forgotPassword" | null;
  resetSuccess: boolean;
  verificationSent: boolean;
  verificationSuccess: boolean;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  showAuth: null,
  resetSuccess: false,
  verificationSent: false,
  verificationSuccess: false,
};

// Async thunks
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
      console.log("creating account");

      // Create account with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            phoneNumber,
            full_name: `${firstName} ${lastName}`,
          },
          emailRedirectTo: `${appUrl}/verify-email`,
        },
      });

      if (authError) throw authError;

      console.log("new account details: ", authData);

      if (!authData.user) {
        throw new Error("Failed to create user");
      }

      // Store additional user data in Supabase profiles table if needed
      // This is optional as we're already storing user metadata
      const { error: profileError } = await supabase.from("Users").insert({
        id: authData.user.id,
        email,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email_verified: false,
      });

      if (profileError) {
        console.error("Error creating profile:", profileError);
        throw new Error("Failed to create user profile");
      }

      return {
        id: authData.user.id,
        email,
        firstName,
        lastName,
        phoneNumber,
        verified: false,
      };
    } catch (error) {
      console.log("register err: ", error);
      return rejectWithValue(((error as unknown) as any).message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (!data.user) {
        throw new Error("User data not found");
      }

      console.log("logindata: ", data);

      const { data: users, error: usersError } = await supabase
        .from("Users")
        .select()
        .eq("userId", data.user.id);

      if (usersError) {
        throw new Error("User data not found");
      }

      console.log("users: ", users);

      // Get user metadata
      const firstName = users[0].firstName || "";
      const lastName = users[0].lastName || "";
      const phoneNumber = users[0].phoneNumber || "";

      // Check if email is verified
      const verified = data.user.email_confirmed_at !== null;

      return {
        id: data.user.id,
        email: data.user.email || "",
        firstName,
        lastName,
        phoneNumber,
        verified,
      };
    } catch (error) {
      console.log("login err: ", error);
      return rejectWithValue(((error as unknown) as any).message);
    }
  }
);

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

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      // Get current session
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      if (!data.session || !data.session.user) {
        throw new Error("Not authenticated");
      }

      const user = data.session.user;

      console.log("logindata: ", data);

      const { data: users, error: usersError } = await supabase
        .from("Users")
        .select()
        .eq("userId", data.session.user.id);

      if (usersError) {
        throw new Error("User data not found");
      }

      console.log("users: ", users);

      // Get user metadata
      const firstName = users[0].firstName || "";
      const lastName = users[0].lastName || "";
      const phoneNumber = users[0].phoneNumber || "";

      // Check if email is verified
      const verified = user.email_confirmed_at !== null;

      return {
        id: user.id,
        email: user.email || "",
        firstName,
        lastName,
        phoneNumber,
        verified,
      };
    } catch (error) {
      // Not authenticated
      return rejectWithValue("Not authenticated");
    }
  }
);

// New thunk for forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      // Request password reset with Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${appUrl}/reset-password`,
      });

      if (error) throw error;

      return true;
    } catch (error) {
      return rejectWithValue(((error as unknown) as any).message);
    }
  }
);

// New thunk for resetting password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    {
      password,
    }: {
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      // With Supabase, we don't need userId and secret as they're handled by the session
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      return true;
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
      // Reset states when changing auth mode
      state.resetSuccess = false;
      state.verificationSent = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearResetSuccess: (state) => {
      state.resetSuccess = false;
    },
    clearVerificationStates: (state) => {
      state.verificationSent = false;
      state.verificationSuccess = false;
    },
    setVerificationSuccess: (state, action) => {
      state.verificationSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.showAuth = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Login
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
      // Logout
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
      // Check auth status
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
      })
      // Forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.resetSuccess = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.resetSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.resetSuccess = true;
        state.showAuth = "signin"; // Redirect to sign in after successful reset
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setShowAuth,
  clearError,
  clearResetSuccess,
  clearVerificationStates,
  setVerificationSuccess,
} = authSlice.actions;

export default authSlice.reducer;
