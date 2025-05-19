import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../supabaseClient"; // your supabase client import

// Define types
interface Trip {
  id?: string;
  userId: string;
  origin: string;
  destination: string;
  tripDate: string;
  createdAt?: string;
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
      origin,
      destination,
      tripDate,
    }: {
      origin: string;
      destination: string;
      tripDate: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const authUser = await supabase.auth.getUser();
      const authUserId = authUser.data.user?.id;

      if (!authUserId) throw new Error("User not authenticated");

      // Fetch the user row from Users table using authUserId
      const { data: usersData, error: usersError } = await supabase
        .from("Users")
        .select("id")
        .eq("userId", authUserId)
        .single();

      if (usersError || !usersData) throw new Error("User record not found");

      const userId = usersData.id;

      const { data, error } = await supabase
        .from("Trips")
        .insert([
          {
            userId,
            origin,
            destination,
            tripDate,
            created_at: new Date().toISOString(),
          },
        ])
        .single();

      if (error) throw new Error(error.message);

      return data;
    } catch (error) {
      console.log("error: ", ((error as unknown) as any).message);
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
        .select(
          `*,
          userId(phoneNumber)
        `
        )
        .order("created_at", { ascending: false });

      console.log("initi trip: ", data);

      if (error) throw new Error(((error as unknown) as any).message);

      const tripsWithPhone = data.map((trip) => ({
        ...trip,
        phoneNumber: trip.Users?.phoneNumber || null,
      }));

      return tripsWithPhone;
    } catch (error) {
      console.log("fetch trips err: ", error);
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
        query = query.eq("tripDate", tripDate);
      }

      const { data, error } = await query;

      if (error) throw new Error(error.message);

      return data;
    } catch (error) {
      console.log("findTrips err", error);
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
        //@ts-ignore
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
        state.trips = action.payload || [];
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
        state.trips = action.payload || [];
      })
      .addCase(findTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateTripField, clearTripForm } = tripSlice.actions;
export default tripSlice.reducer;
