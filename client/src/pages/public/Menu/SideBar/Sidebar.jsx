import React from 'react'
import ImageCube from './ImageCube'

function Sidebar( { Catgorise }) {
    return (
        
          
          <div>
            {Catgorise.map((cat) => <ImageCube {...cat}/>)}
          </div>
          
        
      )
}
export default Sidebar