import React, { useState } from "react";
import ExpenseContext from "./expense-context";

const ExpenseProvider = (props) => {
    const [allExpenses, setAllExpenses] = useState([]);

    const expensesHandler = (expense) => {
        setAllExpenses((prevState) => {
            return [...prevState, expense]
        })
    }

    const expenseContext = {
        expenses: allExpenses,
        allExpense: expensesHandler, 
    }
    return <ExpenseContext.Provider value={expenseContext}>{props.children}</ExpenseContext.Provider>
}

export default ExpenseProvider