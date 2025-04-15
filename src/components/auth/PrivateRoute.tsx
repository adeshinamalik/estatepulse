
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // You could render a loading spinner here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/manager" replace />;
  }

  // If authenticated, render the protected component
  return <Outlet />;
};
