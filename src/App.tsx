"use client";

import { useEffect, useState } from "react";
import "./App.css";
import clsx from "clsx";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import ForgotPassword from "./components/ForgotPassword";
import EmailVerification from "./components/EmailVerification";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { updateTripField, createTrip, findTrips } from "./store/tripSlice";
import { checkAuthStatus, setShowAuth } from "./store/authSlice";
import Navbar from "./components/Navbar";
import Trips from "./components/Trips";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";
import VerifyEmail from "./components/VerifyEmail";
import FloatingChat from "./components/FloatingChat";
import { useLocation } from "react-router-dom";

function MainApp() {
  const [findATrip, setFindATrip] = useState(true);
  const trip = useSelector((state: RootState) => state.trip);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    const login = searchParams.get("login");
    const signup = searchParams.get("signup");
    if (login) {
      dispatch(setShowAuth("signin"));
    }
    if (signup) {
      dispatch(setShowAuth("signup"));
    }
  }, [location]);

  const handleTripAction = () => {
    if (!auth.isAuthenticated) {
      dispatch(setShowAuth("signin"));
      return;
    }

    if (findATrip) {
      // Find trips
      dispatch(
        findTrips({
          origin: trip.origin,
          destination: trip.destination,
          tripDate: trip.tripDate,
        })
      );
    } else {
      // Create trip
      if (!auth.user) return;

      dispatch(
        createTrip({
          userId: auth.user.id, // Changed from $id to id for Supabase
          origin: trip.origin,
          destination: trip.destination,
          tripDate: trip.tripDate,
        })
      );
    }
  };

  const isFormValid = trip.origin && trip.destination && trip.tripDate;

  // Check if user email is verified - handle the case where user might be null
  const isverified = auth.user?.verified ?? false;

  return (
    <main>
      <Navbar />
      <FloatingChat />
      {auth.showAuth === "signup" && <Signup />}
      {auth.showAuth === "signin" && <Signin />}
      {auth.showAuth === "forgotPassword" && <ForgotPassword />}

      <section className="h-[100vh] flex justify-center w-[100vw] relative overflow-clip">
        <img
          src="./assets/herobkg.png"
          className="absolute object-cover h-full w-full"
          alt="map route image"
        />
        <div className="relative space-y-4 px-8 top-[50%] h-min flex flex-col justify-center items-center -translate-y-[50%]">
          <h1 className="lg:w-[60%] leading-tight font-medium text-4xl lg:text-7xl text-center">
            Cut costs on your next inter-city trip with{" "}
            <br className="hidden lg:block" />
            <span className="griffy-regular text-brand">Odyss</span>
          </h1>
          <p className="text-lg lg:text-2xl text-center">
            Find and share costs with a{" "}
            <span className="text-brand">"travel buddy"</span>. It's simple and
            easy.
          </p>
          <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-6 mt-10">
            <button
              onClick={() => {
                setFindATrip(false);
                document
                  .getElementById("trip")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full lg:w-[10rem] text-lg py-2 rounded-lg cursor-pointer bg-brand text-white"
            >
              Create a trip
            </button>
            <button
              onClick={() => {
                setFindATrip(true);
                document
                  .getElementById("trip")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full lg:w-[10rem] text-brand rounded-lg cursor-pointer text-lg py-2 border border-brand"
            >
              Find a trip
            </button>
          </div>
        </div>
      </section>

      <section
        id="trip"
        className="my-32 flex flex-col justify-center gap-20 px-10"
      >
        {auth.isAuthenticated && auth.user && !isverified && (
          <EmailVerification />
        )}

        <div className="flex mx-auto border border-brand rounded-lg overflow-clip w-max">
          <button
            onClick={() => setFindATrip(false)}
            className={clsx(
              "w-max px-8 text-base lg:text-lg py-2 cursor-pointer",
              !findATrip ? "bg-brand text-white" : "bg-transparent text-brand"
            )}
          >
            Create a trip
          </button>
          <button
            onClick={() => setFindATrip(true)}
            className={clsx(
              "w-max px-8 text-base lg:text-lg py-2 cursor-pointer",
              findATrip ? "bg-brand text-white" : "bg-transparent text-brand"
            )}
          >
            Find a trip
          </button>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full max-w-6xl mx-auto gap-10">
          <div className="space-y-4 text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-medium">
              {findATrip ? "Find a trip" : "Create a trip"}
            </h3>
            {findATrip ? (
              <p className="text-sm sm:text-base md:text-lg text-gray leading-tight">
                Find the right travel companion for your next
                <br />
                inter-city trip on us.
              </p>
            ) : (
              <p className="text-sm sm:text-base md:text-lg text-gray leading-tight">
                Create a trip to share with a travel companion,
                <br />
                we'd help you.
              </p>
            )}
          </div>

          <div className="w-full max-w-md">
            {auth.isAuthenticated ? (
              <div className="flex flex-col justify-center items-center gap-4 w-full">
                <input
                  placeholder="from -> eg. Enugu"
                  type="text"
                  value={trip.origin}
                  onChange={(e) =>
                    dispatch(
                      updateTripField({
                        field: "origin",
                        value: e.target.value,
                      })
                    )
                  }
                  className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg"
                />
                <div className="h-[2rem] border-r w-0 border-dotted text-light-gray" />
                <input
                  placeholder="to -> eg. Abuja"
                  type="text"
                  value={trip.destination}
                  onChange={(e) =>
                    dispatch(
                      updateTripField({
                        field: "destination",
                        value: e.target.value,
                      })
                    )
                  }
                  className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg"
                />
                <div className="h-[2rem] border-r w-0 border-dotted text-light-gray" />
                <input
                  placeholder="date"
                  type="date"
                  value={trip.tripDate}
                  onChange={(e) =>
                    dispatch(
                      updateTripField({
                        field: "tripDate",
                        value: e.target.value,
                      })
                    )
                  }
                  className="outline-none bg-white py-2 min-w-full w-full border border-light-gray px-3 rounded-lg"
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-4 w-full">
                <input
                  placeholder="from -> eg. Enugu"
                  type="text"
                  disabled
                  className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg opacity-70"
                />
                <div className="h-[2rem] border-r w-0 border-dotted text-light-gray" />
                <input
                  placeholder="to -> eg. Abuja"
                  type="text"
                  disabled
                  className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg opacity-70"
                />
                <div className="h-[2rem] border-r w-0 border-dotted text-light-gray" />
                <input
                  placeholder="date"
                  type="date"
                  disabled
                  className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg opacity-70"
                />
              </div>
            )}

            <button
              onClick={handleTripAction}
              disabled={
                !auth.isAuthenticated ||
                !isFormValid ||
                trip.isLoading ||
                (auth.isAuthenticated && !isverified)
              }
              className="w-max px-8 float-right mt-6 text-base sm:text-lg py-2 rounded-lg disabled:bg-light-gray cursor-pointer bg-brand text-white"
            >
              {!auth.isAuthenticated
                ? "Login to continue"
                : !isverified
                ? "Verify email first"
                : trip.isLoading
                ? "Processing..."
                : findATrip
                ? "Search"
                : "Create"}
            </button>
          </div>
        </div>

        {auth.isAuthenticated ? (
          <Trips />
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">
              Please sign in to view available trips
            </p>
            <button
              onClick={() => dispatch(setShowAuth("signin"))}
              className="mt-4 px-8 text-base py-2 rounded-lg cursor-pointer bg-brand text-white"
            >
              Sign in
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
