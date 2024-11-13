import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "../components/layout/ErrorMessage";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      {allowedRoles?.includes(user?.role ?? "") ? (
        children
      ) : (
        <ErrorMessage error="Unauthorized user" />
      )}
    </>
  );
};

export default ProtectedRoute;
