import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface LogoutData {
  err?: string;
  msg?: string;
}

export default function LogOut() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<LogoutData>({
    queryKey: ["logout"],
    queryFn: () =>
      fetch("http://localhost:5174/users/log-out", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
  });

  if (data) {
    navigate("/");
    location.reload();
  }
  if (!data && !isLoading) return <></>;
}
