import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const Balance = (props: { balance: number; transferSaving: (amount: number) => void }) => {

  // the schema is declared inside to use the balance amount for validation.
  const savingSchema = z.object( {
    saving: z.coerce
      .number()
      .positive({ message: 'saving value should be a positive number' })
      .lte(props.balance, { message: "Sorry, you don't have enough balance" }),
  });

  type Saving = z.infer<typeof savingSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Saving>({ resolver: zodResolver(savingSchema) });

  const onSubmit: SubmitHandler<Saving> = (data: Saving): void => {
    props.transferSaving(data.saving);
    reset();
  };

  return (
    <section>
      <div>Current Balance: {props.balance}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='saving'> Transfer to saving account</label>
          <input
            {...register('saving')}
            id='saving'
            type='number'
          />
          {errors.saving && <p>{errors.saving.message}</p>}
        </div>

        <button id='transfer-btn'>Transfer</button>
      </form>
    </section>
  );
};

export default Balance;
