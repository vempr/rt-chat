import { ChangeEvent, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useGetAuthenticationStatusQuery } from "../app/api/usersApi.ts";
import { usePostBlogMutation } from "../app/api/blogsApi.ts";
import {
  blogFormSchema,
  BlogFormType,
} from "../../shared/schemas/blogSchema.ts";
import { ButtonState } from "../../shared/schemas/componentStateSchema.ts";
import mongodbLogo from "../images/mongodb.png";
import Spinner from "../components/Spinner.tsx";
import SmallSpinner from "../components/SmallSpinner.tsx";
import FlexWrapper from "../components/FlexWrapper.tsx";

export default function CreateBlog() {
  const navigate = useNavigate();
  const { data: authData, isLoading } = useGetAuthenticationStatusQuery(null);
  const [postBlog] = usePostBlogMutation();
  const [buttonState, setButtonState] = useState<ButtonState>("idle");
  const [base64, setBase64] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result?.toString() || "");
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormType>({
    resolver: zodResolver(blogFormSchema),
  });

  useEffect(() => {
    if (!authData?.user && !isLoading) navigate("/sign-in");
  }, [authData]);

  const submitBlogHandler: SubmitHandler<BlogFormType> = async (blog) => {
    setButtonState("loading");
    const formattedBlog = { ...blog, thumbnail: base64 };
    try {
      const res = await postBlog(formattedBlog);
      if (res.error || res.data.error) {
        setButtonState("failed");
      } else {
        setButtonState("posted");
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
      className="font-satoshi-regular flex w-[90vw] flex-col gap-y-3 text-lg sm:w-[70vw] lg:w-[50vw]"
    >
      <div className="flex flex-col">
        <label htmlFor="author" className="font-satoshi-bold translate-x-1">
          Author*
        </label>
        <input
          id="author"
          placeholder="John Michaels"
          className="rounded-lg px-2 py-1 text-black opacity-80 hover:cursor-default"
          autoComplete="off"
          readOnly
          defaultValue={authData?.user?.username}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="title" className="font-satoshi-bold translate-x-1">
          Title*
        </label>
        <input
          id="title"
          placeholder="The Impact of Modern Pyjamas"
          className="rounded-lg px-2 py-1 text-black"
          autoComplete="off"
          {...register("title")}
        />
        {errors.title?.message && (
          <p className="italic text-red-600">{errors.title?.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="content" className="font-satoshi-bold translate-x-1">
          Content*
        </label>
        <textarea
          id="content"
          placeholder="Once upon a time..."
          className="h-64 rounded-lg px-2 py-1 text-black"
          autoComplete="off"
          {...register("body")}
        ></textarea>
        {errors.body?.message && (
          <p className="italic text-red-600">{errors.body?.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="font-satoshi-bold translate-x-1" htmlFor="file_input">
          Thumbnail
        </label>
        <input
          className="block w-full cursor-pointer rounded-lg border-transparent bg-gray-600 hover:cursor-pointer"
          id="file_input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        ></input>
        <p className="mt-1 translate-x-1 text-sm">
          Supports PNG, JPG, SVG, GIF. Maximum 4MB.
        </p>
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
            Submit Blog
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
              buttonState === "posted" ? "opacity-100" : "opacity-0"
            }`}
          >
            Blog Posted!
          </span>
          <span
            className={`absolute transition-opacity duration-500 ${
              buttonState === "failed" ? "opacity-100" : "opacity-0"
            }`}
          >
            Blog Post Failed
          </span>
        </button>
      </div>
    </form>
  );

  if (isLoading) return <Spinner />;
  if (authData?.user) {
    return (
      <FlexWrapper>
        <div className="flex flex-col items-center gap-y-8">
          <div className="flex -translate-x-2 select-none flex-row items-center">
            <img src={mongodbLogo} className="h-16 w-16" />
            <p className="font-satoshi-bold text-3xl sm:text-5xl">
              Create Blog
            </p>
          </div>
          {formComponent}
        </div>
      </FlexWrapper>
    );
  }
}
