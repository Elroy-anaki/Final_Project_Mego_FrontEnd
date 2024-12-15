import { createContext } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from "axios";
import { useState, } from "react";
import RestaurantProvider from "./RestaurantContex";
import { notifyError, notifySuccess } from "../lib/Toasts";



export const AuthContext = createContext()

function AuthProvider({ children }) {

    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState(null)


    const { data, error, isLoading } = useQuery({
        queryKey: ['verifyToken'],
        queryFn: async () => {
            try {
                const { data } = await axios.get('/auth/verify-token');
                console.log("data", data);  
                console.log(data.success);
                setIsAuth(data.success)
                setUser(data.data.payload)
                return data;

            } catch (error) {
                console.log("error", error);
                throw error;
            }

        },
        staleTime: 1000 * 60
    });

    const { mutate: signIn } = useMutation({
        mutationKey: ["signIn"],
        mutationFn: async (data) => (await axios.post(`/users/sign-in`, data)),
        onSuccess: (data) => {
            console.log("SSSS", data.data.data.userName)
            setIsAuth(true)
            setUser(data.data.data)

            console.log(data.data.msg)
        },
        onError: (error) => {
            console.log(error.response.data)
        }
    });

    const { mutate: signUp } = useMutation({
        mutationKey: ["SingUp"],
        mutationFn: async (data) => (await axios.post("/users/sign-up", data)),
        onSuccess: (data) => {
            console.log(data.data)
            notifySuccess('Welcome! Check your email...')
        },
        onError: (error) => {
            console.log(error)
            notifyError(error)
        }
    });

    const { refetch: signOut, data: signOutData, } = useQuery({
        queryKey: ["signOut"],
        queryFn: async () => {
            try {
                const { data } = await axios.get('/auth/sign-out')
                console.log(data);
                setIsAuth(false);
            } catch (error) {
                console.log(error);
                alert(data)
            }
        },
        enabled: false,

    });

    const { mutate: verifyEmail } = useMutation({
        mutationKey: ['verifyEmail'],
        mutationFn: async (userId) => (await axios.get(`/auth/email-verification?userId=${userId}&type=user`)),
        onSuccess: (data) => {
            notifySuccess("verify")
            console.log(data)
        },
        onError: (error) => console.log(error),
    })

    const authGlobalState = {
        isAuth,
        setIsAuth,
        signUp,
        signIn,
        signOut,
        verifyEmail,
        user
    }

    return (
        <RestaurantProvider>
            <AuthContext.Provider value={authGlobalState}>
                {children}
            </AuthContext.Provider>
        </RestaurantProvider>

    )
}
export default AuthProvider;