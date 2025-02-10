import React, { useContext, useState } from "react";
import { Formik } from "formik";
import { AuthContext } from '../context/AuthContext';
import { notifyError, notifySuccess } from "../lib/Toasts";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from "axios";


import { validationEditProfileSchema } from '../schemas/userForms';



import Input from "../forms/Auth/SingUp/Input";


function ProfileModal() {
    const { user, setUser } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);

    const { mutate: editUserDetails } = useMutation({
        mutationKey: ['editUserDetails'],
        mutationFn: async (data) => await axios.put(`/users/edit-user-details/${data._id}`, data, { withCredentials: true }),
        onSuccess: (data) => {
            console.log(data.data.msg)
            console.log("AAA", data.data.data)
            setUser(data.data.data)
            notifySuccess(data.data.msg)
        },
        onError: (error) => {
            console.log(error.response.data)
            notifyError(error.response.data.msg)

        }
    })



    return (
        <div>
          <dialog id="profileModal" className="modal">
            <div className="modal-box w-11/12 max-w-lg rounded-2xl shadow-lg">
              {/* כפתור לסגירת המודל */}
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById('profileModal').close()}
              >
                ✕
              </button>
      
              {/* כותרת המודל */}
              <h2 className="text-2xl font-bold text-center mb-5">Edit Your Profile</h2>
      
              {/* תוכן המודל */}
              <Formik
                initialValues={user}
                validationSchema={validationEditProfileSchema}
                enableReinitialize={true}
                onSubmit={async (values, actions) => {
                  editUserDetails(values);
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
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* שם מלא */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Full Name</span>
                      </label>
                      <input
                        type="text"
                        name="userName"
                        id="userName"
                        value={values?.userName}
                        placeholder="Enter your name"
                        required
                        className="input input-bordered w-full"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.userName && errors.userName && (
                        <span className="text-sm text-error">{errors.userName}</span>
                      )}
                    </div>
      
                    {/* אימייל */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email Address</span>
                      </label>
                      <input
                        type="email"
                        name="userEmail"
                        id="userEmail"
                        value={values?.userEmail}
                        placeholder="Enter your email"
                        required
                        className="input input-bordered w-full"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.userEmail && errors.userEmail && (
                        <span className="text-sm text-error">{errors.userEmail}</span>
                      )}
                    </div>
      
                    {/* סיסמה */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="userPassword"
                          id="userPassword"
                          value={values?.userPassword}
                          placeholder="Create a password"
                          className="input input-bordered w-full pr-10"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {touched.userPassword && errors.userPassword && (
                        <span className="text-sm text-error">{errors.userPassword}</span>
                      )}
                    </div>
      
                    {/* כפתור שמירה */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn w-full ${
                        isSubmitting
                          ? "btn-disabled"
                          : "btn-primary bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                      }`}
                    >
                      {isSubmitting ? "Saving Changes..." : "Save Changes"}
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </dialog>
        </div>
      );
      }

export default ProfileModal
