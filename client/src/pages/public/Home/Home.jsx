import React from 'react'
import CubeLink from './CubeLink'

const cubeLinks = [
  {name:"Menu", link:"Menu"},
  {name:"Order Place", link:"Order-Place"},
  {name:"Take Away", link:"Take-Away"},
]

function Home() {
  return (
    <div className='mt-5 w-11/12 mx-auto flex flex-col justify-center items-center  space-y-20' >
      <div>
      <h1
       className='text-5xl text-center text-gray-600'
      >Welcome, Eaters!</h1>
      </div>
      <div className='flex flex-wrap w-full text-center items-center justify-center gap-5'>
        {cubeLinks.map((cubeLink) => <CubeLink key={cubeLink.name} {...cubeLink}/>)}
      </div>
      
    </div>
  )
}

export default Home
