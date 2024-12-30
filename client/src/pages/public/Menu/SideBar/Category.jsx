import React, { useContext } from 'react';
import { MenuContext } from '../../../../Contexts/MenuContext'


function Category({ _id ,categoryName , categoryImage }) {
    const { GetMealsByCategory, setChosenCategory, chosenCategory } = useContext(MenuContext)


    const handleCubeClick = () => {
        setChosenCategory({name:categoryName, _id: _id})
        GetMealsByCategory(_id);
    };
   
    return (
        <div
            onClick={handleCubeClick}
            style={{
                backgroundImage: `url(${categoryImage})`,
            }}
            className='relative overflow-hidden group 
                bg-cover bg-center 
                w-full h-28
                flex justify-center items-center cursor-pointer'
        >
            <div className={`absolute inset-0 ${chosenCategory.name === categoryName ? 'bg-lime-400/40' : 'bg-black/40' } group-hover:bg-transparent transition-all duration-300 z-100`}></div>
            
            <p className={`relative z-20 text-3xl  ${chosenCategory.name === categoryName ?  'text-black font-semibold text-4xl ': 'text-amber-500'} group-hover:text-amber-500 group-hover:text-4xl group-hover:font-semibold transition-all duration-300`}>
                {categoryName}
            </p>
        </div>
    )
}

export default Category
