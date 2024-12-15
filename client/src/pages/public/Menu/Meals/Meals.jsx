import React ,{ useContext } from "react";
import Meal from "./Meal";
import { MenuContext } from '../../../../Contexts/MenuContexts'

function Meals() {

  const { menu } = useContext(MenuContext)

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {menu?.map((meal) => <Meal key={meal._id} meal={meal} />)}
      </div>
    </div>
  );
}

export default Meals;
