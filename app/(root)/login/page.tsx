"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import type { FieldValues } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/navigation"

const Page = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [apiError, setApiError] = useState({ status: false, message: "" })
  const router = useRouter()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm()
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  async function onSubmit(data: FieldValues) {
    try {
      const res = await axios.post("/api/users/login", data)
      console.log("res", res)
      reset()
      router.push("/")
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.error || "Something went wrong"
        setApiError({ status: true, message: errorMessage })
      } else {
        setApiError({ status: true, message: "An unexpected error occurred." })
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="primary-bg min-h-screen w-full flex justify-center items-start"
    >
      <div className="secondary-bg sm:w-[680px] flex flex-col mt-[120px] items-center justify-center inner-shadow p-16 rounded-2xl text-center">
        <h1 className="font-semibold text-5xl line-clamp-1">
          Welcome to <span className="text-[#4534AC]">Workflow</span>!
        </h1>

        <div className="mt-8 w-full">
          <div className="bg-[#ebebeb] w-full min-h-[56px] flex items-center rounded-lg px-4">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="border-none outline-none shadow-none w-full bg-transparent placeholder-[#999999] text-gray-800 py-2"
              type="email"
              placeholder="Your Email"
              name="email"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 mt-1 text-start">
              {typeof errors.email.message === "string"
                ? errors.email.message
                : "Error occurred"}
            </p>
          )}

          <div className="bg-[#ebebeb] w-full min-h-[56px] flex items-center rounded-lg px-4 mt-4 justify-between">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be 8 characters",
                },
              })}
              className="border-none outline-none shadow-none w-full bg-transparent placeholder-[#999999] text-gray-800 py-2"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />

            <Image
              src={`${
                showPassword ? "/eye-slash-solid.svg" : "/eye-solid.svg"
              }`}
              width={24}
              height={24}
              alt="show hide password btn"
              className={`cursor-pointer`}
              onClick={togglePasswordVisibility}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 mt-1 text-start">
              {typeof errors.password.message === "string"
                ? errors.password.message
                : "Error occurred"}
            </p>
          )}

          <button
            disabled={isSubmitting}
            className="w-full blue-gradient opacity-65  text-white py-3 mt-6 rounded-md shadow-lg hover:opacity-90 transition duration-300"
          >
            Log In
          </button>
        </div>
        {apiError.status && (
          <p className="text-red-500 text-xl mt-2 text-start">
            {apiError.message}
          </p>
        )}
        <p className="text-xl mt-8 text-[#606060]">
          Don&apos;t have an account? Create a{" "}
          <Link
            className="text-[#0054a1] hover:text-[#0982f3]"
            href={"/signup"}
          >
            new account.
          </Link>
        </p>
      </div>
    </form>
  )
}

export default Page
