
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from "axios";
import { Formik } from "formik";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { validationSchema } from '../schema';
import Input from './Input';


function SingUp() {

  const [showPassword, setShowPassword] = useState(false);


  const { mutate } = useMutation({
    mutationKey: ["SingUp"],
    mutationFn: async (data) => (await axios.post("http://localhost:3000/users/sign-up", data, { withCredentials: true })),
    onSuccess: (data) => (console.log(data.data)),
    onError: (error) => (console.log(error))
  });




  return (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-4">

      <Formik
        initialValues={{
          userName: "",
          userEmail: "",
          userPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          console.log(values);
          mutate(values);
          actions.resetForm()
        }}
      >
        {({
          isSubmitting,
          values,
          handleBlur,
          handleChange,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit} className="relative bg-white/95 backdrop-blur-sm max-w-xl w-full mx-auto shadow-2xl p-8 rounded-3xl mt-2">

            <div className="mb-12 text-center">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Join Our Culinary Family
              </h3>
              <p className="text-gray-600 mt-2">Create your account to explore our delicious world</p>
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
                  ${isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-300 transform transition-all hover:scale-[1.02]"
                  }`}
              >
                {isSubmitting ? "Creating Account..." : "Join Now"}
              </button>

              <p className="text-center text-gray-600 text-sm">
                Already have an account?{" "}
                <a href="javascript:void(0);" className="text-orange-500 font-semibold hover:text-orange-600">
                  Sign in
                </a>
              </p>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default SingUp;