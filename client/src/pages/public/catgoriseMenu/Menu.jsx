import React, { createContext ,useState} from 'react'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CategoriseSideBar from './CategoriseSideBar';
import Meals from '../menu/Menu'

// export const MenuContext = createContext()


export default function Menu() {

    const [Menu, setMenu] = useState('Menu is here..');

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ["get_categorise"],
        queryFn: async () => await axios.get("/categories/get-all-categories"),
        select: (data) => data.data.data,
      });
    
      console.log(data);
      if (isLoading) return <p>Loading...</p>;
  return (
    <div className='flex min-h-screen'>
        <div className='w-1/4 bg-gray-100 min-h-screen flex flex-col px-2 py-2 shadow-2xl' >
      <CategoriseSideBar Catgorise={data}/>
      </div>
        <div className='w-3/4 min-h-screen flex flex-col px-2 py-2 shadow-2xl' >
      {Menu}
      <Meals/>
      </div>
    </div>
  )
}
