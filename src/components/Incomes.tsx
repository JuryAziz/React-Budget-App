import React, { FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Income = {
  id?: string;
  source: string;
  amount: number;
  date: string;
};

const Incomes = (props: { setTotalIncomes: (totalIncomes: number) => void }) => {
  const [incomes, setIncomes] = useState<Income[]>([]); // for incomes list ...
  const [income, setIncome] = useState<Income>({
    source: "",
    amount: 0,
    date: "",
  }); // for income object ...

  useEffect(() => {
    props.setTotalIncomes(
      incomes.reduce((total, income) => total + income.amount, 0)
    );
  }, [incomes]);

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    ev.preventDefault();

    setIncome((income) => {
      return { ...income, [ev.target.name]: ev.target.value };
    });
  };

  const addIncome = (ev: FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();

    income.id = uuidv4();
    income.amount = Number(income.amount);
    setIncomes((incomes) => [...incomes, income]);

    setIncome({
      source: "",
      amount: 0,
      date: "",
    });
  };

  const deleteIncome = ( id: string | undefined ): void =>
  {
    setIncomes( incomes.filter( income => income.id !== id ) );
  }

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
                { income.source } : { income.amount } on { income.date }
                <button onClick={ () => deleteIncome(income.id) }>Delete Income</button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Incomes;
