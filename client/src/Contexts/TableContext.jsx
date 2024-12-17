import { createContext } from "react";
import { useState, } from "react";


export const TableContext = createContext()

function TableProvider({children}){

    const [table, setTable] = useState()


    const tableGlobalState = {
        table, 
        setTable
    }

    return (
        <TableContext.Provider value={tableGlobalState}>
            {children}
        </TableContext.Provider>
    )
}

export default TableProvider;