import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { authcontext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

function Authpage() {
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const { login } = useContext(authcontext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formdata);
    try {
      const res = await axios.post(
        "https://dummyjson.com/auth/login",
        formdata
      );
      login(res.data);
      navigate("/");
      console.log(res.data);
    } catch (error) {
      setError("something went wrong");
    }
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  //   username: emilys
  // password: emilyspass

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg"
      >
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Alam Kirana</h1>

          <p className="text-gray-500 mt-2 text-sm">
            Login to continue shopping
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email or Phone
            </label>

            <input
              type="text"
              value={formdata.username}
              onChange={(e) =>
                setFormData({
                  ...formdata,
                  username: e.target.value,
                })
              }
              placeholder="Enter your email or phone"
              className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-lime-600"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={formdata.password}
              onChange={(e) =>
                setFormData({
                  ...formdata,
                  password: e.target.value,
                })
              }
              placeholder="Enter your password"
              className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-lime-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-700 hover:bg-lime-800 text-white py-3 rounded-lg font-medium transition duration-200 cursor-pointer"
          >
            Login
          </button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?
          <span className="text-lime-700 font-medium cursor-pointer ml-1">
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Authpage;
