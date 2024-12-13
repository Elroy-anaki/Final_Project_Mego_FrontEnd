import React from 'react'

export default function ImageCube({ _id ,categoryName , categoryImage }) {
  return (

<div
      onClick={() => alert(_id)}
      style={{
        backgroundImage: `url(${categoryImage})`,
      }}
      className='relative overflow-hidden group 
        bg-cover bg-center 
        w-full h-44
        rounded-xl 
        border-2 border-gray-200
        flex justify-center items-center cursor-pointer'
    >
    <div className='absolute inset-0 bg-black/50 group-hover:bg-transparent transition-all duration-300 z-10'></div>
    
    <p className='relative z-20 text-3xl text-white group-hover:text-rose-400 group-hover:text-4xl group-hover:font-semibold transition-all duration-300'>
        {categoryName}
    </p>
    </div>
  )
}
