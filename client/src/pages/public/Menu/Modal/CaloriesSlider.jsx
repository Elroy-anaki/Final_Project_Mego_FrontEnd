import React from 'react';

function CaloriesSlider({ calories, setIsOpen }) {

    const Position = (calories) => {
        const maxCalories = 700; 
        const minCalories = 0; 
        if (calories > maxCalories) calories = maxCalories;
        if (calories < minCalories) calories = minCalories;
        return ((calories - minCalories) / (maxCalories - minCalories)) * 100; 
    };


    return (
        <div 
        onClick={()=>{setIsOpen(prev => !prev)}}
        className="w-full flex flex-col items-center gap-2 mb-6">
            <div className="relative w-full h-4 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500">
                <div
                    className="absolute top-0 h-4 w-1 bg-black rounded"
                    style={{ left: `${Position(calories)}%` }} 
                />
            </div>
            <div className="flex justify-between w-full text-sm text-gray-600">
                <span>0</span>
                <span>350</span>
                <span>700</span>
            </div>
        </div>
    );
}

export default CaloriesSlider;
