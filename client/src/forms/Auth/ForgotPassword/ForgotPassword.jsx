import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { notifySuccess } from '../../../lib/Toasts.jsx'

function ForgotPassword() {
  const sendforgotPasswordEmail = async (e) => {
    e.preventDefault();
    notifySuccess("Check Your Email...");
    console.log(e.target.email.value);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/forgot-user-password",
        { email: e.target.email.value }
      );
      console.log(data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center w-full mx-auto p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl border border-sky-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-600 to-orange-400 text-white p-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Forgot Your Password?
          </h1>
        </div>
        <form onSubmit={sendforgotPasswordEmail} className="p-8 space-y-6">
          <div className="space-y-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full text-lg bg-gradient-to-r from-orange-600 to-orange-400 text-white py-3 rounded-lg hover:from-orange-500 hover:to-orange-300 transition duration-300 ease-in-out transform hover:scale-[1.02] shadow-md"
          >
            Send Password Reset Link
          </button>
        </form>
        <div className="text-center text-sm text-gray-500 pb-6">
          Remember your password?{" "}
          <Link
            to={"/auth/sign-in"}
            className="text-orange-500 font-semibold hover:underline ml-1"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
