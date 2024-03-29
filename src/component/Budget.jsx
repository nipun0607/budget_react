import React, { useState, useEffect } from "react";
import ExpenseList from "./ExpenseList";
import AddExpense from "./AddExpense";
import { useBudget } from "../context/BudgetContext";

const Budget = () => {
  const { cost } = useBudget(); //* contextAPI

  
  const [remaining, setRemaining] = useState(
    localStorage.getItem("remaining")
      ? JSON.parse(localStorage.getItem("remaining"))
      : 2000
  );

  const [spent, setSpent] = useState(
    localStorage.getItem("spent")
      ? JSON.parse(localStorage.getItem("spent"))
      : 0
  );

  useEffect(() => {
    localStorage.setItem("spent", JSON.stringify(spent));
  }, [spent]);

  useEffect(() => {
    localStorage.setItem("remaining", JSON.stringify(remaining));
  }, [remaining]);


  function spentAmountSave() {
    let newSpent = parseInt(cost) + parseInt(spent);
    setSpent(newSpent);
  }
  function remainingAmountSave() {
    let newRemain = parseInt(remaining) - parseInt(cost);
    setRemaining(newRemain);
  }
  function spentAmountDel(deletedExpenseCost) {
    setSpent((prevSpent) => parseInt(prevSpent) - parseInt(deletedExpenseCost));
    setRemaining((prevRemaining) => parseInt(prevRemaining) + parseInt(deletedExpenseCost));
  }
  const heading = {
    color: 'blue',
    fontSize: '2rem',
    backgroundColor: 'lightgray',
    padding: '10px',
    borderRadius: '5px',
    fontWeight:'1.5rem'
  };

  return (
    <>
      <nav style={heading}>My Budget Planner</nav>
      <main>
        <div className="budget">
          <p>Budget : 2000</p>
          <p>Remaining : {remaining}</p>
          <p>Spent so far : {spent}</p>
        </div>
        <ExpenseList spentAmountDel={spentAmountDel} />
        <AddExpense
          spentAmount={spentAmountSave}
          remainingAmount={remainingAmountSave}
        />
      </main>
    </>
  );
};

export default Budget;
