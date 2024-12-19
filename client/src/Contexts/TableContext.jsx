import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const TableContext = createContext();

function TableProvider({ children }) {

    const {user, isAuth} = useContext(AuthContext)

    
    const { mutateAsync: getTableByUserId } = useMutation({
        mutationKey:['getTableByUserId'],
        mutationFn: async (userId) => axios.get(`/tables/get-by-user-id/${userId}`),
        onSuccess: (data) => {
            return data.data
        },
        retry: 1
    })
    const [table, setTable] = useState(null);

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

    }, [user, isAuth])

    useEffect(() => {
        console.log(table)
    },[table])

  // Actions
  function addMealToTable(mealId) {
    if (table.meals.length > 0) {
      const exist = table.meals.find((m) => m.mealId === mealId);
      console.log("Existing meal:", exist);
      if (!exist) {
        setTable({...table, meals:[{ mealId: mealId._id, quantity: 1 }]});
      } else {
        const newTable = table.map((m) => {
          if (m.mealId === mealId) {
            return { mealId: m.mealId, quantity: m.quantity + 1 };
          }
          return m;
        });
        setTable(newTable);
      }
    } else setTable([{ mealId: mealId._id, quantity: 1 }]);
  }

  function decreaseQuantity(mealId) {
    
    const exist = table.meals.find((m) => m.id._id === mealId);
    
    if (!exist) return;
  
    if (exist.quantity > 1) {
      const updatedMeals = table.meals.map((m) => {
        if (m.id._id === mealId) {
          return { ...m, quantity: m.quantity - 1 };
        }
        return m;
      });
  
      setTable({
        ...table,
        meals: updatedMeals
      });
    } else {
      const updatedMeals = table.meals.filter((m) => m.id._id !== mealId);
      setTable({
        ...table,
        meals: updatedMeals
      });
    }
  }
  function clearTable() {
    setTable([]);
  }
  useEffect(() => {console.log("tableEEEEE", table)}, [table])


  const tableGlobalState = {
    table,
    setTable,
    addMealToTable,
    decreaseQuantity,
    clearTable,
  };

  return (
    <TableContext.Provider value={tableGlobalState}>
      {children}
    </TableContext.Provider>
  );
}

export default TableProvider;
