import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../config/apiconfig";

function RegisterPage() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", formData);
      console.log(response.data);
      if (response.status === 201) {
        alert("Register success");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
  });

  return (
    <div className="h-screen bg-blue-500 flex items-center justify-center">
      <div className="h-fit w-[400px] p-7 bg-white rounded-2xl shadow-lg">
        <div className="text-slate-800 text-center text-2xl font-bold mb-6">
          Register
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full px-4 py-2 mb-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              required
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="text-slate-800 text-sm font-medium mt-2">
          Already have an account?
          <span
            className="underline-offset-4 text-blue-500 hover:text-blue-950 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            LOGIN
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
