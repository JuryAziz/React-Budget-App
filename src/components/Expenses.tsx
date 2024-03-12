import React, { FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Expense = {
  id?: string;
  source: string;
  amount: number;
  date: string;
};

const Expenses = (props: {
  setTotalExpenses: (totalExpenses: number) => void;
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]); // for expenses list...
  const [expense, setExpense] = useState<Expense>({
    source: "",
    amount: 0,
    date: "",
  }); // for expense object ...

  useEffect(() => {
    props.setTotalExpenses(
      expenses.reduce((total, expense) => total + expense.amount, 0)
    );
  }, [expenses]);

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    ev.preventDefault();

    setExpense((expense) => {
      return { ...expense, [ev.target.name]: ev.target.value };
    });
  };

  const addExpense = (ev: FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();

    expense.id = uuidv4();
    expense.amount = Number(expense.amount);
    setExpenses((expenses) => [...expenses, expense]);

    setExpense({
      source: "",
      amount: 0,
      date: "",
    });
  };


  const deleteExpense = (id : string | undefined) : void =>
  {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }
  return (
    <section>
      <form onSubmit={addExpense}>
        <div>
          <label htmlFor="expense-source"> Expense source </label>
          <input
            onChange={onChange}
            value={expense.source}
            name="source"
            id="expense-source"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="expense-amount"> Amount of Expense </label>
          <input
            onChange={onChange}
            value={expense.amount}
            name="amount"
            id="expense-amount"
            type="number"
          />
        </div>

        <div>
          <label htmlFor="expense-date"> Date of Expense </label>
          <input
            onChange={onChange}
            value={expense.date}
            name="date"
            id="expense-date"
            type="date"
          />
        </div>

        <button type="submit" id="add-Expense-btn">
          Add Expense
        </button>
      </form>

      {expenses.length > 0 && (
        <ul>
          {expenses.map((expense) => {
            return (
              <li>
                {expense.source} : {expense.amount} on {expense.date}{" "}
                <button onClick = {() => deleteExpense(expense.id)}> Delete Expense </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Expenses;
