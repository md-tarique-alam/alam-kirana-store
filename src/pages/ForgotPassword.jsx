import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "https://alam-kirana-backend.onrender.com/users/forgot-password",
        { email },
        { withCredentials: true }
      );

      setSuccess(res.data.message);
      setEmail("");
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
            Reset your account password
          </p>
        </div>

        
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

          <div className="mb-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-lime-50 text-xl">
              🔐
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              Forgot password?
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Enter your registered email and we'll send you a
              password reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
            />

            
            {error && (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

           
            {success && (
              <p className="mt-3 rounded-lg bg-lime-50 px-3 py-2 text-sm text-lime-700">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full rounded-xl bg-lime-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-lime-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
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
          You will receive a secure password reset link by email.
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;