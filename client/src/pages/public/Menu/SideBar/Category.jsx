import React, { useContext } from 'react';
import { MenuContext } from '../../../../context/MenuContext';

function Category({ _id, categoryName, categoryImage, isSelected, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundImage: `url(${categoryImage})`,
            }}
            className={`relative overflow-hidden group 
                bg-cover bg-center w-full h-28
                flex justify-center items-center cursor-pointer
                ${isSelected ? 'ring-4 ring-amber-500' : ''}`}
        >
            <div className={`absolute inset-0 ${isSelected ? 'bg-lime-400/40' : 'bg-black/70'} group-hover:bg-black/40 transition-all duration-300`}></div>
            
            <p className={`relative z-20 text-3xl ${isSelected ? 'text-black font-semibold text-4xl' : 'text-amber-500'} group-hover:text-amber-500 group-hover:text-4xl group-hover:font-semibold transition-all duration-300`}>
                {categoryName}
            </p>
        </button>
    );
}

export default Category;
