import React from 'react'

function Order({ order }) {
    return (
        <div className="bg-gray-900 text-white py-10  ">

            <div className="bg-gray-800 p-2 flex justify-start items-center gap-10  border-y-2 border-y-white border-r border-r-white shadow-xl mx-auto rounded-r-xl mr-10">
                {/* Date & Time */}
                <div className="flex flex-col justify-between text-lg gap-2">
                    <div className="flex flex-col items-center rounded-lg bg-gray-300 p-2">
                        <div className="font-semibold text-black ">When:</div>
                        <p className='text-base text-black'>{order.dateTime.date}</p>
                        <p className='text-base text-black'>{order.dateTime.time}</p>
                    </div>
                    {/* Total Price */}
                    <div className="flex flex-col items-center rounded-lg bg-gray-300 p-2">
                        <div className="font-semibold text-black">Total Price</div>
                        <p className='text-base text-black'>{order.table.totalPrice}$</p>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col items-center rounded-lg bg-gray-600 p-2">
                        <div className="font-semibold">Status:</div>
                        <p className={`text-xl ${order.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
                            {order.status}
                        </p>
                    </div>

                </div>

                {/* הצגת הארוחות */}
                <div className='text-2xl'>Meals</div>
                <div className="flex flex-wrap gap-6 justify-center items-center border-2 border-gray-700 rounded-2xl p-5">
                    {order.table.meals.map((meal, index) => (
                        <div key={index} className="bg-gray-700 p-2 space-y-2 rounded-xl flex shadow-lg flex-col items-center w-56 h-36">
                            {/* תצוגת התמונה של המנה */}
                            <p className="text-lg font-semibold">{meal.meal.mealName}</p>

                            <img
                                src={meal.meal.mealImage}
                                alt={meal.meal.mealName}
                                className="w-16 h-16 object-cover rounded-2xl "
                            />
                            {/* תצוגת המידע על המנה */}
                            <div className="text-center">
                                <p className="text-sm text-gray-300 mt-1">Quantity: {meal.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Order
