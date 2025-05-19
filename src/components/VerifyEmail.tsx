"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store"
import { setVerificationSuccess } from "../store/authSlice"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"

function VerifyEmail() {
  const dispatch = useDispatch<AppDispatch>()
  const { error, verificationSuccess } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    // With Supabase, email verification is handled automatically
    // We just need to check if the user is verified after they click the link
    const checkVerificationStatus = async () => {
      const { data } = await supabase.auth.getUser()

      if (data && data.user && data.user.email_confirmed_at) {
        dispatch(setVerificationSuccess(true))
      }
    }

    checkVerificationStatus()

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        checkVerificationStatus()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [dispatch])

  // Redirect after a delay
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (verificationSuccess) {
      timer = setTimeout(() => {
        navigate("/")
      }, 5000)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [verificationSuccess, navigate])

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md text-center">
        {!verificationSuccess ? (
          <>
            <h2 className="text-2xl font-bold">Verifying your email...</h2>
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </>
        ) : (
          <>
            <svg
              className="h-16 w-16 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-2xl font-bold text-green-600 mt-4">Email Verified Successfully!</h2>
            <p className="mt-2 text-gray-600">
              Your email has been verified. You will be redirected to the home page in a few seconds.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            >
              Go to Home
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default VerifyEmail
