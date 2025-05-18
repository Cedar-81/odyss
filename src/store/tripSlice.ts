import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { databases, DATABASES, COLLECTIONS, ID, Query } from "../appWrite"

// Define types
interface Trip {
  $id?: string
  userId: string
  origin: string
  destination: string
  tripDate: string
  createdAt?: string
}

interface TripState {
  trips: Trip[]
  origin: string
  destination: string
  tripDate: string
  isLoading: boolean
  error: string | null
}

// Initial state
const initialState: TripState = {
  trips: [],
  origin: "",
  destination: "",
  tripDate: "",
  isLoading: false,
  error: null,
}

// Async thunks
export const createTrip = createAsyncThunk(
  "trip/create",
  async (
    {
      userId,
      origin,
      destination,
      tripDate,
    }: { userId: string; origin: string; destination: string; tripDate: string },
    { rejectWithValue },
  ) => {
    try {
      const trip = await databases.createDocument(DATABASES.MAIN, COLLECTIONS.TRIPS, ID.unique(), {
        userId,
        origin,
        destination,
        tripDate,
        createdAt: new Date().toISOString(),
      })

      return trip
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchTrips = createAsyncThunk("trip/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await databases.listDocuments(DATABASES.MAIN, COLLECTIONS.TRIPS, [Query.orderDesc("createdAt")])

    return response.documents
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const findTrips = createAsyncThunk(
  "trip/find",
  async (
    { origin, destination, tripDate }: { origin: string; destination: string; tripDate: string },
    { rejectWithValue },
  ) => {
    try {
      const queries = []

      if (origin) {
        queries.push(Query.equal("origin", origin))
      }

      if (destination) {
        queries.push(Query.equal("destination", destination))
      }

      if (tripDate) {
        queries.push(Query.equal("tripDate", tripDate))
      }

      const response = await databases.listDocuments(DATABASES.MAIN, COLLECTIONS.TRIPS, queries)

      return response.documents
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

// Trip slice
const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    updateTripField: (state, action) => {
      const { field, value } = action.payload
      state[field as keyof Pick<TripState, "origin" | "destination" | "tripDate">] = value
    },
    clearTripForm: (state) => {
      state.origin = ""
      state.destination = ""
      state.tripDate = ""
    },
  },
  extraReducers: (builder) => {
    builder
      // Create trip
      .addCase(createTrip.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.isLoading = false
        state.trips.unshift(action.payload)
        state.origin = ""
        state.destination = ""
        state.tripDate = ""
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch trips
      .addCase(fetchTrips.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.isLoading = false
        state.trips = action.payload
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Find trips
      .addCase(findTrips.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(findTrips.fulfilled, (state, action) => {
        state.isLoading = false
        state.trips = action.payload
      })
      .addCase(findTrips.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { updateTripField, clearTripForm } = tripSlice.actions
export default tripSlice.reducer
