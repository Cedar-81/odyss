"use client"

import { type ReactNode, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store"
import { checkAuthStatus, setShowAuth } from "../store/authSlice"

interface AuthGuardProps {
  children: ReactNode
}

function AuthGuard({ children }: AuthGuardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh] gap-4">
        <p className="text-lg">You need to be logged in to access this feature</p>
        <button
          onClick={() => dispatch(setShowAuth("signin"))}
          className="w-max px-8 text-base sm:text-lg py-2 rounded-lg cursor-pointer bg-brand text-white"
        >
          Sign in
        </button>
      </div>
    )
  }

  return <>{children}</>
}

export default AuthGuard
