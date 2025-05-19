"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchTrips } from "../store/tripSlice";
import TripCard from "./TripCard";

function Trips() {
  const dispatch = useDispatch<AppDispatch>();
  const { trips, isLoading } = useSelector((state: RootState) => state.trip);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchTrips());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <section className="space-y-10 lg:px-10">
        <h2 className="text-xl lg:text-3xl font-medium">Available trips</h2>
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">
            Please sign in to view available trips
          </p>
          <p className="text-brand">
            Create an account or sign in to find travel companions
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-10 lg:px-10">
      <h2 className="text-xl lg:text-3xl font-medium">Available trips</h2>

      {isLoading ? (
        <div className="text-center py-10">
          <p>Loading trips...</p>
        </div>
      ) : trips.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">No trips available</p>
          <p className="text-brand">Be the first to create a trip!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              origin={trip.origin}
              destination={trip.destination}
              tripDate={trip.tripDate}
              phoneNumber={trip.userId ? trip.userId.phoneNumber : ""}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Trips;
