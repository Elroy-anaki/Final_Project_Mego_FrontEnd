import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const FullOrderContext = createContext();

function FullOrderProvider({children}){

    const {user, isAuth} = useContext(AuthContext)

    const [fullOrder, setFullOrder] = useState(null)

    function setValuesByOrderSchema(values){
        const orderValues = {
          user: {
            userId: user ? user?._id : null,
            userName:  values.userName
          },
           dateTime: {
            date: values.date,
            time: values.time
           },
           numberOfGuests: values.numberOfGuests,
           
        }
        return orderValues
      }


    const fullOrderGlobalState = {
        fullOrder,
        setFullOrder,
        setValuesByOrderSchema

    }

    return (
        <FullOrderContext.Provider value={fullOrderGlobalState}>
            {children}
        </FullOrderContext.Provider> 
    )
}

export default FullOrderProvider;