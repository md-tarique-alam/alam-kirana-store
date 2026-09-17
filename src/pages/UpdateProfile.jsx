import axios from "axios";
import { useEffect, useState } from "react";

function UpdateProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [originalData, setOriginalData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("http://localhost:5000/users/profile", {
        withCredentials: true,
      });
      const user = res.data.user;
      setFormData(user);
      setOriginalData(user);
    } catch (error) {
      setError(error.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate() {
    try {
      const res = await axios.patch(
        "http://localhost:5000/users/update",
        formData,
        { withCredentials: true },
      );
      const updatedUser = res.data.user;
      setFormData(updatedUser);
      setOriginalData(updatedUser);
    } catch (error) {
      setError(error.response?.data?.message || "something went wrong");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdate();
  }

  function handleCancel() {
    setFormData(originalData);
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-100 px-4 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto">
        
        <div className="text-center mb-7">
          <div
            className="w-16 h-16 mx-auto mb-4
                        rounded-full bg-lime-100
                        flex items-center justify-center"
          >
            <span className="text-2xl font-bold text-lime-700">
              {formData.name?.charAt(0).toUpperCase()}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Edit Profile
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Update your personal information
          </p>
        </div>

        {error && (
          <div
            className="mb-5 px-4 py-3 rounded-xl
                        bg-red-50 border border-red-200
                        text-sm text-red-600"
          >
            {error}
          </div>
        )}

        <div
          className="bg-white rounded-2xl
                      border border-slate-200
                      shadow-sm p-5 sm:p-7"
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full px-4 py-3
                         bg-slate-50
                         border border-slate-200
                         rounded-xl
                         text-sm text-slate-800
                         outline-none
                         focus:bg-white
                         focus:border-lime-500
                         focus:ring-2 focus:ring-lime-100
                         transition"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full px-4 py-3
                         bg-slate-50
                         border border-slate-200
                         rounded-xl
                         text-sm text-slate-800
                         outline-none
                         focus:bg-white
                         focus:border-lime-500
                         focus:ring-2 focus:ring-lime-100
                         transition"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-7">
              <label
                htmlFor="mobile"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Mobile Number
              </label>

              <input
                id="mobile"
                type="tel"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mobile: e.target.value,
                  })
                }
                className="w-full px-4 py-3
                         bg-slate-50
                         border border-slate-200
                         rounded-xl
                         text-sm text-slate-800
                         outline-none
                         focus:bg-white
                         focus:border-lime-500
                         focus:ring-2 focus:ring-lime-100
                         transition"
                placeholder="Enter your mobile number"
              />
            </div>

            
            <div
              className="flex flex-col-reverse sm:flex-row
                          gap-3 sm:justify-end"
            >
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto
                         px-6 py-3
                         rounded-xl
                         border border-slate-300
                         bg-white
                         text-slate-700
                         text-sm font-semibold
                         hover:bg-slate-50
                         cursor-pointer
                         transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto
                         px-7 py-3
                         rounded-xl
                         bg-lime-600
                         text-white
                         text-sm font-semibold
                         hover:bg-lime-700
                         cursor-pointer
                         transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateProfile;
