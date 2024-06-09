import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthStatusResponse,
  GeneralResponse,
} from "../../../shared/schemas/responseSchema";

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
    getAuthenticationStatus: builder.query<AuthStatusResponse, null>({
      query: () => ({
        url: "/sign-in/status",
        method: "POST",
      }),
    }),
    changePasswordWithId: builder.mutation<GeneralResponse, ChangePasswordBody>(
      {
        query: ({ id, oldPassword, newPassword }: ChangePasswordBody) => ({
          url: `/${id}/change-password`,
          method: "PATCH",
          body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
          }),
        }),
      }
    ),
  }),
});

export const {
  useGetAuthenticationStatusQuery,
  useChangePasswordWithIdMutation,
} = usersApi;
export default usersApi;
