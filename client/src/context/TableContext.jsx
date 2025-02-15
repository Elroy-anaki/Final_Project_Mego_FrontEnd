import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { notifyError } from "../lib/Toasts";

export const TableContext = createContext();


function TableProvider({ children }) {

  // Get Table In Mounting
  const { mutateAsync: getTableByUserEmail } = useMutation({
    mutationKey: ['getTableByUserEmail'],
    mutationFn: async (userEmail) => axios.get(`tables/get-table-by-user-id/${userEmail}`),
    onSuccess: (data) => {
      return data.data
    },
    retry: 1
  });
  const queryClient = useQueryClient()
  
  const { user, isAuth } = useContext(AuthContext)
  const [toggle, setToggle] = useState(false)
  const [table, setTable] = useState(null);
  const [tableMeals, setTableMeals] = useState([])

  useEffect(() => {
    const fetchTables = async () => {
      if (isAuth && user) {
        try {
          const { data } = await getTableByUserEmail(user.userEmail);
          setTable(data.data);
          setTableMeals(data.data.meals)

          console.log("data.data", data.data)
        } catch (error) {
          console.error("Error", error);
        }
      } else {
        setTable(null);
      }
    };

    fetchTables();

  }, [user, isAuth, toggle]);

  useEffect(() => {
    setTableMeals(table ? table.meals : [])
  }, [table]);

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
  });


  const { mutateAsync: addGuests } = useMutation({
    mutationKey: ['addGuests'],
    mutationFn: async (data) => axios.put(`/tables/add-guests/${data._id}`),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['getTableByUserId'] })
      console.log("data", data)
      return data
    },
    onError: (error) => console.log(error)
  });


  const { mutateAsync: deleteTable } = useMutation({
    mutationKey: ['deleteTable'],
    mutationFn: async (data) => axios.delete(`/tables/delete-table-by-id/${data._id}`),
    onSuccess: (data) => {
      setTable(null)
      queryClient.invalidateQueries({ queryKey: ['getTableByUserId'] })
      console.log("data", data)
      return data
    },
    onError: (error) => console.log(error)
  });

  // Handel Events
  async function handelAdding(mealId) {
    if(!isAuth){
      return notifyError("You need to sign in if you want to eat!")
    }
    if(tableMeals.length === 0 || !table){
        const newTable = {
          user: {
            userId: user._id,
            userName: user.userName
          },
          sharedWith: [{
            guestEmail: user.userEmail,
            rated: false
          }],
          meals: [{
            meal: mealId,
            quantity: 1 
          }]
        }
      console.log(newTable)
      await createOrEditTable(newTable);
      setToggle(!toggle);
    }
    else{
      const mealExists = tableMeals.some(item => item.meal._id === mealId);
      const updatedTableMeals = mealExists
        ? tableMeals.map(item => ({
          meal: item.meal._id,
          quantity: item.meal._id === mealId ? item.quantity + 1 : item.quantity
        }))
        : [...tableMeals, { meal: mealId, quantity: 1 }];


      await createOrEditTable(updatedTableMeals);
      setToggle(!toggle);
    }
    

  };

  async function decreaseQuantity(mealId) {
    const updatedTableMeals = tableMeals.map(item => ({
      meal: item.meal._id,
      quantity: item.meal._id === mealId ? item.quantity - 1 : item.quantity
    }));
    await createOrEditTable(updatedTableMeals);
    setToggle(!toggle)
  };

  async function deleteMealFromTable(mealId) {
    const updatedTableMeals = tableMeals
      .filter(item => item.meal._id !== mealId)
      .map(item => ({
        meal: item.meal._id,
        quantity: item.quantity
      }));

    await createOrEditTable(updatedTableMeals);
    setToggle(!toggle)

  };


  const tableGlobalState = {
    table,
    tableMeals,
    setTable,
    deleteTable,
    createOrEditTable,
    handelAdding,
    decreaseQuantity,
    deleteMealFromTable,
    addGuests
  };

  return (
    <TableContext.Provider value={tableGlobalState}>
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
