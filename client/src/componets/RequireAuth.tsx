import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useAuthData } from "../utils/useAuthData";
import { useEffect } from "react";

const RequireAuth = ({ allowedRoles }: { allowedRoles: string }) => {
  const { data: user, isLoading } = useAuthData();

  const location = useLocation();

  useEffect(() => {
    console.log("USER", user);

    // Ensure that user data is loaded before making the comparison
    // if (!isLoading && user) {
    //   console.log("USER", user.role);
    //   console.log("USERallowedRoles", allowedRoles);
    //   console.log(
    //     "USER Compare",
    //     user.role && allowedRoles.includes(user.role)
    //   );
    // }
  }, [user]);

  if (!user) {
    return null;
  }

  if (isLoading || user === null) {
    return <Navigate to={"/login"} />;
  }

  return user.role && allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
