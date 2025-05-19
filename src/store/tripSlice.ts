import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../supabaseClient";

// Define types
interface Trip {
  id?: string;
  userId: {
    phoneNumber: string;
  };
  origin: string;
  destination: string;
  tripDate: string;
  created_at?: string;
}

interface TripState {
  trips: Trip[];
  origin: string;
  destination: string;
  tripDate: string;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: TripState = {
  trips: [],
  origin: "",
  destination: "",
  tripDate: "",
  isLoading: false,
  error: null,
};

// Async thunks
export const createTrip = createAsyncThunk(
  "trip/create",
  async (
    {
      userId,
      origin,
      destination,
      tripDate,
    }: {
      userId: string;
      origin: string;
      destination: string;
      tripDate: string;
    },
    { rejectWithValue }
  ) => {
    try {
      //get Users id using auth user id
      const { data: users, error: usersError } = await supabase
        .from("Users")
        .select()
        .eq("userId", userId);

      if (usersError) {
        throw new Error("User data not found");
      }

      const newTrip = {
        userId: users[0].id,
        origin,
        destination,
        tripDate,
      };

      const { data, error } = await supabase
        .from("Trips")
        .insert(newTrip)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.log("Create trip err: ", error);
      return rejectWithValue(((error as unknown) as any).message);
    }
  }
);

export const fetchTrips = createAsyncThunk(
  "trip/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("Trips")
        .select("*, userId(phoneNumber)")
        .order("created_at", { ascending: false });

      console.log("trips data: ", data);

      if (error) throw error;

      return data || [];
    } catch (error) {
      return rejectWithValue(((error as unknown) as any).message);
    }
  }
);

export const findTrips = createAsyncThunk(
  "trip/find",
  async (
    {
      origin,
      destination,
      tripDate,
    }: { origin: string; destination: string; tripDate: string },
    { rejectWithValue }
  ) => {
    try {
      let query = supabase.from("Trips").select("*");

      if (origin) {
        query = query.eq("origin", origin);
      }

      if (destination) {
        query = query.eq("destination", destination);
      }

      if (tripDate) {
        query = query.eq("trip_date", tripDate);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data || [];
    } catch (error) {
      return rejectWithValue(((error as unknown) as any).message);
    }
  }
);

// Trip slice
const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    updateTripField: (state, action) => {
      const { field, value } = action.payload;
      state[
        field as keyof Pick<TripState, "origin" | "destination" | "tripDate">
      ] = value;
    },
    clearTripForm: (state) => {
      state.origin = "";
      state.destination = "";
      state.tripDate = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Create trip
      .addCase(createTrip.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trips.unshift(action.payload);
        state.origin = "";
        state.destination = "";
        state.tripDate = "";
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch trips
      .addCase(fetchTrips.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trips = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Find trips
      .addCase(findTrips.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(findTrips.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trips = action.payload;
      })
      .addCase(findTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateTripField, clearTripForm } = tripSlice.actions;
export default tripSlice.reducer;
