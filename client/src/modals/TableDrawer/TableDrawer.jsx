import React, { useContext, useState } from 'react';
import { TableContext } from '../../contexts/TableContext';
import { FaTrashAlt } from "react-icons/fa";
import MealTableDrawer from './MealTableDrawer';
import { Link, useNavigate } from 'react-router-dom';
import GuestsZone from './GuestsZone';

function TableDrawer() {
  const { table, deleteTable } = useContext(TableContext);
  const [toggleGuests, setToggleGuests] = useState(false);

  const navigate = useNavigate();




  return (
    <div className="drawer">
      <input id="tableDrawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side z-50 fixed">
        <label id='closeDrawer' htmlFor="tableDrawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className='menu bg-base-200 text-base-content min-h-full w-2/5 p-4'>
          <h1 className='text-center text-3xl mb-5'>Your Table</h1>
          {!table ? <h1 className='text-xl text-center'>Your Cart is Empty</h1>
            : <div>
              <div className='flex justify-between w-full mx-auto px-2 mb-3'>

                <h2 className='text-3xl '>Total Price:</h2>
                <h2 className='text-3xl '>{table?.totalPrice}$</h2>
              </div>
              <ul className="flex flex-col">
                {table && table?.meals?.map((meal) => <MealTableDrawer key={meal.meal._id} meal={meal} />)}
              </ul>


              <div className='w-full mx-auto px-20 py-2 flex flex-col gap-2 mb-2 bg-slate-700 rounded-lg '>
                <h1
                  className='text-xl text-white text-center cursor-pointer bg-slate-800 py-2 rounded-xl hover:bg-slate-500'
                  onClick={() => setToggleGuests(!toggleGuests)}
                >
                  Invite Friends
                </h1>
                {toggleGuests && <GuestsZone />}
              </div>



              <div className='flex justify-center items-center w-full'>
                <button
                  onClick={() => deleteTable(table) }
                  className='w-1/2 px-4 py-2 rounded-l-lg bg-rose-600 text-2xl text-white'>Clear Table</button>
                <button
                  onClick={() => { document.getElementById("closeDrawer").click(); navigate('/checkout') }}
                  className='w-1/2 px-4 py-2 rounded-r-lg bg-sky-600 text-2xl text-white'>Checkout To Payment</button>
              </div>
            </div>}

        </div>
      </div>
    </div>
  );
}

export default TableDrawer;
