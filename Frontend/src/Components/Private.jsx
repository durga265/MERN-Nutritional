import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export default function Private({ Component }) {
  const { loggedUser } = useContext(UserContext);

  // If there's no loggedUser, redirect to login page
  if (!loggedUser) {
    return <Navigate to="/login" />;
  }

  // If loggedUser exists, render the protected component
  return <Component />;
}
