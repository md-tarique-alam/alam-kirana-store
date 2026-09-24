import axios from "axios";
import { useContext, useState } from "react";
import { authcontext } from "../context/Authcontext";
import { Link, useNavigate } from "react-router-dom";

function Authpage() {
  const [formdata, setFormData] = useState({
    identifiers: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(authcontext);
  const navigate = useNavigate();

  async function loginData() {
    try {
      setError("");

      const res = await axios.post(
        "http://localhost:5000/users/login",
        formdata,
        { withCredentials: true }
      );

      login(res.data.user);

      if (res.data.user.role === "admin") {
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setError("Invalid email/mobile or password");

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    loginData();
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:py-12 flex items-center justify-center">
      <div className="w-full max-w-md">

   
        <div className="text-center mb-7">

          <div className="inline-flex items-center justify-center mb-4 px-5 py-2 rounded-full bg-lime-100 border border-lime-200 shadow-sm">
            <span className="text-xl sm:text-2xl font-bold text-lime-700">
              Alam Kirana
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Login to Your Account
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Enter your details to continue shopping
          </p>

        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7">

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label
                htmlFor="identifiers"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Email or Mobile
              </label>

              <input
                id="identifiers"
                type="text"
                value={formdata.identifiers}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    identifiers: e.target.value,
                  })
                }
                placeholder="Enter your email or mobile"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200
                           bg-slate-50 text-slate-800 text-sm
                           placeholder:text-slate-400
                           outline-none
                           focus:bg-white focus:border-lime-500
                           focus:ring-2 focus:ring-lime-100
                           transition"
              />
            </div>

            <div>

              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formdata.password}
                  onChange={(e) =>
                    setFormData({
                      ...formdata,
                      password: e.target.value,
                    })
                  }
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 pr-16 rounded-xl border border-slate-200
                             bg-slate-50 text-slate-800 text-sm
                             placeholder:text-slate-400
                             outline-none
                             focus:bg-white focus:border-lime-500
                             focus:ring-2 focus:ring-lime-100
                             transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                             text-xs font-semibold text-slate-500
                             hover:text-lime-600 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

             
              <div className="mt-2 text-right">

                <Link
                  to="/forgot-password"
                  className="text-xs sm:text-sm font-medium text-lime-700
                             hover:text-lime-800 transition"
                >
                  Forgot password?
                </Link>

              </div>

            </div>

           
            <button
              type="submit"
              className="w-full bg-lime-600 hover:bg-lime-700
                         text-white py-2.5 rounded-xl
                         text-sm font-semibold
                         shadow-sm hover:shadow
                         transition duration-200
                         cursor-pointer"
            >
              Login
            </button>

          </form>

          <div className="text-center mt-6 pt-5 border-t border-slate-100">

            <p className="text-sm text-slate-500">
              Don't have an account?{" "}

              <Link
                to="/signup"
                className="font-semibold text-lime-700
                           hover:text-lime-800 transition"
              >
                Sign up
              </Link>
            </p>

          </div>

        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Fresh groceries, simple shopping — Alam Kirana Store.
        </p>

      </div>
    </div>
  );
}

export default Authpage;