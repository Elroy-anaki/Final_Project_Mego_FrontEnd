import React ,{ useContext } from "react";
import Meal from "./Meal";
import { MenuContext } from '../../../../context/MenuContext'

function Meals({}) {

  const { menu } = useContext(MenuContext)
  console.log(menu)

  return (
    <div className="w-full mt-5 mx-auto">
      
      <div className="flex  justify-start flex-wrap ">
        {menu?.map((meal) => <Meal key={meal._id} meal={meal} />)}
      </div>
    </div>
  );
}

export default Meals;
