import React, { useContext, useState } from 'react';
import { MenuContext } from '../../../../context/MenuContext';
import { IoClose } from 'react-icons/io5';
import { Star, Clock, MessageCircle } from 'lucide-react';
import CaloriesSlider from './CaloriesSlider';
import AddButton from '../Meals/AddButton';
import { TableContext } from '../../../../context/TableContext'
import { AuthContext } from '../../../../context/AuthContext';



function MealModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { meal } = useContext(MenuContext);
    const { handelAdding } = useContext(TableContext)
    const {isAuth} = useContext(AuthContext)


    return (
        <div>
            <dialog
                id="mealDetails"
                className="modal bg-white shadow-2xl rounded-2xl overflow-hidden border-0 w-[90%] max-w-4xl max-h-[90vh] mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                    {/* Image Section */}
                    <div className="relative group">
                        <img
                            className="w-full h-[400px] rounded-xl object-cover shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                            src={meal?.mealImage}
                            alt={meal?.mealName}
                        />
                        <div className="mt-6">
                            <AddButton
                                text="I'm Hungry 😋"
                                fun={() => {
                                    console.log(meal)
                                    handelAdding(meal._id)
                                    document.getElementById('mealDetails').close();


                                }}
                                 className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                            />
                        </div>
                        <div className="absolute top-4 right-4">
                            <button
                                onClick={() => {
                                    document.getElementById('mealDetails').close();
                                }}
                                className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                            >
                                <IoClose size={24} className="text-gray-700" />
                            </button>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col h-full">
                        <div className="flex-grow">
                            {/* Header */}
                            <div className="mb-2">
                                <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
                                    {meal?.mealName}
                                </h1>
                                <div className="flex  gap-2 flex-wrap flex-col justify-start items-start">
                                    <span className="text-2xl font-bold text-amber-600">
                                        <span className='text-3xl text-black font-medium mr-2'>Price:</span>

                                        ${meal?.mealPrice}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className='text-lg text-black font-medium'>Rating:</span>
                                        <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                                        <span className="font-semibold">
                                            {Number(meal?.rating?.avgOfRating).toFixed(1)}
                                            <span className='ml-2 text-xs'>(Rated {meal?.reviews?.length})</span>
                                        </span>
                                    </div>
                                    <div
                                        onClick={() => setIsOpen(prev => !prev)}
                                        className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition-colors"
                                    >
                                        <span className='text-lg text-black font-medium'>Calories:</span>
                                        <Clock className="w-5 h-5" />
                                        <span className="font-semibold">{meal?.amoutnOfCalories} cal</span>
                                    </div>

                                </div>
                            </div>

                            {isOpen && <CaloriesSlider calories={meal?.amoutnOfCalories} setIsOpen={setIsOpen} />}

                            {/* Ingredients */}
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                    Ingredients
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {meal?.ingredients?.map((ingredient, index) => (
                                        <span
                                            key={index}
                                            className="inline-block bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 px-4 py-2 rounded-full shadow-sm text-sm font-medium hover:shadow-md transition-shadow duration-200"
                                        >
                                            {ingredient}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Reviews */}
                            {isAuth ?<div className="bg-gray-100 rounded-xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <MessageCircle className="w-6 h-6 text-gray-700" />
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Reviews
                                    </h2>
                                </div>
                                <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
                                    {meal?.reviews?.map((review, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-semibold text-gray-800">
                                                    {review.user.name}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                                    <span className="font-medium text-amber-600">
                                                        {review.rating}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-gray-600">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                             : null}
                            
                        </div>

                        {/* Action Button */}

                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default MealModal;