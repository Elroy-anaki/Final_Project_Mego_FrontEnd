import React from "react";
import { Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
  userEmail: Yup.string().email("Invalid email address").required("Invalid email address"),
  userPassword: Yup.string()
    .min(5, "Must have at least 5 characters")
    .required("Must have at least 5 characters"),
});

const initialUserValuse = {
  userEmail: "",
  userPassword: "",
};

function SignIn() {
  const { mutate:signIn} = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async (userData) => {
      try {
        const {data} = await axios.post(`/users/sign-in`,userData,{ withCredentials: true });
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

  return (
    <div className="font-[sans-serif] bg-white max-w-4xl flex items-center justify-center items mx-auto rounded-lg h-screen">
      <div className="grid grid- md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden ">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-rose-500 to-rose-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-center text-3xl font-semibold">
              Welcome!
            </h4>
            <p className="text-[13px] text-gray-300 mt-3 text-center text-base leading-relaxed">
              Welcome to our Sign In page, Enter your email and password!
            </p>
          </div>
        </div>
        <Formik
          initialValues={initialUserValuse}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            alert("yes")
            signIn(values);
            actions.resetForm()
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
              className="md:col-span-2 w-full py-6 px-6 sm:px-16"
            >
              <div className="mb-6">
                <h3 className="text-gray-800 text-2xl font-bold">
                  Welcome Back ! 😀
                </h3>
              </div>
              <div className=" ">
                <div className="my-5">
                  <label htmlFor="userEmail">Enter email</label>
                  <input
                    className="mt-2 text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    id="userEmail"
                    name="userEmail"
                    type="email"
                    placeholder="exapmle@gmail.com"
                    value={values.userEmail}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.userEmail && errors.userEmail ? (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.userEmail}
                    </div>
                  ) : null}
                </div>

                <div className="my-5">
                  <label htmlFor="userPassword">Enter password</label>
                  <input
                    className=" mt-2 text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    id="userPassword"
                    name="userPassword"
                    type="password"
                    placeholder="*******"
                    value={values.userPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.userPassword && errors.userPassword ? (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.userPassword}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col ">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 tracking-wider text-lg rounded-md text-black font-semibold  bg-gradient-to-r from-rose-800 to-rose-600  hover:bg-gradient-to-r hover:from-rose-500 hover:to-rose-400 "
                >
                  {isSubmitting ? "inProccess..." : "Sign In"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignIn;
