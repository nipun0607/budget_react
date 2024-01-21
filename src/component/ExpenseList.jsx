import React, { useEffect } from 'react';
import { useBudget } from "../context/BudgetContext";
import { nanoid } from "nanoid";

const ExpenseList = (props) => {

    const { expenseList,setExpenseList } = useBudget(); //* contextAPI

    
    if (expenseList.length !== 0) {
        localStorage.setItem('expenses', JSON.stringify([...expenseList]));
    } 
    
   
    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
        if (storedExpenses) {
            setExpenseList(storedExpenses);
        }
    }, []);

 
    const deleteExpense = (idx, expenseCost) =>{
        props.spentAmountDel(expenseCost);
        const newExpenseList = [...expenseList];
        newExpenseList.splice(idx, 1);
        setExpenseList(newExpenseList);
        localStorage.setItem('expenses', JSON.stringify([...newExpenseList]));
    }
    

  return (
    <div className='expenseList'>
        <h2>Expense List</h2>
        {
            expenseList.length === 0 ? 
            (<p>Add Data To List . . . . .</p>):
            (
                expenseList.map((item, idx)=>{
                    return(
                        <div key={nanoid()} className="single_expense">
                            <span className="reason">{item.reason}</span>
                            <span className="cost">{item.cost}</span>
                            <button onClick={()=> deleteExpense(idx, item.cost)}>del</button>
                        </div>
                    )
                })
            )
        }
    </div>
  )
}

export default ExpenseList