import React, { useContext } from 'react';
import {MenuContext} from '../../../../context/MenuContext.jsx';
import {TableContext} from '../../../../context/TableContext.jsx'
import AddButton  from './AddButton.jsx';


function Meal({ key, meal }) {
  const {handelAdding} = useContext(TableContext)
  const { setMeal } = useContext(MenuContext)
  
  return (
    <div
      key={key}
      className="max-w-sm w-72 h-72 mx-2
      overflow-hidden rounded-3xl shadow-xl bg-gradient-to-b from-white to-amber-100 
      transform hover:scale-105 transition-transform duration-300 mb-5"
    >
      <div className=" h-36">
        <img
        loading='lazy'
          onClick={() =>{ 
            setMeal(meal);
            document.getElementById('mealDetails').showModal();
          }}
          src={meal.mealImage}
          alt={meal.mealName}
          className="w-full h-full object-cover rounded-t-2xl cursor-pointer "
        />
      </div>

      <div className="px-6 py-2 flex flex-col justify-between hover:bg-amber-200">
        <div>
          <h3 className="text-3xl font-bold text-amber-900 mb-2 truncate">
            {meal.mealName}
          </h3>
          <p className="text-base text-gray-600 mb-4 truncate">
            {meal.ingredients ? meal.ingredients.join(', ') : 'No ingredients listed'}
          </p>
        </div>

        <div className="flex justify-between items-center">
          
          
           <AddButton
           text="I'm Hungry 😋"
           fun={()=> {
            console.log(meal)
            handelAdding(meal._id)
          }}
          className='px-3 py-2 hover:bg-amber-800'
           />
           <span className="text-2xl font-extrabold text-amber-700">
            ${meal.mealPrice}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Meal;
