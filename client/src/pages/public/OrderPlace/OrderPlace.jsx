import React from 'react'
import Select from './Select'

function OrderPlace() {
    return (
        <div
        className='bg-gradient-to-br from-gray-800 to-gray-700 pb-48 '>
<h2 className='text-center text-3xl font-bold text-amber-500 py-4'>
                Welcome to Our Restaurant!
            </h2>
        <div
            className='relative shadow-2xl rounded-xl h-56 py-2 w-4/5 mx-auto my-16 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white'
        >
            <div
                className='flex justify-between items-center px-6 mt-6'
            >
                <div className='w-1/4 border-2 border-amber-500 rounded-l-lg bg-gray-800 px-4 py-3 shadow-inner'>
                    <Select
                        label={'Number of People'}
                        left={10}
                    />
                </div>
                <div className='w-1/4 border-2 border-amber-500 bg-gray-800 px-4 py-3 shadow-inner'>
                    <Select
                        label={'Date'}
                        left={12}
                    />
                </div>
                <div className='w-1/4 border-2 border-amber-500 bg-gray-800 px-4 py-3 shadow-inner'>
                    <Select
                        label={'Hour'}
                        left={10}
                    />
                </div>
                <div className='w-1/4 border-2 border-amber-500 rounded-r-lg bg-gray-800 px-4 py-3 shadow-inner'>
                    <Select
                        label={'Special Request'}
                        left={10}
                    />
                </div>
                <button
                    className='px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 text-black text-lg font-bold hover:from-amber-500 hover:to-amber-400 shadow-xl absolute bottom-2 hover:bottom-3 right-6 transition-all transform hover:scale-105'
                >
                    Find Table For Me
                </button>
            </div>
        </div>
        </div>
        
    );
    
    
}

export default OrderPlace
