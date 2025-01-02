import { createContext, useEffect } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from "axios";
import { useState, } from "react";
import RestaurantProvider from "./RestaurantContex";
import { notifyError, notifySuccess } from "../lib/Toasts";
import MenuProvider from './MenuContext'
import OrderDetailsProvider from "./OrderDetailsContext";
import TableProvider from "./TableContext";
import FullOrderProvider from "./FullOrderContext";
import { GoogleOAuthProvider } from '@react-oauth/google';


const CLIENT_ID = "941180979275-pn53d30kqqqrnf8uqgorcbvrrfqvdfrr.apps.googleusercontent.com"

export const AuthContext = createContext()

function AuthProvider({ children }) {

    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState(null)

    const { data } = useQuery({
        queryKey: ['verifyToken'],
        queryFn: async () => {
            try {
                const { data } = await axios.get('/auth/verify-token');
                console.log("data", data);
                console.log(data.data.payload);
                setIsAuth(data.success)
                setUser(data.data.payload)
                return data;

            } catch (error) {
                console.log("error", error);
                throw error;
            }
        },
        staleTime: 1000 * 60000,
        refetchOnMount: false,
        retry: 1
    });

    const { mutateAsync: signIn } = useMutation({
        mutationKey: ["signIn"],
        mutationFn: async (data) => (await axios.post(`/users/sign-in`, data)),
        onSuccess: (data) => {
            console.log(data.data.data.userName)
            setIsAuth(true)
            console.log(data.data.data)
            setUser(data.data.data)
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
                setUser(null)
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
    });

    useEffect(() => {
        console.log(user)
    })


    const authGlobalState = {
        user,
        isAuth,
        setIsAuth,
        signUp,
        signIn,
        signOut,
        verifyEmail,
    }

    return (
        <AuthContext.Provider value={authGlobalState}>
            <RestaurantProvider>
                <MenuProvider>
                    <OrderDetailsProvider>
                        <TableProvider>
                            <FullOrderProvider>
                                <GoogleOAuthProvider clientId={CLIENT_ID}>
                                {children}
                                </GoogleOAuthProvider>
                            </FullOrderProvider>
                        </TableProvider>
                    </OrderDetailsProvider>
                </MenuProvider>
            </RestaurantProvider>
        </AuthContext.Provider>


    )
}
export default AuthProvider;