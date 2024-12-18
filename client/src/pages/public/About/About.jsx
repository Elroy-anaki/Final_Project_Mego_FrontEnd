import { useContext } from "react"

import {TableContext} from "../../../Contexts/TableContext.jsx"

// const cheifs = [
  //     {name: "Asaf Granit", image:"https://images.globes.co.il/images/NewGlobes/big_image_800/2020/800x392-REDEFINE_MEAT.20201001T144014.jpg"},
  //     {name: "Moshik Rot", image:"https://images.globes.co.il/images/NewGlobes/big_image_800/2020/800x392-REDEFINE_MEAT.20201001T144014.jpg"},
  //     {name: "AYossi Shitrit", image:"https://images.globes.co.il/images/NewGlobes/big_image_800/2020/800x392-REDEFINE_MEAT.20201001T144014.jpg"},
  //     ]
  
  function About() {


  const {addMealToTable,deleteMealFromTable,clearTable ,table } = useContext(TableContext)



  // useEffect(() => {
  //   setTable([{ _id: "122", name: "moti22" }]);
  // }, []);
  return (
//     <div
//     className=''>
//         <h2
//         className='text-5xl text-center my-5'
//         >Our Cheifs</h2>
//     <div
//     className='w-full flex flex-col gap-10 items-center justify-center'>
//         {cheifs.map((cheif) => 

//         <div 
//         className={`flex justify-start items-center px-32
//         w-full h-96 
//         bg-[url("${cheif.image}")]
//         bg-cover
        
        
//          `}>
//         <p
//         className='text-black text-5xl '
//         >{cheif.name}</p></div>
        
        
      
//  )}
        

//     </div>
//     </div>


<div className="flex gap-5">
<button onClick={() => addMealToTable({ _id: "12223", name: "test meal" })}>
    Add Meal
</button>
<button onClick={() => addMealToTable({ _id: "12223", name: "test meal" })}>
    Add Meal
</button>
<button onClick={() => addMealToTable({ _id: "123", name: "test meal" })}>
    Add Meal
</button>
<button onClick={() => addMealToTable({ _id: "123", name: "test meal" })}>
    Add Meal
</button>
<button onClick={() => addMealToTable({ _id: "112223", name: "test meal" })}>
    Add Meal
</button>
<button onClick={() => deleteMealFromTable({ _id: "12223" })}>
    delete1
</button>
<button onClick={() => clearTable({ _id: "112223", name: "test meal" })}>
clearTable
</button>

<div>
    {table.map((item) => (
        <div key={item._id}>{item.name}</div>
    ))}
</div>
</div>
    
  )
}

export default About
