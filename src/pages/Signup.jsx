import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function postSignup() {
    const userData = {
      name: signup.name,
      email: signup.email,
      mobile: signup.mobile,
      password: signup.password,
    };

    setLoading(true);

    try {
      setError("");
      setSuccess("");

      await axios.post("http://localhost:5000/users/signup", userData);

      setSuccess("Congratulations! You've successfully registered.");

      setSignup({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setSuccess("");

      setError(error.response?.data?.message || "Something went wrong");

      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  function showError(message) {
    setError(message);

    setTimeout(() => {
      setError("");
    }, 5000);
  }

  function handlesubmit(e) {
    e.preventDefault();

    if (
      !signup.name ||
      !signup.email ||
      !signup.mobile ||
      !signup.password ||
      !signup.confirmPassword
    ) {
      showError("Please fill all fields");
      return;
    }

    if (!/^\d{10}$/.test(signup.mobile)) {
      showError("Please enter a valid 10 digit mobile number");
      return;
    }

    if (signup.password !== signup.confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    postSignup();
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:py-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center mx-auto mb-4 px-5 py-2.5 rounded-full bg-lime-100 border border-lime-200">
            <span className="text-xl sm:text-2xl font-bold text-lime-700">
              Alam Kirana
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Sign up to start shopping at Alam Kirana Store
          </p>
        </div>

        {error && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-lime-50 border border-lime-200 text-sm text-lime-700">
            {success}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7">
          <form onSubmit={handlesubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={signup.name}
                onChange={(e) =>
                  setSignup({
                    ...signup,
                    name: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200
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
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={signup.email}
                onChange={(e) =>
                  setSignup({
                    ...signup,
                    email: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200
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
                htmlFor="mobile"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Mobile Number
              </label>

              <input
                id="mobile"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="10 digit mobile number"
                value={signup.mobile}
                onChange={(e) =>
                  setSignup({
                    ...signup,
                    mobile: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200
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

              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={signup.password}
                onChange={(e) =>
                  setSignup({
                    ...signup,
                    password: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200
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
                htmlFor="confirmpass"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Confirm Password
              </label>

              <input
                id="confirmpass"
                type="password"
                placeholder="Confirm your password"
                value={signup.confirmPassword}
                onChange={(e) =>
                  setSignup({
                    ...signup,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200
                           bg-slate-50 text-slate-800 text-sm
                           placeholder:text-slate-400
                           outline-none
                           focus:bg-white focus:border-lime-500
                           focus:ring-2 focus:ring-lime-100
                           transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 rounded-lg
                         bg-lime-600 text-white
                         text-sm font-semibold
                         hover:bg-lime-700
                         disabled:bg-lime-400
                         disabled:cursor-not-allowed
                         transition"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-6 pt-5 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold text-lime-700 hover:text-lime-800 cursor-pointer transition"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
