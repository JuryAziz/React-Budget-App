import React, { FormEvent, useState } from "react";

type Income = {
  source: string;
  amount: number;
  date: string;
};

const Income = () => {
  const [incomes, setIncomes] = useState<Income[]>([]); // for incomes list ...
  const [income, setIncome] = useState<Income>({
    source: "",
    amount: 0,
    date: "",
  }); // for incomes list ...

  const onChange = (ev: FormEvent<HTMLElement>) => {
    ev.preventDefault();

    setIncome((income) => {
      return { ...income, [ev.target.name]: ev.target.value };
    });
    console.log("income", income);
  };

  const addIncome = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log("inside add Income");
    setIncomes((incomes) => [...incomes, income]);
    console.log("incomes", incomes);
    // const income = {
    //   // todo add ID
    //   ...incomes,
    // };

    setIncome({
      source: "",
      amount: 0,
      date: "",
    });
  };

  console.log(incomes);
  return (
    <section>
      <form onSubmit={addIncome}>
        <div>
          <label htmlFor="income-source"> Income source </label>
          <input
            onChange={onChange}
            value={income.source}
            name="source"
            id="income-source"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="income-amount"> Amount of income </label>
          <input
            onChange={onChange}
            value={income.amount}
            name="amount"
            id="income-amount"
            type="number"
          />
        </div>

        <div>
          <label htmlFor="income-date"> Date of income </label>
          <input
            onChange={onChange}
            value={income.date}
            name="date"
            id="income-date"
            type="date"
          />
        </div>

        <button type="submit" id="add-income-btn">
          Add income
        </button>
      </form>

      {incomes.length > 0 && (
        <ul>
          {incomes.map((income) => {
            return (
              <li>
                {income.source} : {income.amount} on {income.date}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Income;
