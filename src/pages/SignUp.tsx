import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider.tsx";
import { UserType, userSchema } from "../../shared/schemas/userSchema.ts";
import { SignupResponse } from "../../shared/schemas/responseSchema.ts";
import mongodbLogo from "../images/mongodb.png";
import showPasswordSVG from "../images/show-password.svg";
import hidePasswordSVG from "../images/hide-password.svg";

type ButtonState = "idle" | "loading" | "failed";

export default function SignUp() {
  const navigate = useNavigate();
  const [data, isLoading] = useAuthContext();
  const [buttonState, setButtonState] = useState<ButtonState>("idle");
  const [signupErrorMessage, setSignupErrorMessage] = useState<string | null>(
    null
  );
  const [passwordShow, setPasswordShow] = useState(false);

  const image = passwordShow ? hidePasswordSVG : showPasswordSVG;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserType>({
    resolver: zodResolver(userSchema),
  });

  const submitBlogHandler: SubmitHandler<UserType> = async (user) => {
    setButtonState("loading");

    try {
      const res = await fetch("http://localhost:5174/users/sign-up", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const jsonResponse: SignupResponse = await res.json();
      if (jsonResponse.error) {
        setButtonState("failed");
        setSignupErrorMessage(jsonResponse.error);
      } else {
        navigate("/");
        location.reload();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setButtonState("failed");
    }

    reset();
    setTimeout(() => {
      setButtonState("idle");
    }, 2000);
  };

  const formComponent = (
    <form
      onSubmit={handleSubmit(submitBlogHandler)}
      className="font-satoshi-regular flex w-[90vw] flex-col gap-y-3 text-lg sm:w-[70vw] lg:w-[36rem]"
    >
      <div className="flex flex-col">
        <label htmlFor="username" className="font-satoshi-bold translate-x-1">
          Username
        </label>
        <input
          id="username"
          placeholder="mynewaccount3"
          className="rounded-lg px-2 py-1 text-black"
          autoComplete="off"
          {...register("username")}
        />
        {errors.username?.message && (
          <p className="italic text-red-600">{errors.username?.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="font-satoshi-bold translate-x-1">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={`${passwordShow ? "text" : "password"}`}
            placeholder="XXXXXXXXXX"
            className="w-[90vw] rounded-lg px-2 py-1 text-black sm:w-[70vw] lg:w-[36rem]"
            autoComplete="off"
            {...register("password")}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-2"
            onClick={() => setPasswordShow(!passwordShow)}
          >
            <img src={image} className="h-7 w-7" alt="Show Password" />
          </button>
        </div>
        {errors.password?.message && (
          <p className="italic text-red-600">{errors.password?.message}</p>
        )}
      </div>

      <div className="my-4 flex justify-center">
        <button
          className={`font-satoshi-light relative flex h-14 w-80 justify-center rounded-xl border-2 border-transparent ${buttonState === "failed" ? "bg-red-600" : "bg-green-600"} mt-4 px-3 py-2 text-3xl transition-all hover:border-double hover:border-white hover:${buttonState === "failed" ? "bg-red-700" : "bg-green-700"}`}
        >
          <span
            className={`absolute transition-opacity duration-500 ${
              buttonState === "idle" ? "opacity-100" : "opacity-0"
            }`}
          >
            Sign Up
          </span>
          <span
            className={`absolute transition-opacity duration-500 ${
              buttonState === "loading" ? "opacity-100" : "opacity-0"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="h-9 w-9 animate-spin"
              viewBox="0 0 16 16"
            >
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
              <path
                fillRule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
              />
            </svg>
          </span>
          <span
            className={`absolute transition-opacity duration-500 ${
              buttonState === "failed" ? "opacity-100" : "opacity-0"
            }`}
          >
            {signupErrorMessage}
          </span>
        </button>
      </div>
    </form>
  );

  if (data?.user) {
    navigate("/");
  }
  if (!isLoading)
    return (
      <div className="flex flex-col items-center gap-y-8">
        <div className="flex -translate-x-2 select-none flex-row items-center">
          <img src={mongodbLogo} className="h-16 w-16" />
          <p className="font-satoshi-bold text-3xl sm:text-5xl">Sign Up</p>
        </div>
        {formComponent}
      </div>
    );
}
