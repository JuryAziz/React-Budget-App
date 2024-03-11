

import { FormEvent, useState } from "react";

const Balance = (props: {
  balance: number;
  transferSaving: (amount: number) => void;
}) => {
  const [savingAmount, setSavingAmount] = useState(0);

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setSavingAmount(Number(ev.target.value));
  };

  const setSaving = (ev: FormEvent<HTMLFormElement>): void => {
      ev.preventDefault();
      props.transferSaving(savingAmount);
  };
  return (
    <section>
      <div>Current Balance: {props.balance}</div>
      <form onSubmit={setSaving}>
        <div>
          <label htmlFor="saving"> Transfer to saving account</label>
          <input
            value={savingAmount}
            onChange={onChange}
            id="saving"
            type="number"
          />
        </div>
        <button type="submit" id="transfer-btn">
          Transfer
        </button>
      </form>
    </section>
  );
};

export default Balance;