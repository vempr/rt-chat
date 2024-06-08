import { ReactNode, createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  authStatusResponseSchema,
  AuthStatusResponse,
} from "../../shared/schemas/responseSchema";

interface ReactNodeProps {
  children: ReactNode;
}

type AuthStatusContextType = [
  AuthStatusResponse | undefined,
  boolean,
  Error | null,
];

const AuthStatusContext = createContext<AuthStatusContextType>([
  undefined,
  false,
  null,
]);

export default function AuthContextProvider({ children }: ReactNodeProps) {
  const { data, isLoading, error } = useQuery<AuthStatusResponse>({
    queryKey: ["authStatus"],
    queryFn: () =>
      fetch("http://localhost:5174/users/sign-in/status", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          authStatusResponseSchema.parse(data);
          return data;
        }),
  });

  return (
    <AuthStatusContext.Provider value={[data, isLoading, error]}>
      {children}
    </AuthStatusContext.Provider>
  );
}

export function useAuthContext(): AuthStatusContextType {
  const [data, isLoading, error] = useContext(AuthStatusContext);
  console.log(data, isLoading, error);
  return [data, isLoading, error];
}
