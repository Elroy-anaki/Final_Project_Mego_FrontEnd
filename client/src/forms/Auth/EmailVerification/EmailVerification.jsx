import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { notifySuccess } from '../../../lib/Toasts'
import { AuthContext } from '../../../contexts/AuthContext'

function EmailVerification() {

    const navigate = useNavigate();
    const { userId } = useParams();

    const {verifyEmail} = useContext(AuthContext)


    

    return (
        <div className="flex flex-col items-center h-screen pt-10 bg-gray-800 text-white">
            <h1 className="text-5xl text-center font-bold mb-8">
                Click the Button Below to Verify Your Email
            </h1>
            <button
                onClick={() => {
                    verifyEmail(userId);
                    navigate('/auth/sign-in')
                }}
                className="bg-amber-500 text-black font-medium px-6 py-3 rounded-lg hover:bg-amber-600 hover:text-white transition-all duration-300 shadow-md"
            >
                Verify Email
            </button>
        </div>

    )
}

export default EmailVerification
