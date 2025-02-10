import React, { useContext } from 'react';
import { FaArrowRight, FaTrashAlt, FaMinus, FaPlus, FaPencilAlt } from "react-icons/fa";
import { TableContext } from '../../context/TableContext';

const MealTableDrawer = ({ meal, edited = true }) => {



    const { handelAdding, deleteMealFromTable, decreaseQuantity } = useContext(TableContext)
    return (
        <li className="relative bg-gray-800 rounded-xl shadow-lg h-36 mb-2 hover:shadow-2xl transition-all  border border-gray-700">
            <div className="flex h-full">
                {/* Image Section */}
                <div className="relative w-48 h-full ">
                    <div className="absolute z-10" />
                    <img
                        loading='lazy'
                        src={meal.meal.mealImage}
                        alt={meal.meal.mealName}
                        className='w-full h-full object-cover transition-transform duration-500 '
                    />
                </div>

                {/* Content Section */}
                <div className="flex-1 py-8 pl-6 relative ">
                    <h2 className="text-2xl font-bold text-white mb-2 ">{meal.meal.mealName}</h2>
                    <p className="text-xl font-semibold text-emerald-400 mb-3">{meal.meal.mealPrice} $</p>
                    {!edited && <p className="text-lg font-semibold text-gtay-200 ml-28">Quantity: {meal.quantity} </p>}



                    {/* Actions */}
                    {edited ? <div className="absolute bottom-2 right-1 flex space-x-2 py-2 ">
                        <div className="flex  items-center space-x-4  ">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => {
                                        meal.quantity > 1
                                            ? decreaseQuantity(meal.meal._id)
                                            : deleteMealFromTable(meal.meal._id)
                                    }}

                                    className="rounded-full p-2 bg-gray-700  border-none text-white"
                                >
                                    <FaMinus size={12} />
                                </button>
                                <span className="w-8 text-center font-semibold text-white">{meal.quantity}</span>
                                <button
                                    onClick={() => handelAdding(meal.meal._id)}
                                    className=" rounded-full p-2 bg-gray-700  border-none text-white"
                                >
                                    <FaPlus size={12} />
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => deleteMealFromTable(meal.meal._id)}
                            className="btn btn-sm bg-gray-700 hover:bg-red-900 border-none tooltip" data-tip="Delete">
                            <FaTrashAlt size={14} className="text-red-400" />
                        </button>
                    </div>
                        : null}

                    {/* Total Price */}
                    <div className="absolute bottom-0 left-5">
                        <p className="text-sm text-gray-400">Total:</p>
                        <p className="text-lg font-bold text-emerald-400">{(meal.meal.mealPrice * meal.quantity)} $</p>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default MealTableDrawer;