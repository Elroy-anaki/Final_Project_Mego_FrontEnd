import React from "react";
import { Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import validationSignInSchema from "../../../schemas/signInSchema";
import { Link } from "react-router-dom";



const initialUserValuse = {
  userEmail: "",
  userPassword: "",
};

function SignIn() {
  const { mutate:signIn} = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async (userData) => {
      try {
        const {data} = await axios.post(`/users/sign-in`,userData);
      console.log(data)
      return data;
      } catch (error) {
        throw error
      }
      
    },
    onSuccess: (data) => {
      alert(data.msg)
    },
    onError: (error) => {
      console.log(error.response.data)
    }
  });

  // return (

  //   <div className=" font-[sans-serif] bg-white max-w-4xl flex items-center justify-center items mx-auto rounded-xl my-14 border-2 border-rose-400">
  //     <div className="grid grid- md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden ">
  //       <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-500 to-gray-700 lg:px-8 px-4 py-4">
  //         <div>
  //           <h4 className="text-white text-center text-3xl font-semibold">
  //             Welcome!
  //           </h4>
  //           <p className="text-[13px] text-gray-300 mt-3 text-center text-base leading-relaxed">
  //             Welcome to our Sign In page, Enter your email and password!
  //           </p>
  //         </div>
  //       </div>
  //       <Formik
  //         initialValues={initialUserValuse}
  //         validationSchema={validationSignInSchema}
  //         onSubmit={async (values, actions) => {
  //           alert("yes")
  //           signIn(values);
  //           actions.resetForm()
  //         }}
  //       >
  //         {({
  //           values,
  //           handleChange,
  //           handleBlur,
  //           isSubmitting,
  //           handleSubmit,
  //           touched,
  //           errors,
  //         }) => (
  //           <form
  //             onSubmit={handleSubmit}
  //             className="md:col-span-2 w-full py-6 px-6 sm:px-16"
  //           >
  //             <div className="mb-6">
  //               <h3 className="text-gray-800 text-2xl font-bold">
  //                 Welcome Back ! 😀
  //               </h3>
  //             </div>
  //             <div className=" ">
  //               <div className="my-5">
  //                 <label htmlFor="userEmail">Enter email</label>
  //                 <input
  //                   className="mt-2 text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
  //                   id="userEmail"
  //                   name="userEmail"
  //                   type="email"
  //                   placeholder="exapmle@gmail.com"
  //                   value={values.userEmail}
  //                   onBlur={handleBlur}
  //                   onChange={handleChange}
  //                 />
  //                 {touched.userEmail && errors.userEmail ? (
  //                   <div className="text-red-500 text-sm mt-1">
  //                     {errors.userEmail}
  //                   </div>
  //                 ) : null}
  //               </div>

  //               <div className="my-5">
  //                 <label htmlFor="userPassword">Enter password</label>
  //                 <input
  //                   className=" mt-2 text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
  //                   id="userPassword"
  //                   name="userPassword"
  //                   type="password"
  //                   placeholder="*******"
  //                   value={values.userPassword}
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                 />
  //                 {touched.userPassword && errors.userPassword ? (
  //                   <div className="text-red-500 text-sm mt-1">
  //                     {errors.userPassword}
  //                   </div>
  //                 ) : null}
  //               </div>
  //             </div>
  //             <div className="flex flex-col ">
  //               <button
  //                 type="submit"
  //                 disabled={isSubmitting}
  //                 className="w-full py-3 px-4 tracking-wider text-lg rounded-md text-white font-semibold  bg-gradient-to-r from-gray-800 to-gray-600  hover:bg-gradient-to-r hover:from-rose-500 hover:to-rose-400 "
  //               >
  //                 {isSubmitting ? "inProccess..." : "Sign In"}
  //               </button>
  //             </div>
  //             <div className="w-3/4 mx-auto flex justify-center gap-3 my-3">
  //             <p>Oh No, Forgot Your Password?</p>
  //             <Link
  //             to={'/auth/forgot-password'}
  //             className="text-rose-700"
  //             >
  //             Reset here
  //             </Link>
  //             </div>
  //           </form>
            
  //         )}
  //       </Formik>
  //     </div>
  //   </div>
  // );

  return (
    <div className="bg-gradient-to-br flex items-center justify-center py-14">
      <Formik
        initialValues={initialUserValuse}
        validationSchema={validationSignInSchema}
        onSubmit={async (values, actions) => {
          alert("yes");
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
            className="relative bg-white/95 backdrop-blur-sm max-w-xl w-full mx-auto shadow-2xl p-8 rounded-3xl mt-2"
          >
            <div className="mb-12 text-center">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Welcome Back!
              </h3>
              <p className="text-gray-600 mt-2">
                Enter your email and password to continue.
              </p>
            </div>
  
            <div className="space-y-6">
              <div>
                <label htmlFor="userEmail" className="block text-gray-700 font-medium">
                  Email Address
                </label>
                <input
                  className="mt-2 text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
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
                <label htmlFor="userPassword" className="block text-gray-700 font-medium">
                  Password
                </label>
                <input
                  className="mt-2 text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
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
                className={`w-full py-3 px-6 text-white rounded-lg font-semibold tracking-wide ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-300 transform transition-all hover:scale-[1.02]"
                }`}
              >
                {isSubmitting ? "Processing..." : "Sign In"}
              </button>
  
              <div className="text-center text-gray-600 text-sm mt-4">
                <p>
                  Oh no, forgot your password?{" "}
                  <Link
                    to={"/auth/forgot-password"}
                    className="text-orange-500 font-semibold hover:text-orange-600"
                  >
                    Reset here
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
