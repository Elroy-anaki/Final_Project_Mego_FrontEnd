import React from 'react'
import ImageCube from './ImageCube'

export default function CategoriseSideBar( { Catgorise }) {
    return (
        
          
          <div className=' '>
            {Catgorise.map((cat) => <ImageCube {...cat}/>)}
          </div>
          
        
      )
}


