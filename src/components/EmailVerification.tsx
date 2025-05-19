"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../store"
import { supabase } from "../supabaseClient"

function EmailVerification() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [verificationSent, setVerificationSent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    // Reset countdown when verification is sent
    if (verificationSent) {
      setCountdown(60)
    }
  }, [verificationSent])

  useEffect(() => {
    // Countdown timer
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [countdown])

  const handleSendVerification = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { error } = await supabase.auth.resend({
        type: "signup",
        email: user?.email || "",
      })

      if (error) throw error

      setVerificationSent(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // If user is already verified, don't show this component
  if (user?.verified) {
    return null
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            Your email is not verified. Please verify your email to access all features.
          </p>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          {verificationSent && (
            <p className="text-green-500 text-xs mt-1">
              Verification email sent! Please check your inbox and follow the instructions.
            </p>
          )}
          <div className="mt-2">
            <button
              onClick={handleSendVerification}
              disabled={isLoading || countdown > 0}
              className="text-sm font-medium text-yellow-700 hover:text-yellow-600 disabled:opacity-50"
            >
              {isLoading
                ? "Sending..."
                : countdown > 0
                  ? `Resend in ${countdown}s`
                  : verificationSent
                    ? "Resend verification email"
                    : "Send verification email"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification
