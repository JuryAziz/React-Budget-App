import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import ProgressBar from './ProgressBar';

const targetSchema = z.object({
  target: z.coerce.number().nonnegative({ message: 'target value should not be negative' }),
});

type TargetType = z.infer<typeof targetSchema>;

const Target = (props: { savingAmount: number; setSavingAmount: (amount: number) => void }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TargetType>({ resolver: zodResolver(targetSchema) });

  const [target, setTarget] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);

  // updating savings when a new saving is transferred.
  useEffect(() => {
    setSavings(savings + props.savingAmount);
  }, [props.savingAmount]);

  const onSubmit: SubmitHandler<TargetType> = (data: TargetType): void => {
    setTarget(data.target);
    reset();
  };

  // reset current saving to 0.
  const resetSavings = () => {
    props.setSavingAmount(0);
    setSavings(0);
  };

  return (
    <section className='target'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input-container'>
          <label htmlFor='target'> Set target </label>
          <input
            {...register('target')}
            id='target'
            type='number'
          />
          {errors.target && <p className='error'>{errors.target.message}</p>}
        </div>

        <button
          type='submit'
          id='set-target-btn'>
          Set Target
        </button>

        <button
          type='button'
          onClick={resetSavings}
          id='reset-btn'>
          Reset Savings
        </button>

        <div>
          <h3>Current Saving : {savings}</h3>
          <h3>Target : {target}</h3>
        </div>

        <ProgressBar
          currentSaving={savings}
          targetSaving={target}
        />
      </form>
    </section>
  );
};

export default Target;
