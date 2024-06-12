import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BlogFormType,
  BlogMongoType,
} from "../../../shared/schemas/blogSchema";
import {
  BlogPostResponseData,
  GeneralResponseData,
} from "../../../shared/schemas/responseSchema";

// type StatsResponseData = {
//   likes: number;
//   dislikes: number;
// };

type RateBlogRequestParams = {
  id: string;
  action: "like" | "dislike" | "unlike" | "undislike";
};

const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5174/blogs",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogMongoType[], null>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    getBlogById: builder.query<BlogMongoType, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    // getBlogStatsById: builder.query<StatsResponseData, string>({
    //   query: (id: string) => ({
    //     url: `/${id}/stats`,
    //     method: "GET",
    //   }),
    // }),
    rateBlog: builder.mutation<GeneralResponseData, RateBlogRequestParams>({
      query: (params: RateBlogRequestParams) => ({
        url: `/${params.id}/${params.action}`,
        method: "POST",
      }),
    }),
    postBlog: builder.mutation<BlogPostResponseData, BlogFormType>({
      query: (blog: BlogFormType) => ({
        url: "/",
        method: "POST",
        body: blog,
      }),
    }),
    // getBlogCommentsById: builder.query({
    //   query: (id: string) => ({
    //     url: `/comments/${id}`,
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useRateBlogMutation,
  usePostBlogMutation,
} = blogsApi;
export default blogsApi;
