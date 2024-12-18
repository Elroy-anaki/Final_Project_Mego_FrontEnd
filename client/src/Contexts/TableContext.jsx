import { createContext, useEffect } from "react";
import { useState } from "react";

export const TableContext = createContext();

function TableProvider({ children }) {
  const [table, setTable] = useState([]);

  function addMealToTable(meal) {
    if (table.length > 0) {
      const exist = table.find((m) => m.mealId === meal._id);
      console.log("Existing meal:", exist);
      if (!exist) {
        setTable([...table, { mealId: meal._id, quantity: 1 }]);
      } else {
        const newTable = table.map((m) => {
          if (m.mealId === meal._id) {
            return { mealId: m.mealId, quantity: m.quantity + 1 };
          }
          return m;
        });
        setTable(newTable);
      }
    } else setTable([{ mealId: meal._id, quantity: 1 }]);
  }
  function deleteMealFromTable(meal) {
    const exist = table.find((m) => m.mealId === meal._id);
    if (exist.quantity > 1) {
      const newTable = table.map((m) => {
        if (m.mealId === meal._id) {
          return { mealId: m.mealId, quantity: m.quantity - 1 };
        }
        return m;
      });
      console.log(meal);
      setTable(newTable);
    } else {
      const newTable = table.filter((m) => m.mealId !== meal._id);
      setTable(newTable);
    }
  }

  function clearTable() {
    setTable([]);
  }

  useEffect(() => {
    console.log("table", table);
  }, [table]);

  const tableGlobalState = {
    table,
    setTable,
    addMealToTable,
    deleteMealFromTable,
    clearTable,
  };

  return (
    <TableContext.Provider value={tableGlobalState}>
      {children}
    </TableContext.Provider>
  );
}

export default TableProvider;
