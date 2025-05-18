import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TripState {
  email: string;
  tripDate: string;
  tripTime: string;
  origin: string;
  destination: string;
  phoneNumber: string;
}

const initialState: TripState = {
  email: "",
  tripDate: "",
  tripTime: "",
  origin: "",
  destination: "",
  phoneNumber: "",
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTrip: (state, action: PayloadAction<Partial<TripState>>) => {
      return { ...state, ...action.payload };
    },

    updateTripField: (
      state,
      action: PayloadAction<{ field: keyof TripState; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },

    clearTrip: () => initialState,
  },
});

export const { setTrip, updateTripField, clearTrip } = tripSlice.actions;
export default tripSlice.reducer;
