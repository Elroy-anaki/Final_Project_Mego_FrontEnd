import React from "react";
import { Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
  userEmail: Yup.string().email("Invalid email address").required("must"),
  userPassword: Yup.string()
    .min(5, "Must have at least 5 characters")
    .required("must"),
});

const initialUserValuse = {
  userEmail: "",
  userPassword: "",
};
function SignIn() {
  const { mutate , isError , isSuccess , data} = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async (userData) => {
      await axios.post(`http://localhost:3000/users/sign-in`,userData,{ withCredentials: true });
    },
    onSuccess(data){
        alert ( "success")
    },
    onError(){
        alert("noooot")
    }
  });
  const sendToServer = async (newUserData) => {
    console.log(newUserData);
    try {
      
      mutate(newUserData)

      
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <div className="font-[sans-serif] bg-white max-w-4xl flex items-center justify-center items mx-auto rounded-lg h-screen">
      <div className="grid grid- md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden ">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-sky-950 to-sky-800 lg:px-8 px-4 py-4">
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
          onSubmit={async (valuse, actions) => {
            alert("yes");
            console.log("aaannn", valuse);
            console.log(actions);
            await sendToServer(valuse);
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
                  Hi Employee, Sign In Please 😀
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
                  // disabled={isSubmitting}
                  className="w-full py-3 px-4 tracking-wider text-lg rounded-md text-white font-semibold  bg-gradient-to-r from-sky-900 via-sky-700 to-sky-900 hover:text-gray-300  focus:outline-none"
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
