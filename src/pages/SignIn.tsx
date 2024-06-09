import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../app/AuthContextProvider.tsx";
import {
  userLoginSchema,
  UserLoginType,
} from "../../shared/schemas/userSchema.ts";
import { AuthStatusResponse } from "../../shared/schemas/responseSchema.ts";
import mongodbLogo from "../images/mongodb.png";
import showPasswordSVG from "../images/show-password.svg";
import hidePasswordSVG from "../images/hide-password.svg";
import SmallSpinner from "../components/SmallSpinner.tsx";

type ButtonState = "idle" | "loading" | "failed";

export default function SignIn() {
  const navigate = useNavigate();
  const [data] = useAuthContext();
  const [buttonState, setButtonState] = useState<ButtonState>("idle");
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(
    null
  );
  const [passwordShow, setPasswordShow] = useState(false);

  const image = passwordShow ? hidePasswordSVG : showPasswordSVG;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLoginType>({
    resolver: zodResolver(userLoginSchema),
  });

  const submitBlogHandler: SubmitHandler<UserLoginType> = async (user) => {
    setButtonState("loading");

    try {
      const res = await fetch("http://localhost:5174/users/sign-in", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const jsonResponse: AuthStatusResponse = await res.json();
      console.log(jsonResponse);
      if (jsonResponse.error) {
        setButtonState("failed");
        setLoginErrorMessage(jsonResponse.error);
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
          placeholder="myuser1"
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
            placeholder="XXXXXXXXXXXXXX"
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

      <div>
        <Link to="/sign-up" className="opacity-80 hover:opacity-100">
          Don't have an account?
        </Link>
      </div>

      <div className="my-4 flex justify-center">
        <button
          className={`font-satoshi-light relative flex h-14 w-80 justify-center rounded-xl border-2 border-transparent ${buttonState === "failed" ? "bg-red-600" : "bg-green-600"} px-3 py-2 text-3xl transition-all hover:border-double hover:border-white hover:${buttonState === "failed" ? "bg-red-700" : "bg-green-700"}`}
        >
          <span
            className={`absolute transition-opacity duration-500 ${
              buttonState === "idle" ? "opacity-100" : "opacity-0"
            }`}
          >
            Sign In
          </span>
          <span
            className={`absolute transition-opacity duration-500 ${
              buttonState === "loading" ? "opacity-100" : "opacity-0"
            }`}
          >
            <SmallSpinner />
          </span>
          <span
            className={`absolute transition-opacity duration-500 ${
              buttonState === "failed" ? "opacity-100" : "opacity-0"
            }`}
          >
            {loginErrorMessage}
          </span>
        </button>
      </div>
    </form>
  );

  if (data?.user) {
    navigate("/");
  }
  return (
    <div className="flex flex-col items-center gap-y-8">
      <div className="flex -translate-x-2 select-none flex-row items-center">
        <img src={mongodbLogo} className="h-16 w-16" />
        <p className="font-satoshi-bold text-3xl sm:text-5xl">Sign In</p>
      </div>
      {formComponent}
    </div>
  );
}
