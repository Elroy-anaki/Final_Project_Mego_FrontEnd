import React from 'react'
import Category from './Category'

function Sidebar( { categories }) {
    return (
        
          
          <div
          className='space-y-0.5'>
            {categories.map((cat) => <Category {...cat}/>)}
          </div>
          
        
      )
}
export default Sidebar