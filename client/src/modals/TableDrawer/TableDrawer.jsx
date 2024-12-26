import React, { useContext, useState } from 'react';
import { TableContext } from '../../contexts/TableContext';
import { FaTrashAlt } from "react-icons/fa";

import MealTableDrawer from './MealTableDrawer';
import { Link, useNavigate } from 'react-router-dom';
import AddButton from '../../pages/public/Menu/Meals/AddButton';

function TableDrawer() {
  const { table, deleteTable, addGuests } = useContext(TableContext);
  const [toggleGuests, setToggleGuests] = useState(false)
  const [guests, setGuests] = useState(table ? table?.SharedWith : null)
  const navigate = useNavigate()

  return (
    <div className="drawer">
      <input id="tableDrawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side z-50 fixed">
        <label id='closeDrawer' htmlFor="tableDrawer" aria-label="close sidebar" className="drawer-overlay"></label>

        <div className='menu bg-base-200 text-base-content min-h-full w-2/5 p-4'>
          <h1 className='text-center text-3xl mb-5'>Your Table</h1>
          <ul className="flex flex-col">
            {/* Sidebar content here */}
            {table && table?.meals?.map((meal) => <MealTableDrawer key={meal.meal._id} meal={meal} />)}

          </ul>
          <div>
            <h2 className='text-2xl '>{table?.totalPrice}</h2>
          </div>
          <div className='w-3/4 mx-auto px-3 py-1 flex flex-col gap-2 mb-2'>
          <h1
          onClick={()=> setToggleGuests(!toggleGuests)}
          >Invite Friends</h1>
          {toggleGuests && <div className='flex flex-col gap-2 mb-2'>
            {guests?.map((guest) => (
              <input type="email" name="" id=""  value={guest.guestEmail} className='bg-gray-200 py-2 px-3 text-black'/>
            )) }
            
            
            </div>}

            

          </div>
          <div className='flex justify-center items-center w-full'>
        <button 
        onClick={() => {
          console.log(table)
          // deleteTable(table)
        }}
        className='w-1/2 px-4 py-2 rounded-l-lg bg-rose-600 text-2xl text-white'>Clear Table</button>
        <button 
        onClick={() => {
          navigate('/checkout');
          document.getElementById('closeDrawer').click()

        }}
        className='w-1/2 px-4 py-2 rounded-r-lg bg-sky-600 text-2xl text-white'>Checkout To Payment</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default TableDrawer;
