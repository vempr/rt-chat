import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5174/users/",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  endpoints: (builder) => ({
    getAuthenticationStatus: builder.query({
      query: (body) => ({
        url: "sign-in/status",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetAuthenticationStatusQuery } = usersApi;
export default usersApi;
