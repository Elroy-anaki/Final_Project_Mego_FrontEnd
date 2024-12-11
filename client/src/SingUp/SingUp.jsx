
// טופס מוכן כבר, שהתמשתי איתו עבור שיפור נראות עם אותה פונקצינלית! יש כאן שימוש בספריה של איקונים בשם 
// react-icons
// עבור כל איקון צבע ומידה
// שימוש בניהול 
// state 
// עבור פונקצית פתיחה וסגירה של העין עבור חווית משתמש

import React, { useState } from 'react';
import * as Yup from "yup";
import { useMutation } from '@tanstack/react-query';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash , FaUtensils } from "react-icons/fa";


function SingUp() {

  const [showPassword, setShowPassword] = useState(false);
  
  const Background_image = 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'

  const { mutate } = useMutation({
    mutationKey: ["SingUp"],
    mutationFn: async (data) => (await axios.post("http://localhost:3000/users/sign-up", data, { withCredentials: true })),
    onSuccess: (data) => (console.log(data)),
    onError: (error) => (console.log(error))
  });

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(2, "השם חייב להכיל לפחות 2 תווים")
      .max(20, "השם לא יכול להיות ארוך יותר מ-20 תווים")
      .required("שם הוא שדה חובה"),
    userEmail: Yup.string()
      .email("כתובת אימייל לא חוקית")
      .required("אימייל הוא שדה חובה"),
    userPassword: Yup.string()
      .min(5, "הסיסמה חייבת להכיל לפחות 5 תווים")
      .required("סיסמה היא שדה חובה"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    mutate(values);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div
  className="absolute top-0 left-0 w-full h-64 bg-cover bg-center"
  style={{ backgroundImage: `url(${Background_image})` }}
></div>


      <Formik
        initialValues={{
          userName: "",
          userEmail: "",
          userPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="relative bg-white/95 backdrop-blur-sm max-w-xl w-full mx-auto shadow-2xl p-8 rounded-3xl mt-32">
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
              <div className="bg-orange-500 p-5 rounded-full shadow-lg">
                <FaUtensils size={40} className="text-white" />
              </div>
            </div>

            <div className="mb-12 text-center">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Join Our Culinary Family
              </h3>
              <p className="text-gray-600 mt-2">Create your account to explore our delicious world</p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="userName" className="text-gray-700 text-sm font-medium block mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <Field
                    name="userName"
                    type="text"
                    className="w-full bg-white/50 text-gray-800 border border-gray-200 rounded-lg pl-12 pr-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    placeholder="Enter your name"
                  />
                  <FaUser className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <ErrorMessage name="userName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div>
                <label htmlFor="userEmail" className="text-gray-700 text-sm font-medium block mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Field
                    name="userEmail"
                    type="email"
                    className="w-full bg-white/50 text-gray-800 border border-gray-200 rounded-lg pl-12 pr-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    placeholder="Enter your email"
                  />
                  <FaEnvelope className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <ErrorMessage name="userEmail" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div>
                <label htmlFor="userPassword" className="text-gray-700 text-sm font-medium block mb-2">
                  Password
                </label>
                <div className="relative">
                  <Field
                    name="userPassword"
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-white/50 text-gray-800 border border-gray-200 rounded-lg pl-12 pr-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    placeholder="Create a password"
                  />
                  <FaLock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent border-none p-0"
                  >
                    {showPassword 
                    ? (<FaEyeSlash className="w-5 h-5 text-gray-400" />)
                    : (<FaEye className="w-5 h-5 text-gray-400" />)
                      }
                  </button>
                  <ErrorMessage name="userPassword" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700">
                  I accept the <a href="javascript:void(0);" className="text-orange-500 font-semibold hover:text-orange-600">Terms and Conditions</a>
                </label>
              </div> */}

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
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SingUp;