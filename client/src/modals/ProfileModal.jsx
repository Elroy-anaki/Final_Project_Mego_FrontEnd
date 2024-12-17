import React, { useContext, useState } from "react";
import { Formik } from "formik";
import { AuthContext } from '../Contexts/AuthContext';
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
            <dialog id="profileModal" className="modal w-[40%] rounded-2xl shadow-2xl ">
                <div className="text-right mr-2 text-lg"
                    onClick={() => document.getElementById('profileModal').close()}>
                    X
                </div>
                <div className="modal-box w-11/12 max-w-5xl mx-auto ">

                    <div className="modal-action">
                        <Formik
                            initialValues={user}
                            validationSchema={validationEditProfileSchema}
                            enableReinitialize={true}
                            onSubmit={async (values, actions) => {
                                 editUserDetails(values)
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
                                    className="space-y-5 my-4 mb-10"
                                    method="dialog">
                                    <h1 className="text-center text-4xl">Edit Your Profile</h1>
                                    <Input
                                        type="text"
                                        name="userName"
                                        id="userName"
                                        value={values?.userName}
                                        placeholder="Enter your name"
                                        required=""
                                        label={"Full Name"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        Icon={FaUser} />
                                    <Input
                                        type="email"
                                        name="userEmail"
                                        id="userEmail"
                                        value={values?.userEmail}
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
                                        value={values?.userPassword}
                                        placeholder="Create a password"
                                        label={"Password"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        Icon={FaLock}
                                        FaEyeSlash={FaEyeSlash}
                                        FaEye={FaEye}
                                        showPassword={showPassword}
                                        setShowPassword={setShowPassword}
                                    />
                                    {/* if there is a button, it will close the modal */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-3 px-6 text-white rounded-lg font-semibold tracking-wide 
                                    ${isSubmitting
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-300 transform transition-all hover:scale-[1.02]"
                                            }`}
                                    >
                                        {isSubmitting ? "Saving Changes..." : "Save Changes"}
                                    </button>
                                </form>)}
                        </Formik>

                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ProfileModal
