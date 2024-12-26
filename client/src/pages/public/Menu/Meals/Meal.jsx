import React, { useContext } from 'react';
import {MenuContext} from '../../../../Contexts/MenuContext.jsx';
import {TableContext} from '../../../../Contexts/TableContext.jsx'
import AddButton  from './AddButton.jsx';


function Meal({ key, meal }) {
  const {handelAdding} = useContext(TableContext)
  const { setMeal } = useContext(MenuContext)
  
  return (
    <div
      key={key}
      className="max-w-sm w-72 h-72 mx-auto
      overflow-hidden rounded-2xl shadow-xl bg-gradient-to-b from-white to-amber-100 
      transform hover:scale-105 transition-transform duration-300 mb-5"
    >
      <div className=" h-36">
        <img
        loading='lazy'
          onClick={() =>{ 
            setMeal(meal);
            document.getElementById('mealDatails').showModal();
          }}
          src={meal.mealImage}
          alt={meal.mealName}
          className="w-full h-full object-cover rounded-t-2xl cursor-pointer "
        />
      </div>

      <div className="p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-amber-900 mb-2 truncate">
            {meal.mealName}
          </h3>
          <p className="text-sm text-gray-600 mb-4 truncate">
            {meal.ingredients ? meal.ingredients.join(', ') : 'No ingredients listed'}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-extrabold text-amber-700">
            ₪{meal.mealPrice}
          </span>
          
           <AddButton
           text={'Add Meal'}
           fun={()=> {
            console.log(meal)
            handelAdding(meal._id)
          }}
           />
        </div>
      </div>
    </div>
  );
}

export default Meal;
