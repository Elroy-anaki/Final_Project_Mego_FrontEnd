import { createContext } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from "axios";
import { useState, } from "react";


export const RestaurantContex = createContext()

function RestaurantProvider({ children }) {
    const [restaurant, setRestaurant] = useState(null);

    const {data, isError, isLoading} = useQuery({
        queryKey:['getRestaurant'],
        queryFn: async () => {
            const {data} = await axios.get('/restaurant/get-restaurant');
            setRestaurant(data.data)
            console.log(data.data)
            return data
        },
        staleTime: 1000 * 300
    })

    const restaurantGlobalState = {
        restaurant,
        setRestaurant
    }
    return (
        <RestaurantContex.Provider value={restaurantGlobalState} >
            {children}
        </RestaurantContex.Provider>
    )

}

export default RestaurantProvider;