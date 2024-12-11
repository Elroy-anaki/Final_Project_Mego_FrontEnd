import React from 'react'


const cheifs = [
    {name: "Asaf Granit", image:"https://images.globes.co.il/images/NewGlobes/big_image_800/2020/800x392-REDEFINE_MEAT.20201001T144014.jpg"},
    {name: "Moshik Rot", image:"https://images.globes.co.il/images/NewGlobes/big_image_800/2020/800x392-REDEFINE_MEAT.20201001T144014.jpg"},
    {name: "AYossi Shitrit", image:"https://images.globes.co.il/images/NewGlobes/big_image_800/2020/800x392-REDEFINE_MEAT.20201001T144014.jpg"},
    ]

function About() {
  return (
    <div
    className=''>
        <h2
        className='text-5xl text-center my-5'
        >Our Cheifs</h2>
    <div
    className='w-full flex flex-col gap-10 items-center justify-center'>
        {cheifs.map((cheif) => 

        <div 
        className={`flex justify-start items-center px-32
        w-full h-96 
        bg-[url("${cheif.image}")]
        bg-cover
        
        
         `}>
        <p
        className='text-black text-5xl '
        >{cheif.name}</p></div>
        
        
      
 )}
        

    </div>
    </div>
    
  )
}

export default About
