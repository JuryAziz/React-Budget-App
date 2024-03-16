import React, { FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const expenseSchema = z.object({
  id: z.string().optional(),
  source: z.string().min(2, { message: 'source must have at least 2 characters ' }),
  amount: z.coerce.number().positive({ message: 'amount must be a positive number' }),
  date: z.coerce.date({
    required_error: 'required',
    invalid_type_error: 'Please select a date and time',
  }),
});

type Expense = z.infer<typeof expenseSchema>;

const Expenses = (props: { setTotalExpenses: (totalExpenses: number) => void }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Expense>({ resolver: zodResolver(expenseSchema) });

  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    props.setTotalExpenses(expenses.reduce((total, expense) => total + expense.amount, 0));
  }, [expenses]);

  const onSubmit: SubmitHandler<Expense> = (data: Expense): void => {
    data.id = uuidv4();
    setExpenses((expenses) => [...expenses, data]);
    reset();
  };

  const deleteExpense = (id: string | undefined): void => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='expense-source'> Expense source </label>
          <input
            {...register('source')}
            name='source'
            id='expense-source'
            type='text'
          />
          {errors.source && <p> {errors.source.message}</p>}
        </div>
        <div>
          <label htmlFor='expense-amount'> Amount of Expense </label>
          <input
            {...register('amount')}
            name='amount'
            id='expense-amount'
            type='number'
          />
          {errors.amount && <p> {errors.amount.message}</p>}
        </div>

        <div>
          <label htmlFor='expense-date'> Date of Expense </label>
          <input
            {...register('date')}
            name='date'
            id='expense-date'
            type='date'
          />
          {errors.date && <p> {errors.date.message}</p>}
        </div>

        <button
          type='submit'
          id='add-Expense-btn'>
          Add Expense
        </button>
      </form>

      {expenses.length > 0 && (
        <ul>
          {expenses.map((expense) => {
            return (
              <li key={expense.id}>
                {expense.source} : {expense.amount} on {expense.date.toDateString()}
                <button onClick={() => deleteExpense(expense.id)}>Delete Expense</button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Expenses;
