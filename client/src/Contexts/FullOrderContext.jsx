import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { TableContext } from "./TableContext";

export const FullOrderContext = createContext();

function FullOrderProvider({children}){

    const {user, isAuth} = useContext(AuthContext)
    const {tableMeals, table} = useContext(TableContext)

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
           table: {
            sharedWith:table.sharedWith,
            meals: table.meals.map((meal) => {
              return {meal: meal.meal._id, quantity: meal.quantity}
            })
           }
           
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