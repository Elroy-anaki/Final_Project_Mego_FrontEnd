import React from 'react'


function Meal({key, meal}) {
    




  return (
    <div 
    key={key}
    className="max-w-sm w-72 h-80  mx-auto overflow-hidden rounded-xl shadow-lg bg-gradient-to-r from-amber-400 to-white">
      
      <div className="relative h-48">
        <img
        onClick={()=>alert(meal._id)}
          src={meal.mealImage}
          alt={meal.mealName}
          className="w-full h-full object-cover cursor-pointer"
        />
      </div>

      <div className="p-6">
        
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-amber-900">{meal.mealName}</h3>
          <span className="text-lg font-bold text-amber-600" >₪{meal.mealPrice}</span>
        </div>

        <button 
          className="w-full py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white"
          onClick={() => alert(meal.mealPrice)}
        >
          add meal
        </button>
      </div>
    </div>
  )
}

export default Meal
