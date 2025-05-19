"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store"
import { resetPassword, clearError } from "../store/authSlice"
import { useNavigate } from "react-router-dom"

function ResetPassword() {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, error, resetSuccess } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    password: "",
    passwordAgain: "",
  })

  useEffect(() => {
    // Clear any previous errors
    dispatch(clearError())
  }, [dispatch])

  useEffect(() => {
    // Redirect after successful reset
    if (resetSuccess) {
      navigate("/")
    }
  }, [resetSuccess, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (formData.password !== formData.passwordAgain) {
      alert("Passwords do not match")
      return
    }

    dispatch(resetPassword({ password: formData.password }))
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light-gray placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
                placeholder="New password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="passwordAgain" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                id="passwordAgain"
                name="passwordAgain"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light-gray placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
                placeholder="Confirm new password"
                value={formData.passwordAgain}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:bg-light-gray"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
