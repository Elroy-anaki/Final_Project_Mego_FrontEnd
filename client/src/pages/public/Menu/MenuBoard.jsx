import React from 'react'

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SideBar from './SideBar/Sidebar';
import Meals from './Meals/Meals';






function MenuBoard() {



    const { data, isLoading } = useQuery({
        queryKey: ["getCategorise"],
        queryFn: async () => await axios.get("/categories/get-all-categories"),
        select: (data) => data.data.data,
      });




      if (isLoading) return <p>Loading...</p>;
  return (
    
    <div className='flex min-h-screen'>
        <div className='w-1/4 bg-gray-100 min-h-screen flex flex-col px-2 py-2 shadow-2xl' >
      <SideBar Catgorise={data}/>
      </div>
        <div className='w-3/4 min-h-screen flex flex-col px-2 py-2 shadow-2xl' >
      <Meals/>
      </div>
    </div>
  )
}
export default MenuBoard