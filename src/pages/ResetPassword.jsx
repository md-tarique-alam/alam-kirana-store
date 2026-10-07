import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
const { token } = useParams();
const navigate = useNavigate();

const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState("");
const [error, setError] = useState("");

async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

  try {
      const res = await axios.post(
        `https://alam-kirana-backend.onrender.com/users/reset-password/${token}`,
        {
          password,
        },
        {
          withCredentials: true,
        }
      );

      setSuccess(res.data.message);

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

      
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Alam <span className="text-lime-600">Kirana</span>
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create a new password for your account
          </p>
        </div>

       
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

         
          <div className="mb-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-lime-50 text-xl">
              🔑
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              Reset password
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Enter your new password below. Make sure both passwords
              match.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

           
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                New password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-16 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-lime-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

           
            <div className="mt-4">
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Confirm password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm your password"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-16 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-lime-600"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

         
            {success && (
              <p className="mt-4 rounded-lg bg-lime-50 px-3 py-2 text-sm text-lime-700">
                {success}
              </p>
            )}

      
            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full rounded-xl bg-lime-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-lime-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>

        
          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 transition hover:text-lime-600"
            >
              ← Back to Login
            </Link>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Your reset link is valid for 15 minutes.
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;