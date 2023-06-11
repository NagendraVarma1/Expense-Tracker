import React from "react";

const ExpenseContext = React.createContext({
    expenses: [],
    allExpense: (expense) => {},
})

export default(ExpenseContext);