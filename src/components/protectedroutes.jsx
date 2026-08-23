import { useContext } from "react";
import { authcontext } from "../context/Authcontext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(authcontext)
 

  return isLoggedIn ? children : <Navigate to={"/login"} />;
}
export default ProtectedRoute;
