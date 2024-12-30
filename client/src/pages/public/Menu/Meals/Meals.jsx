import React ,{ useContext } from "react";
import Meal from "./Meal";
import { MenuContext } from '../../../../Contexts/MenuContext'

function Meals({}) {

  const { menu } = useContext(MenuContext)
  console.log(menu)

  return (
    <div className="w-full mx-auto">
      
      <div className="flex flex-wrap justify-center ">
        {menu?.map((meal) => <Meal key={meal._id} meal={meal} />)}
      </div>
    </div>
  );
}

export default Meals;
