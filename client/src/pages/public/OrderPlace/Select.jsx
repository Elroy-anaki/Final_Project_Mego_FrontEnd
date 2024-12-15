import React from 'react'

function Select({left, data, label}) {
    const numberOfEaters = []
    for(let i = 2; i <= left; i++)numberOfEaters.push(i)
        console.log(numberOfEaters);
        

  return (
    <div className='space-y-4 text-center'>
        <label 
        className='text-xl text-center'
        htmlFor={label}
        >{label}</label>
        <select 
        name={label} 
        id={label}
        className='rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-orange-300 dark:border-gray-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        >
            {numberOfEaters.map((number) => (<option value={number}>{number} People</option>))}
        </select>
      
    </div>
  )
}

export default Select
