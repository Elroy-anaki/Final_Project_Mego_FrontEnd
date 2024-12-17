import { createContext, useContext, useState } from "react";



export const OrderDetailsContext = createContext()


function OrderDetailsProvider({children}){

    const [orderDetails, setOrderDetails] = useState(null)


    const OrderDetailsGlobalStatse = {
        setOrderDetails,
        orderDetails

    }
    return (
        <OrderDetailsContext.Provider value={OrderDetailsGlobalStatse}>
            {children}
        </OrderDetailsContext.Provider>
    )
}

export default OrderDetailsProvider
