import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


interface ProtectedRouteProps {
  allowedRoles: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const role = useSelector((state: RootState) => state.role.role);

  
  if (!allowedRoles.includes(role!)) {
    return <Navigate to="/" />;
  }

  
  return <Outlet />;
};

