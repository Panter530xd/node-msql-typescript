import { useLocation, Outlet, Navigate } from "react-router-dom";

import { useUser } from "../utils/useUser";

const RequireAuth = ({ allowedRoles }: { allowedRoles: string }) => {
  const { data: user, isLoading } = useUser();
  console.log(user);

  const location = useLocation();

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
