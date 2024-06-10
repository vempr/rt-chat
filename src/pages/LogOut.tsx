import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutClientMutation } from "../app/api/usersApi";

export default function LogOut() {
  const navigate = useNavigate();
  const [logoutClient] = useLogoutClientMutation();

  useEffect(() => {
    const performLogout = async () => {
      await logoutClient(null);
      navigate("/");
      location.reload();
    };
    performLogout();
  }, []);

  return null;
}
