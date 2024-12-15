import React, { useContext } from 'react'
import CubeLink from './CubeLink'
import { AuthContext } from '../../../contexts/AuthContext'

const cubeLinks = [
  {name:"Menu", link:"menu"},
  {name:"Order Place", link:"order-place"},
  {name:"Take Away", link:"take-away"},
]

function Home() {
  const {user} = useContext(AuthContext)
  return (
    <div className='mt-5 w-11/12 mx-auto flex flex-col justify-center items-center space-y-20' >
      <div>
      <h1
       className='text-5xl text-center text-gray-600'
      >Welcome, {user? user?.userName : 'Eater'}!</h1>
      </div>
      <div className='flex flex-wrap w-full text-center items-center justify-center gap-5'>
        {cubeLinks.map((cubeLink) => <CubeLink key={cubeLink.name} {...cubeLink}/>)}
      </div>
      
    </div>
  )
}

export default Home
