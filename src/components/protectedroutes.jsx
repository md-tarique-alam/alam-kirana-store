import { useContext } from "react";
import { authcontext } from "../context/Authcontext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isLoggedIn, authLoading } = useContext(authcontext)

 if (authLoading) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">
            <div className="rounded-xl bg-white px-6 py-5 text-sm font-medium text-slate-600 shadow-sm">
                Checking your account...
            </div>
        </div>
    );
}
 
  return isLoggedIn ? children : <Navigate to={"/login"} />;
}
export default ProtectedRoute;
