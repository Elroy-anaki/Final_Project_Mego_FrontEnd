import React, { useContext, useEffect } from 'react'

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SideBar from './SideBar/Sidebar';
import Meals from './Meals/Meals';
import { OrderDetailsContext } from '../../../context/OrderDetailsContext';
import { Helmet } from 'react-helmet-async';
import {helmetAbout} from "../../../helmet/menu"


function MenuBoard() {

    const { data, isLoading } = useQuery({
        queryKey: ["getCategories"],
        queryFn: async () => await axios.get("/categories/get-all-categories"),
        select: (data) => data.data.data,
      });


      if (isLoading) return <p>Loading...</p>;
  return (
    
    <div className='flex min-h-screen border-t-2 border-white'>
      <Helmet {...helmetAbout}/>
        <div className='w-1/6 bg-gray-800 h-[575px] flex flex-col shadow-2xl border-x-2 border-x-white border-b-2 border-b-white' >
      <SideBar categories={data}/>
      </div>
        <div className='w-5/6 min-h-screen flex flex-col px-2 py-2 shadow-2xl bg-gray-800' >
      <Meals/>
      </div>
    </div>
  )
}
export default MenuBoard