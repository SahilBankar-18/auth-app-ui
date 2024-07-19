import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { handleError, handleSuccess } from "../utils/toaster";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password is required");
    }
    try {
      const url = "https://auth-app-api-two.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, error, jwtToken,name } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          Navigate("/home");
        }, 2000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="w-[100vw] flex justify-center items-center h-screen bg-zinc-800">
      <div className="h-[90vh] w-[40vw] border border-zinc-600 rounded-lg">
        <h1 className="text-3xl text-white font-semibold text-center py-4">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="w-full py-4 px-6 grid">
          
          <div className="text-white grid space-y-2 py-2">
            <label htmlFor="email" className="px-2 text-center">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              autoFocus
              name="email"
              value={loginInfo.email}
              placeholder="Enter your email..."
              className="rounded-xl p-2 bg-transparent text-white outline-none border border-zinc-500"
            />
          </div>
          <div className="text-white grid space-y-2 py-2">
            <label htmlFor="password" className="px-2 text-center">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={loginInfo.password}
              placeholder="Enter your password..."
              className="rounded-xl p-2 bg-transparent text-white outline-none border border-zinc-500"
            />
          </div>
          <div className="py-3 grid">
            <button
              type="submit"
              className="py-1 px-2   text-white rounded-lg hover:bg-green-600 bg-green-500"
            >
              Login
            </button>
          </div>
          <span className="text-white block">
            Don't have an account ?
            <Link to="/signup" className="text-blue-700 px-2">
              Sign-up
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
