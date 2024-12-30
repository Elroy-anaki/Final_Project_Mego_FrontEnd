import React, { createContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const MenuContext = createContext()


function MenuProvider({ children }) {
    const [menu, setMenu] = useState([]);
    const [meal, setMeal] = useState(null);
    const [chosenCategory, setChosenCategory] = useState({}) 


    const { mutate:GetMealsByCategory } = useMutation({
        mutationKey: ["GetMealsByCategory", chosenCategory],
        mutationFn: async () =>
            await axios.get(`/meals/get-meals-by-category/${chosenCategory._id}`),
        onSuccess: (data) => {
            setMenu(data.data.data);
            console.log(data.data.data);
        },
        onError:(err) => {
            console.log(err)
        }
    });

    const menuGloblaState = {
        menu,
        meal,
        chosenCategory,
        setMeal,
        setMenu,
        GetMealsByCategory,
        setChosenCategory
    }

    return (
        <MenuContext.Provider value={menuGloblaState}>
            {children}
        </MenuContext.Provider >
    )
}
export default MenuProvider












