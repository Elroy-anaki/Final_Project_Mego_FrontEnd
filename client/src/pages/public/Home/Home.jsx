import React, { useContext } from 'react'
import CubeLink from './CubeLink'
import { AuthContext } from '../../../context/AuthContext'

const cubeLinks = [
  {name:"Menu", link:"menu", image:"https://images.unsplash.com/photo-1710732652617-264d6f860546?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMG1lbnV8ZW58MHx8MHx8fDA%3D"},
  {name:"Order Place", link:"order-place", image:"https://images.unsplash.com/photo-1497395217579-0d6deaff0906?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8VGFibGUlMjBpbiUyMHJlc3RhdXJuYXR8ZW58MHx8MHx8fDA%3D"},
  {name:"Take Away", link:"menu", image:"https://images.unsplash.com/photo-1585759071429-1646f76ab8c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRha2UlMjBhd2F5fGVufDB8fDB8fHww"},
]

function Home() {
  const {user} = useContext(AuthContext)
  return (
    <div className='mt-5 w-11/12 mx-auto flex flex-col justify-center items-center space-y-20' >
      <div>
      <h1
       className='text-5xl text-center text-white'
      >Welcome, {user? user?.userName : 'Eater'}!</h1>
      </div>
      <div className='flex flex-wrap w-full text-center items-center justify-center gap-5'>
        {cubeLinks.map((cubeLink) => <CubeLink key={cubeLink.name} {...cubeLink}/>)}
      </div>
      
    </div>
  )
}

export default Home
