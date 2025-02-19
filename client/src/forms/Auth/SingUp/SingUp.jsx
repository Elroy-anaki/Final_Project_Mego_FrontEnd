import React, { useContext, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import { Formik } from "formik";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { validationSingUpSchema } from "../../../schemas/userForms";
import Input from "./Input";
import { AuthContext } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function SingUp() {
  const { signUp, signIn, signUpGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function signUpWithGoogle(credentials) {
    const signUpValues = {
      userName: credentials.name,
      userEmail: credentials.email,
      userPassword: credentials.sub,
      verify: true,
    };

    await signUpGoogle(signUpValues);
    console.log("Sign-up successful");
  }

  function handlelogout() {
    googleLogout();
  }

  return (
    <div className=" bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800  flex items-center justify-center py-3">
      <Formik
        initialValues={{
          userName: "",
          userEmail: "",
          userPassword: "",
        }}
        validationSchema={validationSingUpSchema}
        onSubmit={async (values, actions) => {
          console.log(values);
          signUp(values);
          actions.resetForm();
          navigate("/auth/sign-in");
        }}
      >
        {({ isSubmitting, values, handleBlur, handleChange, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="relative bg-white/95 backdrop-blur-sm max-w-xl w-full mx-auto shadow-2xl border-t-4 border-orange-500 p-8 rounded-3xl "
          >
            <div className="mb-12 text-center">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Join Our Culinary Family
              </h3>
              <p className="text-gray-600 mt-2">
                Create your account to explore our delicious world
              </p>
            </div>

            <div className="space-y-6">
              <Input
                type="text"
                name="userName"
                id="userName"
                value={values.userName}
                placeholder="Enter your name"
                required=""
                label={"Full Name"}
                onBlur={handleBlur}
                onChange={handleChange}
                Icon={FaUser}
              />

              <Input
                type="email"
                name="userEmail"
                id="userEmail"
                value={values.userEmail}
                placeholder="Enter your email"
                required=""
                label={"Email Address"}
                onBlur={handleBlur}
                onChange={handleChange}
                Icon={FaEnvelope}
              />

              <Input
                type={showPassword ? "text" : "password"}
                name="userPassword"
                id="userPassword"
                value={values.userPassword}
                placeholder="Create a password"
                required=""
                label={"Password"}
                onBlur={handleBlur}
                onChange={handleChange}
                Icon={FaLock}
                FaEyeSlash={FaEyeSlash}
                FaEye={FaEye}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 text-white rounded-lg font-semibold tracking-wide 
                  ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-300 transform transition-all hover:scale-[1.02]"
                  }`}
              >
                {isSubmitting ? "Creating Account..." : "Join Now"}
              </button>
              <button className="w-full py-3 px-6 text-white rounded-lg font-semibold tracking-wide flex justify-center items-center">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    signUpWithGoogle(jwtDecode(credentialResponse.credential));

                    navigate("/auth/sign-in");
                  }}
                  onError={() => console.log("Login failed")}
                  auto_select={true}
                  size="large"
                  shape="circle"
                  logo_alignment="left"
                  login_uri=""
                />
                {/* <FcGoogle className="w-5 h-5" />
                Sign up with Google */}
              </button>

              <p className="text-center text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  to={"/auth/sign-in"}
                  className="text-orange-500 font-semibold hover:text-orange-600"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default SingUp;
