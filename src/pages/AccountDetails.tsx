import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import mongodbLogo from "../images/mongodb.png";
import showPasswordSVG from "../images/show-password.svg";
import hidePasswordSVG from "../images/hide-password.svg";
import {
  userChangePasswordFormSchema,
  UserChangePasswordFormType,
} from "../../shared/schemas/userSchema";

export default function AccountDetails() {
  const navigate = useNavigate();
  const [data, isLoading] = useAuthContext();
  const [oldPasswordShow, setOldPasswordShow] = useState(false);
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserChangePasswordFormType>({
    resolver: zodResolver(userChangePasswordFormSchema),
  });

  const handlePasswordForm: SubmitHandler<UserChangePasswordFormType> = (
    passwords
  ) => {};

  const imageOldPassword = oldPasswordShow ? hidePasswordSVG : showPasswordSVG;
  const imageNewPassword = newPasswordShow ? hidePasswordSVG : showPasswordSVG;

  const modal = (
    <div className="absolute left-0 top-0 h-[100vh] w-[100vw] bg-slate-800 bg-opacity-50">
      <div className="bg-darkest-g absolute left-[50%] top-[42%] translate-x-[-50%] translate-y-[-50%] rounded-xl px-3 py-5 text-white shadow-2xl">
        <h2 className="font-satoshi-bold mb-4 text-center text-2xl sm:text-3xl">
          Change Password
        </h2>
        <form
          className="font-satoshi-regular flex w-[90vw] flex-col gap-y-3 text-lg sm:w-[70vw] lg:w-[40rem]"
          onSubmit={handleSubmit(handlePasswordForm)}
        >
          <div className="flex flex-col">
            <label
              htmlFor="oldPassword"
              className="font-satoshi-medium translate-x-1"
            >
              Old Password*
            </label>
            <div className="relative">
              <input
                id="oldPassword"
                type={`${oldPasswordShow ? "text" : "password"}`}
                className="w-full rounded-lg px-2 py-1 text-black lg:w-[40rem]"
                autoComplete="off"
                {...register("oldPassword")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-2"
                onClick={() => setOldPasswordShow(!oldPasswordShow)}
              >
                <img
                  src={imageOldPassword}
                  className="h-7 w-7"
                  alt="Show Password"
                />
              </button>
            </div>
            {errors.oldPassword?.message && (
              <p className="italic text-red-600">
                {errors.oldPassword?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="newPassword"
              className="font-satoshi-medium translate-x-1"
            >
              New Password*
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={`${newPasswordShow ? "text" : "password"}`}
                className="w-full rounded-lg px-2 py-1 text-black lg:w-[40rem]"
                autoComplete="off"
                {...register("newPassword")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-2"
                onClick={() => setNewPasswordShow(!newPasswordShow)}
              >
                <img
                  src={imageNewPassword}
                  className="h-7 w-7"
                  alt="Show Password"
                />
              </button>
            </div>
            {errors.newPassword?.message && (
              <p className="italic text-red-600">
                {errors.newPassword?.message}
              </p>
            )}
          </div>
          <div className="flex justify-around gap-x-3 py-3">
            <button
              type="button"
              className="font-satoshi-light relative flex h-12 w-64 justify-center rounded-xl border-2 border-transparent bg-red-600 px-3 py-2 text-2xl transition-all hover:border-double hover:border-white hover:bg-red-700 sm:h-14 sm:w-80 sm:text-3xl"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
            <button
              type="submit"
              className="font-satoshi-light relative flex h-12 w-64 justify-center rounded-xl border-2 border-transparent bg-green-600 px-3 py-2 text-2xl transition-all hover:border-double hover:border-white hover:bg-green-700 sm:h-14 sm:w-80 sm:text-3xl"
              onClick={() => setModalOpen(false)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (data?.error) navigate("/");
  if (!isLoading)
    return (
      <>
        <div className="flex flex-col items-center gap-y-8">
          <div className="flex flex-col items-center">
            <div className="flex -translate-x-2 select-none flex-row items-center">
              <img src={mongodbLogo} className="h-16 w-16" />
              <h1 className="font-satoshi-bold text-3xl sm:text-5xl">
                {data?.user?.username}
              </h1>
            </div>
            <p className="text-xs">{data?.user?._id}</p>
          </div>
          <button
            className="font-satoshi-light relative flex h-14 w-80 justify-center rounded-xl border-2 border-transparent bg-green-600 px-3 py-2 text-3xl transition-all hover:border-double hover:border-white hover:bg-green-700"
            onClick={() => setModalOpen(true)}
          >
            Change Password
          </button>
        </div>
        {modalOpen && createPortal(modal, document.body)}
      </>
    );
}
