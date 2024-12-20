import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const TableContext = createContext();


function TableProvider({ children }) {
  const queryClient = useQueryClient()

  const { user, isAuth } = useContext(AuthContext)
  const [toggle, setToggle] = useState(false)


  const { mutateAsync: getTableByUserId } = useMutation({
    mutationKey: ['getTableByUserId'],
    mutationFn: async (userId) => axios.get(`tables/get-table-by-user-id/${userId}`),
    onSuccess: (data) => {
      return data.data
    },
    retry: 1
  })
  const [table, setTable] = useState(null);
  const [tableMeals, setTableMeals] = useState(null)

  useEffect(() => {
    const fetchTables = async () => {
      if (isAuth && user) {
        try {
          const { data } = await getTableByUserId(user._id);
          setTable(data.data);
          console.log("user", user)
        } catch (error) {
          console.error("Failed to fetch tables:", error);
        }
      } else {
        setTable(null);
      }
    };

    fetchTables();

  }, [user, isAuth, toggle])

  useEffect(() => {
    console.log(table)
    setTableMeals(table ? table.meals : null)
  }, [table])

  // Actions

  const { mutateAsync: createOrEditTable } = useMutation({
    mutationKey: ['createOrEditTable'],
    mutationFn: async (data) => {
      const response = await axios({
        method: table ? 'PUT' : 'POST',
        data: data,
        url: table ? `/tables/edit-table-by-id/${table._id}` : '/tables/create-table'
      });
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['getTableByUserId'] })
      console.log("data", data)
      return data
    },
    onError: (error) => console.log(error)
  })

  async function increaseQuantity(mealId) {
    const updatedTableMeals = tableMeals.map(item => ({
      meal: item.meal._id,
      quantity: item.meal._id === mealId ? item.quantity + 1 : item.quantity
    }));
    await createOrEditTable(updatedTableMeals);
    setToggle(!toggle)
  }
  
  async function deleteMealFromTable(mealId) {
    const updatedTableMeals = tableMeals
    .filter(item => item.meal._id !== mealId)
    .map(item => ({
      meal: item.meal._id,
      quantity: item.quantity
    }));
    
    await createOrEditTable(updatedTableMeals);
    setToggle(!toggle)
    
}

  function deleteTable() {
    setTable(null);
  }


  const tableGlobalState = {
    table,
    setTable,
    deleteTable,
    createOrEditTable,
    increaseQuantity,
    deleteMealFromTable
  };

  return (
    <TableContext.Provider value={tableGlobalState}>
      {children}
    </TableContext.Provider>
  );
}

export default TableProvider;
