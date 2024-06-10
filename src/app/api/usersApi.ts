import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthStatusResponseData,
  GeneralResponseData,
} from "../../../shared/schemas/responseSchema";
import { UserType } from "../../../shared/schemas/userSchema";

interface ChangePasswordBody {
  id: string;
  oldPassword: string;
  newPassword: string;
}

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5174/users",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  endpoints: (builder) => ({
    getAuthenticationStatus: builder.query<AuthStatusResponseData, null>({
      query: () => ({
        url: "/sign-in/status",
        method: "POST",
      }),
    }),
    signupClient: builder.mutation<GeneralResponseData, UserType>({
      query: (user: UserType) => ({
        url: "/sign-up",
        method: "POST",
        body: user,
      }),
    }),
    signinClient: builder.mutation<GeneralResponseData, UserType>({
      query: (user: UserType) => ({
        url: "/sign-in",
        method: "POST",
        body: user,
      }),
    }),
    logoutClient: builder.mutation<GeneralResponseData, null>({
      query: () => ({
        url: "/log-out",
        method: "POST",
      }),
    }),
    changePasswordWithId: builder.mutation<
      GeneralResponseData,
      ChangePasswordBody
    >({
      query: ({ id, oldPassword, newPassword }: ChangePasswordBody) => ({
        url: `/${id}/change-password`,
        method: "PATCH",
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      }),
    }),
  }),
});

export const {
  useGetAuthenticationStatusQuery,
  useSignupClientMutation,
  useSigninClientMutation,
  useLogoutClientMutation,
  useChangePasswordWithIdMutation,
} = usersApi;
export default usersApi;
