"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store"
import { forgotPassword, setShowAuth } from "../store/authSlice"

function ForgotPassword() {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, error, resetSuccess } = useSelector((state: RootState) => state.auth)

  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(forgotPassword(email))
  }

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList.contains("modal-overlay")) {
      dispatch(setShowAuth(null))
    }
  }

  return (
    <div
      className="fixed h-[100vh] w-[100vw] top-0 right-0 shadow-lg bg-black/40 z-30 flex justify-center items-center modal-overlay"
      onClick={closeModal}
    >
      <div className="w-[25rem] h-max rounded-md bg-white space-y-6 p-8">
        <h1 className="text-3xl">Reset Password</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {resetSuccess ? (
          <div className="text-center py-4">
            <p className="text-green-500 mb-4">
              Password reset email sent! Check your inbox for instructions to reset your password.
            </p>
            <button
              onClick={() => dispatch(setShowAuth("signin"))}
              className="w-max px-8 text-base sm:text-lg py-2 rounded-lg cursor-pointer bg-brand text-white"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-max px-8 float-right text-base sm:text-lg py-2 rounded-lg disabled:bg-light-gray cursor-pointer bg-brand text-white"
            >
              {isLoading ? "Sending..." : "Reset Password"}
            </button>

            <p className="text-sm mt-4 pt-4 text-center">
              Remember your password?{" "}
              <button
                type="button"
                onClick={() => dispatch(setShowAuth("signin"))}
                className="text-brand cursor-pointer"
              >
                Sign in
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
