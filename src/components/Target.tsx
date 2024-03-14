import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import ProgressBar from './ProgressBar';

const targetSchema = z.object({
  target: z.coerce.number().positive({ message: 'target value should be positive' }),
} );

type TargetType = z.infer<typeof targetSchema>;

const Target = (props: { savingAmount: number }) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TargetType>({ resolver: zodResolver(targetSchema) });

  const [target, setTarget] = useState<number>(0);
  const [saving, setSavings] = useState<number>(0);

  useEffect(() => {
    setSavings(saving + props.savingAmount);
  }, [props.savingAmount]);

  const onSubmit: SubmitHandler<TargetType> = (data: TargetType): void => {
    setTarget(data.target);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='target'> Set target </label>
          <input
            {...register('target')}
            id='target'
            type='number'
          />
          {errors.target && <p>{errors.target.message}</p>}
        </div>

        <button
          type='submit'
          id='set-target-btn'>
          Set Target
        </button>

        <button
          onClick={() => setSavings(0)}
          id='reset-btn'>
          Reset Savings
        </button>

        <div>
          <p>Current Saving : {saving}</p>
          <p>Target : {target}</p>
        </div>

        <ProgressBar
          currentSaving={saving}
          targetSaving={target}
        />
      </form>
    </section>
  );
};

export default Target;
