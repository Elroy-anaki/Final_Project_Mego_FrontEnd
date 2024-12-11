import React from 'react'
import { Link } from 'react-router-dom'

function CubeLink({ name, link }) {
    return (


        <Link
    to={`/${link}`}
    className='relative overflow-hidden  group 
        bg-[url("https://images.unsplash.com/photo-1710732652617-264d6f860546?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMG1lbnV8ZW58MHx8MHx8fDA%3D")] 
        bg-cover bg-center 
        w-1/4 h-44
        rounded-xl border-2 border-gray-200
        flex justify-center items-center'
>
    <div className='absolute inset-0 bg-black/50 group-hover:bg-transparent transition-all duration-300 z-10'></div>
    
    <p className='relative z-20 text-3xl text-white group-hover:text-rose-400 group-hover:text-4xl group-hover:font-semibold transition-all duration-300'>
        {name}
    </p>
</Link>

    )
}

export default CubeLink
