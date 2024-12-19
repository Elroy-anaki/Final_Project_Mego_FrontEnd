import React, { useContext } from 'react'
import { TableContext } from '../../contexts/TableContext'
import {  FaTrashAlt} from "react-icons/fa";

import MealTableDrawer from './MealTableDrawer'

function TableDrawer() {

  const { table, clearTable } = useContext(TableContext)
  return (
    <div className="drawer">
      <input id="tableDrawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side z-50 fixed">
        <label htmlFor="tableDrawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className='menu bg-base-200 text-base-content min-h-full w-2/5 p-4'>
          <h1 className='text-center text-3xl mb-5'>Your Table</h1>

          <ul className="flex flex-col">
            {/* Sidebar content here */}
            {table ? table?.meals.map((meal) => <MealTableDrawer key={meal.id._id} meal={meal} />) : null}

          </ul>
          <div className='flex justify-center items-center w-full'>
        <button 
        onClick={() => console.log(table)}
        className='w-1/2 px-4 py-2 rounded-l-lg bg-rose-600 text-2xl text-white'>Clear Table</button>
        <button className='w-1/2 px-4 py-2 rounded-r-lg bg-sky-600 text-2xl text-white'>Checkout To Payment</button>
        </div>
        </div>
      </div>
    </div>

  )
}

export default TableDrawer
