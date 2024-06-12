import { Link, useParams } from "react-router-dom";
import {
  useGetBlogByIdQuery,
  useGetBlogStatsByIdQuery,
} from "../app/api/blogsApi";
import Spinner from "../components/Spinner.tsx";

const heart = (
  <svg
    className="h-8 w-8"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 512 456.081"
  >
    <path
      fill="#F44336"
      d="M253.648 83.482c130.392-219.055 509.908 65.493-.513 372.599-514.788-328.941-101.874-598.696.513-372.599z"
    />
    <path
      fill="#C62828"
      d="M344.488 10.579c146.331-39.079 316.84 185.128-65.02 429.134 282.18-224.165 190.925-403.563 65.02-429.134zM121.413.646c48.667-4.845 100.025 17.921 129.336 76.929 1.259 3.71 2.44 7.571 3.537 11.586 10.541 34.29.094 49.643-12.872 50.552-18.136 1.271-20.215-14.85-24.966-27.643C192.689 48.096 158.774 12.621 116.43 1.863c1.653-.435 3.314-.841 4.983-1.217z"
    />
    <path
      fill="#FF847A"
      d="M130.558 35.502C87.9 31.255 42.906 59.4 31.385 101.568c-7.868 25.593-.07 37.052 9.607 37.731 13.537.949 15.088-11.084 18.634-20.632 17.733-47.749 43.046-74.227 74.651-82.257a104.925 104.925 0 00-3.719-.908z"
    />
  </svg>
);

const dislike = (
  <svg
    className="h-8 w-8"
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 122.88 122.88"
  >
    <defs>
      <style>
        {`
          .cls-1{fill:#f44336;}
          .cls-1,.cls-2{fill-rule:evenodd;}
          .cls-2{fill:#fff;}
        `}
      </style>
    </defs>
    <title>dislike-button</title>
    <path
      className="cls-1"
      d="M61.44,0A61.44,61.44,0,1,1,0,61.44,61.44,61.44,0,0,1,61.44,0Z"
    />
    <path
      className="cls-2"
      d="M32.5,72.66H43.06a2.18,2.18,0,0,0,2.17-2.18V41.53a2.18,2.18,0,0,0-2.17-2.18H32.5a2.19,2.19,0,0,0-2.18,2.18v29a2.19,2.19,0,0,0,2.18,2.18ZM60.2,94.37c1.14,5.82,10.66.46,11.29-8.91a40.41,40.41,0,0,0-.81-9.93H84.29c5.65-.23,10.59-4.28,7.1-10.93.8-2.9.92-6.3-1.24-7.65.27-4.57-1-7.41-3.37-9.65A11.39,11.39,0,0,0,85,41.42c-1.83-2.58-3.31-2-6.19-2h-23c-3.64,0-5.62,1-8,4V69C54.72,70.88,58.36,80.25,60.2,86.4v8Z"
    />
  </svg>
);

export default function Blog() {
  const params = useParams();
  const id = params.id as string;
  const { data: requestedBlog, isLoading: requestedBlogIsLoading } =
    useGetBlogByIdQuery(id);
  const { data: blogStats, isLoading: blogStatsIsLoading } =
    useGetBlogStatsByIdQuery(id);

  if (requestedBlogIsLoading || blogStatsIsLoading) return <Spinner />;
  return (
    <div className="px-6 sm:px-20">
      <Link
        className="rounded-xl border-2 border-white border-opacity-50 bg-purple-500 px-3 py-2 transition-all hover:border-double hover:border-opacity-100 hover:bg-purple-600"
        to="/"
      >
        Back to Home Page
      </Link>
      <h1 className="font-satoshi-bold mt-8 text-center text-2xl sm:mt-4 sm:text-left">
        {requestedBlog?.title}
      </h1>
      <p className="font-satoshi-light-italic text-md text-center sm:text-left">
        by {requestedBlog?.author.username} -{" "}
        <span>{requestedBlog?.date.toString().slice(0, 10)}</span>
      </p>
      <hr className="my-6 bg-white opacity-50"></hr>
      <p>{requestedBlog?.body}</p>
      <div className="mt-8 flex">
        <button className="font-satoshi-bold flex items-center justify-center gap-x-3 rounded-bl-xl rounded-tl-xl border-2 border-white border-opacity-50 bg-purple-500 px-3 py-2 text-3xl transition-all hover:border-double hover:border-opacity-100 hover:bg-purple-600">
          {blogStats?.likes} {heart}
        </button>
        <button className="font-satoshi-bold flex items-center justify-center gap-x-3 rounded-br-xl rounded-tr-xl border-2 border-white border-opacity-50 bg-purple-500 px-3 py-2 text-3xl transition-all hover:border-double hover:border-opacity-100 hover:bg-purple-600">
          {dislike} {blogStats?.dislikes}
        </button>
      </div>
    </div>
  );
}
