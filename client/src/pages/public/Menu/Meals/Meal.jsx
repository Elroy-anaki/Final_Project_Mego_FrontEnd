// import React from 'react'


// function Meal({key, meal}) {
    




//   return (
//     <div 
//     key={key}
//     className="max-w-sm w-72 h-80  mx-auto overflow-hidden rounded-xl shadow-lg bg-gradient-to-r from-amber-400 to-white">
      
//       <div className="relative h-48">
//         <img
//         onClick={()=>alert(meal._id)}
//           src={meal.mealImage}
//           alt={meal.mealName}
//           className="w-full h-full object-cover cursor-pointer"
//         />
//       </div>

//       <div className="p-6">
        
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold text-amber-900">{meal.mealName}</h3>
//           <span className="text-lg font-bold text-amber-600" >₪{meal.mealPrice}</span>
//         </div>

//         <button 
//           className="w-full py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white"
//           onClick={() => alert(meal.mealPrice)}
//         >
//           add meal
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Meal
import React from 'react';

function Meal({ key, meal }) {
  return (
    <div
      key={key}
      className="max-w-sm w-72 h-96 mx-auto overflow-hidden rounded-2xl shadow-xl bg-gradient-to-b from-white to-amber-100 transform hover:scale-105 transition-transform duration-300"
    >
      {/* Image Section */}
      <div className="relative h-48">
        <img
          onClick={() => alert(meal._id)}
          src={meal.mealImage}
          alt={meal.mealName}
          className="w-full h-full object-cover rounded-t-2xl cursor-pointer"
        />
      </div>

      {/* Details Section */}
      <div className="p-6 flex flex-col justify-between h-48">
        <div>
          <h3 className="text-xl font-bold text-amber-900 mb-2 truncate">
            {meal.mealName}
          </h3>
          <p className="text-sm text-gray-600 mb-4 truncate">
            {meal.ingredients ? meal.ingredients.join(', ') : 'No ingredients listed'}
          </p>
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-extrabold text-amber-700">
            ₪{meal.mealPrice}
          </span>
          <button
            className="px-4 py-2 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600 focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all duration-200"
            onClick={() => alert(meal.mealPrice)}
          >
            Add Meal
          </button>
        </div>
      </div>
    </div>
  );
}

export default Meal;
