import { useLocation, Outlet, Navigate } from "react-router-dom";
<<<<<<< HEAD

import { useUser } from "../utils/useUser";

const RequireAuth = ({ allowedRoles }: { allowedRoles: string }) => {
  const { data: user, isLoading } = useUser();
  console.log(user);

  const location = useLocation();

=======
import { useAuthData } from "../utils/useAuthData";

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { data: user, isLoading } = useAuthData();

  const location = useLocation();

  console.log("USER", user);

>>>>>>> 3e5a84627112bc37b0e696c6d2845fca6b87b760
  if (!user) {
    return null;
  }

  if (isLoading || user === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  console.log("allowedRoles", allowedRoles);
  const userRoles = user.role ? user.role.split(",") : [];
  const hasAllRoles = allowedRoles.every((role) => userRoles.includes(role));

  return hasAllRoles ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
