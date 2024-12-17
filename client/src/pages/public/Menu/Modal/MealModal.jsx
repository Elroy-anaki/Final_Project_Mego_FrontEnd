import React, { useContext, useState } from 'react';
import { MenuContext } from '../../../../Contexts/MenuContext';
import { IoClose } from 'react-icons/io5';
import CaloriesSlider from './CaloriesSlider';
import AddButton from '../Meals/AddButton';

function MealModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { meal } = useContext(MenuContext);

    return (
        <div>
            <dialog
                id="mealDatails"
                className="modal bg-white shadow-2xl rounded-lg overflow-hidden border-0 w-[90%] max-w-3xl max-h-[100vh] mx-auto"
            >

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                    <div className="shrink-0 max-w-md lg:max-w-xl mx-auto flex justify-center">
                        <img
                            className="w-70 h-70 lg:w-96 lg:h-96 rounded-xl object-cover shadow-md"
                            src={meal?.mealImage}
                            alt={meal?.mealName}
                        />
                    </div>

                    <div className="flex flex-col justify-between">
                        <div>
                            <div className="flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start gap-2 mb-4">
                                        <h1 className="text-3xl font-extrabold text-gray-800">
                                            {meal?.mealName}
                                        </h1>
                                        <button
                                            onClick={() => {
                                                document.getElementById('mealDatails').close();
                                            }}
                                            className="text-gray-500 hover:text-gray-800 focus:outline-none"
                                        >
                                            <IoClose size={30} />
                                        </button>
                                    </div>
                                </div>
                            </div>



                            <p className="text-3xl font-semibold text-amber-600 mb-2">
                                ₪{meal?.mealPrice}
                            </p>

                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-gray-600 font-medium">Rating:</span>
                                <span className="text-amber-500 font-bold">5.0</span>
                                <span className="text-gray-600 font-medium">Calories:</span>

                                <span onClick={() => { setIsOpen((prev) => !prev) }}
                                    className="text-amber-500 cursor-pointer font-semibold">
                                    {meal?.amoutnOfCalories}
                                </span>
                            </div>
                            {isOpen && (<CaloriesSlider calories={meal?.amoutnOfCalories} setIsOpen={setIsOpen} />)}

                            <p className="font-semibold text-lg text-gray-700 mb-4"> Ingredients: </p>

                            <div className="flex flex-wrap gap-2">
                                {meal?.ingredients?.map((ingredient, index) => (
                                    <span key={index} className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full shadow-sm text-sm font-medium" >
                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-100 rounded-lg p-4 mt-2">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                Reviews
                            </h3>
                            <p className="text-gray-600 italic">
                                "Amazing taste and presentation! Highly recommend."
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-5 text-xl font-semibold bg-gray-50 border-t border-gray-100 flex justify-center">
                    <AddButton text="I Hungry 😋" fun={() => alert(meal.mealPrice)} className="w-full max-w-xs" />
                </div>
            </dialog>
        </div>
    );
}

export default MealModal;



