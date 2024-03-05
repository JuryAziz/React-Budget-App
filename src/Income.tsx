import React, { FormEvent, useRef, useState } from "react";

type Income = {
  source: string;
  amount: number;
  date: string;
};

const Income = () => {
  const source = useRef<any>("");
  const amount = useRef<any>(0);
  const date = useRef<any>("");

  const [incomes, setIncome] = useState<Income[]>([]); // for incomes list ...

  const addIncomeHandler = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const income = {
      source: String(source.current.value),
      amount: Number(amount.current.value),
      date: String(date.current.value),
    };
    setIncome((incomes) => [...incomes, income]);
  };

  return (
    <section>
      <form onSubmit={addIncomeHandler}>
        <div>
          <label htmlFor="income-source"> Income source </label>
          <input ref={source} id="income-source" type="text" />
        </div>
        <div>
          <label htmlFor="income-amount"> Amount of income </label>
          <input ref={amount} id="income-amount" type="number" />
        </div>

        <div>
          <label htmlFor="income-date"> Date of income </label>
          <input id="income-date" type="date" />
        </div>

        <button type="submit" id="add-income-btn">
          Add income
        </button>
      </form>

    {incomes.length > 0 && <ul>
      <li>Hi</li>
    </ul>}
    </section>
  );
};

export default Income;
