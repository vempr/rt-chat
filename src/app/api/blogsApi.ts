import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BlogMongoType } from "../../../shared/schemas/blogSchema";

interface GetBlogsResponse {
  blogs: BlogMongoType[];
}

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
    getBlogs: builder.query<GetBlogsResponse, null>({
      query: () => ({
        url: "/",
        method: "GET",
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

export const { useGetBlogsQuery } = blogsApi;
export default blogsApi;
