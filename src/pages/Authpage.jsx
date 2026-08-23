import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { authcontext } from "../context/Authcontext";
import { Link, useNavigate } from "react-router-dom";

function Authpage() {
  const [formdata, setFormData] = useState({
    identifiers : "",
    password: "",
  });

  const [error, setError] = useState();
  const { login } = useContext(authcontext);
  const navigate = useNavigate();

  async function loginData() {
    try {
      const res = await axios.post(
        "http://localhost:5000/users/login",
        formdata,
        {withCredentials:true}
      );
      login(res.data.user);
      
      if(res.data.user.role==="admin"){
        setTimeout(() => {
        navigate("/admin");
      }, 1000);
      }
      else{
        setTimeout(() => {
        navigate("/");
      }, 1000);
      }
    
    } catch (error) {
      setError("Invalid email/mobile or password");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    loginData();
  }

  //   username: emilys
  // password: emilyspass

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 px-4">
      {error && <h1>{error}</h1>}
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
              value={formdata.identifiers}
              onChange={(e) =>
                setFormData({
                  ...formdata,
                  identifiers: e.target.value,
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
            <Link to={"/signup"}>Sign up</Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Authpage;
