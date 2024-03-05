import React, { FormEvent, useRef, useState } from "react";

type Expense = {
  source: string;
  amount: number;
  date: string;
};

const Expense = () => {
  const source = useRef<any>("");
  const amount = useRef<any>(0);
  const date = useRef<any>("");

  const [expenses, setExpense] = useState<Expense[]>([]);

  const addExpenseHandler = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const Expense = {
      source: String(source.current.value),
      amount: Number(amount.current.value),
      date: String(date.current.value),
    };
    setExpense((expenses) => [...expenses, Expense]);
  };

  return (
    <section>
      <form onSubmit={addExpenseHandler}>
        <div>
          <label htmlFor="expense-source"> Expense source </label>
          <input ref={source} id="expense-source" type="text" />
        </div>
        <div>
          <label htmlFor="expense-amount"> Amount of Expense </label>
          <input ref={amount} id="expense-amount" type="number" />
        </div>

        <div>
          <label htmlFor="expense-date"> Date of Expense </label>
          <input id="expense-date" type="date" />
        </div>

        <button type="submit" id="add-Expense-btn">
          Add Expense
        </button>
      </form>

      {expenses.length > 0 && (
        <ul>
          <li>Hi</li>
        </ul>
      )}
    </section>
  );
};

export default Expense;
