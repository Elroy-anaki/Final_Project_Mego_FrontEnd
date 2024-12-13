import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import React from "react";
import Meal from "./Meal";

function Meals() {

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["get_menu"],
    queryFn: async () =>
      await axios.get("/meals/get-all-meals"),
    select: (data) => data.data.data,
  });

  console.log(data);

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <AiOutlineLoading3Quarters />
        ) : (
          data?.map((meal) => <Meal key={meal._id} meal={meal} />)
        )}
      </div>
    </div>
  );
}

export default Meals;
