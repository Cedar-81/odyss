"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store"
import { registerUser, setShowAuth } from "../store/authSlice"

function Signup() {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, error } = useSelector((state: RootState) => state.auth)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(registerUser(formData))
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
      <form onSubmit={handleSubmit} className="w-[25rem] h-max rounded-md bg-white space-y-6 p-8">
        <h1 className="text-3xl">Create an account</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName">Firstname</label>
            <input
              className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg"
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="eg. Judith"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName">Lastname</label>
            <input
              className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg"
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="eg. Okorie"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="eg. judithokorie@gmail.com"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg"
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="eg. +2348033328156"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="************"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-max px-8 float-right text-base sm:text-lg py-2 rounded-lg disabled:bg-light-gray cursor-pointer bg-brand text-white"
        >
          {isLoading ? "Creating..." : "Create account"}
        </button>

        <p className="text-sm mt-4 pt-4 text-center">
          Already have an account?{" "}
          <button type="button" onClick={() => dispatch(setShowAuth("signin"))} className="text-brand cursor-pointer">
            Sign in
          </button>
        </p>
      </form>
    </div>
  )
}

export default Signup
