import React, { FormEvent, useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

const Target = (props: { savingAmount: number }) => {
  const [target, setTarget] = useState(0);
  const [saving, setSavings] = useState(0);

  useEffect(() => {
    setSavings(saving + props.savingAmount);
  }, [props.savingAmount] );

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    ev.preventDefault();
    setTarget(Number(ev.target.value));
  };

  const resetTarget = (ev: FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();
    setTarget(0);
  };

  return (
    <section>
      <form onSubmit={resetTarget}>
        <div>
          <label htmlFor="target"> Set target </label>
          <input value={target} onChange={onChange} id="target" type="number" />
        </div>
        <button type="submit" id="reset-btn">
          Reset
        </button>
        <div>
          <p>Current Saving : {saving}</p>
          <p>Target : {target}</p>
        </div>
        <ProgressBar currentSaving={saving} targetSaving={target}/>
      </form>
    </section>
  );
};

export default Target;
