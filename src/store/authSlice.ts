import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  account,
  databases,
  DATABASES,
  COLLECTIONS,
  ID,
  Query,
} from "../appWrite";

// Define types
interface User {
  $id: string;
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
      // Create account
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        `${firstName} ${lastName}`
      );

      console.log("new account details: ", newAccount);

      // Create session
      await account.createEmailPasswordSession(email, password);

      // // Get account
      const accountDetails = await account.get();

      console.log("account details: ", accountDetails);

      // Store additional user data in database
      const userData = await databases.createDocument(
        DATABASES.MAIN,
        COLLECTIONS.USERS,
        newAccount.$id,
        {
          userId: newAccount.$id,
          email,
          firstName,
          lastName,
          phoneNumber,
        }
      );
      console.log("account details: ", userData);

      return {
        $id: newAccount.$id,
        email,
        firstName,
        lastName,
        phoneNumber,
      };
    } catch (error:any) {
      return rejectWithValue(error.message);
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
      // Create session
      await account.createEmailPasswordSession(email, password);

      // Get account
      const accountDetails = await account.get();

      // Get user data from database
      const users = await databases.listDocuments(
        DATABASES.MAIN,
        COLLECTIONS.USERS,
        [Query.equal("userId", accountDetails.$id)]
      );

      if (users.documents.length === 0) {
        throw new Error("User data not found");
      }

      const userData = users.documents[0];

      return {
        $id: accountDetails.$id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await account.deleteSession("current");
      return null;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      // Get current session
      const session = await account.getSession("current");

      // Get account
      const accountDetails = await account.get();

      // Get user data from database
      const users = await databases.listDocuments(
        DATABASES.MAIN,
        COLLECTIONS.USERS,
        [Query.equal("userId", accountDetails.$id)]
      );

      if (users.documents.length === 0) {
        throw new Error("User data not found");
      }

      const userData = users.documents[0];

      return {
        $id: accountDetails.$id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
      };
    } catch (error) {
      // Not authenticated
      return rejectWithValue("Not authenticated");
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
      });
  },
});

export const { setShowAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
