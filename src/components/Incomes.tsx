import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const incomeSchema = z.object({
  id: z.string().optional(),
  source: z
    .string()
    .min(2, { message: "source must have at least 2 characters " }),
  amount: z.coerce
    .number()
    .positive({ message: "amount must be a positive number" }),
  date: z.coerce.date({
    required_error: "Please select a date and time",
  }),
});

type Income = z.infer<typeof incomeSchema>;

const Incomes = (props: { setTotalIncomes: (totalIncomes: number) => void;}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Income>({ resolver: zodResolver(incomeSchema) });
  const [incomes, setIncomes] = useState<Income[]>([]);

  useEffect(() => {
    props.setTotalIncomes(
      incomes.reduce((total, income) => total + income.amount, 0)
    );
  }, [incomes]);

  const onSubmit: SubmitHandler<Income> = (data: Income) : void => {
    data.id = uuidv4();
    setIncomes((incomes) => [...incomes, data]);
  };

  const deleteIncome = (id: string | undefined): void => {
    setIncomes(incomes.filter((income) => income.id !== id));
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="income-source"> Income source </label>
          <input
            {...register("source")}
            name="source"
            id="income-source"
            type="text"
          />
          {errors.source && <p> {errors.source.message}</p>}
        </div>
        <div>
          <label htmlFor="income-amount"> Amount of income </label>
          <input
            {...register("amount")}
            name="amount"
            id="income-amount"
            type="string"
          />
          {errors.amount && <p> {errors.amount.message}</p>}
        </div>

        <div>
          <label htmlFor="income-date"> Date of income </label>
          <input
            {...register("date")}
            name="date"
            id="income-date"
            type="date"
          />
          {errors.date && <p> {errors.date.message}</p>}
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
                {income.source} : {income.amount} on {income.date.toUTCString()}
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
