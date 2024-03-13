import React, { FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";

type Income = {
  id?: string;
  source: string;
  amount: number;
  date: string;
};

const Incomes = ( props: { setTotalIncomes: ( totalIncomes: number ) => void; } ) =>{

  const { register, handleSubmit } = useForm<Income>();
  const [incomes, setIncomes] = useState<Income[]>([]); 

  useEffect(() => {
    props.setTotalIncomes(
      incomes.reduce((total, income) => total + income.amount, 0)
    );
  }, [ incomes ] );

  const onSubmit: SubmitHandler<Income> = ( data: any ) =>
  {
    data.id = uuidv4();
    data.amount = Number(data.amount);
    setIncomes( ( incomes ) => [ ...incomes, data ] );
  }

  const deleteIncome = ( id: string | undefined ): void =>
  {
    setIncomes( incomes.filter( income => income.id !== id ) );
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="income-source"> Income source </label>
          <input
            {...register("source", {required: true, minLength: 2})}
            name="source"
            id="income-source"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="income-amount"> Amount of income </label>
          <input
            {...register("amount", {required:true, min:1})}
            name="amount"
            id="income-amount"
            type="number"
          />
        </div>

        <div>
          <label htmlFor="income-date"> Date of income </label>
          <input
            {...register("date", {required: true})}
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
                <button onClick={() => deleteIncome(income.id)}>
                  Delete Income
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Incomes;
