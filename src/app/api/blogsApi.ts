import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5174/blogs/",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    // getBlogCommentsById: builder.query({
    //   query: (id: string) => ({
    //     url: `comments/${id}`,
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const { useGetBlogsQuery } = blogsApi;
export default blogsApi;
