import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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

      setSuccess("Congratulation! you've successfully registered");

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

  function handlesubmit(e) {
    e.preventDefault();
    if (
      !signup.name ||
      !signup.email ||
      !signup.mobile ||
      !signup.password ||
      !signup.confirmPassword
    ) {
      alert("please fill all field");
      return;
    }

    if (signup.mobile.length !== 10) {
      alert("Please enter valid 10 digit mobile number");
      return;
    }

    if (signup.password !== signup.confirmPassword) {
      alert("password not matched");
      return;
    }
    postSignup();
  }

  return (
    <div>
      <h1>Signup page</h1>

      {error && <h1>{error}</h1>}
      {success && <h1>{success}</h1>}

      <form onSubmit={handlesubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={signup.name}
          onChange={(e) => setSignup({ ...signup, name: e.target.value })}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={signup.email}
          onChange={(e) => setSignup({ ...signup, email: e.target.value })}
        />

        <label htmlFor="mobile">Mobile Number</label>
        <input
          id="mobile"
          type="number"
          value={signup.mobile}
          onChange={(e) => setSignup({ ...signup, mobile: e.target.value })}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={signup.password}
          onChange={(e) => setSignup({ ...signup, password: e.target.value })}
        />

        <label htmlFor="confirmpass">Confirm Password</label>
        <input
          id="confirmpass"
          type="password"
          value={signup.confirmPassword}
          onChange={(e) =>
            setSignup({ ...signup, confirmPassword: e.target.value })
          }
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
