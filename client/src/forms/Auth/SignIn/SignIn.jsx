import React, { useContext } from "react";
import { Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import validationSignInSchema from "../../../schemas/signInSchema";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";



const initialUserValuse = {
  userEmail: "",
  userPassword: "",
};

function SignIn() {
  const { signIn } = useContext(AuthContext)

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center py-16">
      <Formik
        initialValues={initialUserValuse}
        validationSchema={validationSignInSchema}
        onSubmit={async (values, actions) => {
          signIn(values);
          actions.resetForm();
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          isSubmitting,
          handleSubmit,
          touched,
          errors,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="relative bg-white shadow-2xl max-w-lg w-full mx-auto rounded-3xl p-10 border-t-4 border-orange-500"
          >
            <div className="mb-8 text-center">
              <h3 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 via-amber-500 to-orange-700 bg-clip-text text-transparent">
                Welcome Back!
              </h3>
              
            </div>
  
            <div className="space-y-8">
              <div>
                <label
                  htmlFor="userEmail"
                  className="block text-gray-700 font-medium"
                >
                  Email Address
                </label>
                <input
                  className="mt-2 text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                  id="userEmail"
                  name="userEmail"
                  type="email"
                  placeholder="example@gmail.com"
                  value={values.userEmail}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.userEmail && errors.userEmail && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.userEmail}
                  </div>
                )}
              </div>
  
              <div>
                <label
                  htmlFor="userPassword"
                  className="block text-gray-700 font-medium"
                >
                  Password
                </label>
                <input
                  className="mt-2 text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                  id="userPassword"
                  name="userPassword"
                  type="password"
                  placeholder="*******"
                  value={values.userPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.userPassword && errors.userPassword && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.userPassword}
                  </div>
                )}
              </div>
  
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 text-white rounded-lg font-semibold tracking-wide ${isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-700 hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-300 transform transition-all hover:scale-105"
                  }`}
              >
                {isSubmitting ? "Processing..." : "Sign In"}
              </button>
  
              <div className="text-center text-gray-600 text-sm mt-4">
                <p>
                  Forgot your password? {" "}
                  <Link
                    to={"/auth/forgot-password"}
                    className="text-orange-500 font-semibold hover:text-orange-600"
                  >
                    Reset it here
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
  

}



export default SignIn;
