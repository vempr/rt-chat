import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BlogFormType,
  BlogMongoType,
} from "../../../shared/schemas/blogSchema";
import { BlogPostResponseData } from "../../../shared/schemas/responseSchema";

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

export const { useGetBlogsQuery, useGetBlogByIdQuery, usePostBlogMutation } =
  blogsApi;
export default blogsApi;
