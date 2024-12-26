import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";



export const OrderDetailsContext = createContext()


function OrderDetailsProvider({children}){

    const [orderDetails, setOrderDetails] = useState(null)
    const [remainingSeats, setRemainingSeats] = useState([])

    const { mutateAsync: getRemainingSeats } = useMutation({
        mutationKey: ['getRemainingSeats'],
        mutationFn: async (data) => await axios.post(`/restaurant/get-remaining-seats`, data),
        onSuccess: (data) => {
            const numberOfEaters = []
            for (let i = 1; i <= data.data.data[0].remaining; i++)numberOfEaters.push(i)
            console.log(numberOfEaters);
            setRemainingSeats(numberOfEaters)
            console.log(data)
            return data.data.data[0].remaining
        }
    })

    useEffect(() => {
        const numberOfEaters = []
            for (let i = 1; i <= 50; i++)numberOfEaters.push(i)
            console.log(numberOfEaters);
            setRemainingSeats(numberOfEaters)
    }, [])

    const OrderDetailsGlobalState = {
        setOrderDetails,
        setRemainingSeats,
        orderDetails,
        remainingSeats,
        getRemainingSeats

    }
    return (
        <OrderDetailsContext.Provider value={OrderDetailsGlobalState}>
            {children}
        </OrderDetailsContext.Provider>
    )
}

export default OrderDetailsProvider
