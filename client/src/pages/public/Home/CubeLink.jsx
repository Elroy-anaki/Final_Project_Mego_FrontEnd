import React from 'react'
import { Link } from 'react-router-dom'

function CubeLink({ name, link, image }) {
    return (
        <Link
            to={`/${link}`}
            className="relative overflow-hidden group
                w-1/4 h-44
                rounded-full border-2 border-gray-200
                flex justify-center items-center"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-all duration-300 z-10"></div>
            
            <p className="relative z-20 text-3xl text-white group-hover:text-amber-600 group-hover:text-4xl group-hover:font-semibold transition-all duration-300">
                {name}
            </p>
        </Link>
    );
}

export default CubeLink;


